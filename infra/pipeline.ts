import {
  type App,
  Stack,
  type StackProps,
  SecretValue,
  RemovalPolicy,
} from "aws-cdk-lib";
import {
  BuildSpec,
  Cache,
  ComputeType,
  LinuxBuildImage,
  Project,
} from "aws-cdk-lib/aws-codebuild";
import { Artifact, Pipeline, PipelineType } from "aws-cdk-lib/aws-codepipeline";
import {
  CodeBuildAction,
  CodeBuildActionType,
  GitHubSourceAction,
} from "aws-cdk-lib/aws-codepipeline-actions";
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
    const pipeline = new Pipeline(this, "stuff-pipeline", {
      pipelineName: "pipeline-getstuff-cc",
      pipelineType: PipelineType.V2,
    });
    const repoStore = new Artifact("raw-source");

    pipeline.addStage({
      stageName: "Source",
      actions: [
        new GitHubSourceAction({
          actionName: "source",
          oauthToken: SecretValue.secretsManager(
            "/stuff/pipeline/github-token",
          ),
          owner: "vincent-thomas",
          runOrder: 1,
          repo: "getstuff.cc",
          output: repoStore,
          branch: "main",
        }),
      ],
    });

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
        preBuild: ["pnpm check:ci"],
        build: ["SKIP_ENV_VALIDATION='1' pnpm build:app"],
        cache: {
          paths: ["./.pnpm-store/**/*", "./node_modules/.modules.yaml"],
        },
        artifacts: {
          files: ["./.next", "./next-env.d.ts", "./unimport.d.ts"],
        },
      },
      cacheBucket,
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
    const buildStore = new Artifact("buildstore");

    pipeline.addStage({
      stageName: "Build",
      actions: [
        new CodeBuildAction({
          actionName: "Compile",
          type: CodeBuildActionType.BUILD,
          input: repoStore,
          project,
          runOrder: 1,
          outputs: [buildStore],
        }),
        new CodeBuildAction({
          type: CodeBuildActionType.TEST,
          actionName: "Test",
          input: repoStore,
          extraInputs: [buildStore],
          runOrder: 2,
          project: this.createPipelineProject(
            this,
            "getstuff-cc-test-project",
            {
              install: ["npm install -g pnpm@9.0.2", "pnpm install"],
              cache: {
                paths: ["./.pnpm-store/**/*", "./node_modules/.modules.yaml"],
              },
              build: ["pnpm test:unit"],
            },
          ),
        }),
      ],
    });

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
              build: ["docker build -t getstuff.cc ."],
            },
          ),
        }),
      ],
    });

    Stack.of(this).tags.setTag("scope", "stuff-pipeline");
  }

  public createPipelineProject(
    scope: Construct,
    name: string,
    commands: Command,
    cacheBucket?: Bucket,
  ): Project {
    return new Project(scope, name, {
      projectName: name,
      cache: cacheBucket ? Cache.bucket(cacheBucket) : undefined,
      environment: {
        buildImage: LinuxBuildImage.STANDARD_7_0,
        computeType: ComputeType.MEDIUM,
      },
      buildSpec: BuildSpec.fromObject({
        version: "0.2",
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
  artifacts?: {
    files: string[];
    "base-directory"?: string;
  };
}
