import {
  type App,
  Stack,
  type StackProps,
  SecretValue,
  RemovalPolicy,
} from "aws-cdk-lib";
import {
  Artifacts,
  BuildSpec,
  Cache,
  ComputeType,
  LinuxBuildImage,
  Project,
} from "aws-cdk-lib/aws-codebuild";
import {
  Artifact,
  ExecutionMode,
  Pipeline,
  PipelineType,
} from "aws-cdk-lib/aws-codepipeline";
import {
  CodeBuildAction,
  CodeBuildActionType,
  GitHubSourceAction,
} from "aws-cdk-lib/aws-codepipeline-actions";
import { Repository } from "aws-cdk-lib/aws-ecr";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import type { Construct } from "constructs";

interface AccountStackProps extends StackProps {
  env: {
    account: string;
    region: string;
  };
  stage: string;
}
export class AppPipeline extends Stack {
  constructor(scope: App, id: string, { stage, ...props }: AccountStackProps) {
    super(scope, id, { ...props, crossRegionReferences: true });
    const cacheBucket = new Bucket(this, "cache-bucket", {
      bucketName: "getstuff.cc-pipeline-cache-bucket",
    });
    const artifactBucket = new Bucket(this, "artifact-bucket");
    const pipeline = new Pipeline(this, "stuff-pipeline", {
      pipelineName: "pipeline-getstuff-cc",
      pipelineType: PipelineType.V2,
      artifactBucket,
      executionMode: ExecutionMode.SUPERSEDED,
    });

    const repoStore = new Artifact("raw-source");

    pipeline.addStage({
      stageName: "Source",
      actions: [this.createSourceAction({ output: repoStore })],
    });

    pipeline.addStage({
      stageName: "Analysis",
      actions: [this.createLintingAction({ input: repoStore })],
    });

    const buildStore = new Artifact("buildstore");

    pipeline.addStage({
      stageName: "Build",
      actions: [
        this.createBuildAction({
          stage,
          input: repoStore,
          output: buildStore,
          buckets: {
            artifact: artifactBucket,
            cache: cacheBucket,
          },
        }),
        this.createTestAction({
          input: repoStore,
          buckets: {
            cache: cacheBucket,
          },
        }),
      ],
    });

    const repository = new Repository(this, "getstuff-cc-app");

    pipeline.addStage({
      stageName: "Release",
      actions: [
        new CodeBuildAction({
          actionName: "Build-image",
          input: repoStore,
          extraInputs: [buildStore],
          project: this.createPipelineProject(
            this,
            "getstuff-cc-publish-project",
            {
              envVariables: {
                ECR_REPO: repository.repositoryName,
                IMAGE_NAME: "getstuff.cc",
              },
              preBuild: [
                'mv "$(echo $CODEBUILD_SRC_DIR_buildstore)"/** .',
                'mv "$(echo $CODEBUILD_SRC_DIR_buildstore)"/.next ./.next',
              ],
              build: [
                'export IMAGE_TAG=build-`echo build-$CODEBUILD_BUILD_ID | awk –F":" ‘{print $2}‘`',
                "$(aws ecr get-login --no-include-email)",
                "docker build -t $IMAGE_NAME:$IMAGE_TAG .",
                "docker tag $IMAGE_NAME:$IMAGE_TAG $ECR_REPO:$IMAGE_TAG",
                "docker push $ECR_REPO:$IMAGE_TAG",
              ],
            },
            {
              artifactBucket,
            },
          ),
        }),
      ],
    });

    Stack.of(this).tags.setTag("scope", "stuff-pipeline");
  }

  private createSourceAction({ output }: { output: Artifact }) {
    return new GitHubSourceAction({
      actionName: "github",
      oauthToken: SecretValue.secretsManager("/stuff/pipeline/github-token"),
      owner: "vincent-thomas",
      runOrder: 1,
      repo: "getstuff.cc",
      output,
      branch: "main",
    });
  }

  private createLintingAction({ input }: { input: Artifact }) {
    return new CodeBuildAction({
      actionName: "Lint",
      input,
      project: this.createPipelineProject(this, "getstuff-cc-analysis", {
        build: ["npx @biomejs/biome ci ."],
      }),
    });
  }
  private createBuildAction({
    stage,
    input,
    output,
    buckets,
  }: {
    stage: string;
    input: Artifact;
    output: Artifact;
    buckets: { cache: Bucket; artifact: Bucket };
  }) {
    const redisParam = StringParameter.fromSecureStringParameterAttributes(
      this,
      "test",
      {
        parameterName: `/stuff/api/${stage}/redis-url`,
      },
    );
    const stuffPlusPricing = StringParameter.fromStringParameterName(
      this,
      "stuff-plus-pricing",
      `/stuff/api/${stage}/prices/stuff-plus`,
    );
    const dbUrl = StringParameter.fromSecureStringParameterAttributes(
      this,
      "stuff-database-url",
      { parameterName: `/stuff/api/${stage}/database-url` },
    );

    const project = this.createPipelineProject(
      this,
      "getstuff-cc-build-project",
      {
        install: [
          "npm install -g pnpm@9.0.2",
          "pnpm config set store-dir ./.pnpm-store",
          "pnpm install --frozen-lockfile",
        ],
        build: ["SKIP_ENV_VALIDATION='1' pnpm build:app"],
        cache: {
          paths: ["./.pnpm-store/**/*", "./node_modules/.modules.yaml"],
        },
        artifacts: {
          files: ["./.next/**/*", "./next-env.d.ts", "./unimport.d.ts"],
        },
      },
      { cacheBucket: buckets.cache, artifactBucket: buckets.artifact },
    );

    project.applyRemovalPolicy(RemovalPolicy.DESTROY);
    project.addToRolePolicy(
      new PolicyStatement({
        actions: ["ssm:GetParameter"],
        effect: Effect.ALLOW,
        resources: [
          redisParam.parameterArn,
          stuffPlusPricing.parameterArn,
          dbUrl.parameterArn,
        ],
      }),
    );
    return new CodeBuildAction({
      actionName: "Compile",
      type: CodeBuildActionType.BUILD,
      input,
      project,
      outputs: [output],
    });
  }

  private createTestAction({
    input,
    buckets,
  }: {
    input: Artifact;
    buckets: { cache: Bucket };
  }) {
    return new CodeBuildAction({
      type: CodeBuildActionType.TEST,
      actionName: "Test",
      input,
      project: this.createPipelineProject(
        this,
        "getstuff-cc-test-project",
        {
          install: [
            "npm install -g pnpm@9.0.2",
            "pnpm config set store-dir ./.pnpm-store",
            "pnpm install",
          ],
          cache: {
            paths: ["./.pnpm-store/**/*", "./node_modules/.modules.yaml"],
          },
          build: ["pnpm test:unit"],
        },
        { cacheBucket: buckets.cache },
      ),
    });
  }

  private createPipelineProject(
    scope: Construct,
    name: string,
    commands: Command,
    param?: { cacheBucket?: Bucket; artifactBucket?: Bucket },
  ): Project {
    return new Project(scope, name, {
      projectName: name,
      cache: param?.cacheBucket ? Cache.bucket(param.cacheBucket) : undefined,
      artifacts: param?.artifactBucket
        ? Artifacts.s3({ bucket: param.artifactBucket })
        : undefined,
      environment: {
        buildImage: LinuxBuildImage.STANDARD_7_0,
        computeType: ComputeType.MEDIUM,
      },
      buildSpec: BuildSpec.fromObject({
        version: "0.2",
        env: {
          variables: commands.envVariables,
        },
        phases: {
          pre_build: {
            commands: commands.preBuild,
          },
          install: {
            "runtime-versions": { nodejs: 20 },
            commands: commands.install,
          },
          build: {
            commands: commands.build,
          },
          post_build: {
            commands: commands.postBuild,
          },
        },
        cache: commands?.cache,
        artifacts: commands?.artifacts,
      }),
    });
  }
}

interface Command {
  install?: string[];
  preBuild?: string[];
  build?: string[];
  postBuild?: string[];
  cache?: {
    paths: string[];
  };
  envVariables?: {
    [key: string]: string;
  };
  artifacts?: {
    files: string[];
    "base-directory"?: string;
  };
}
