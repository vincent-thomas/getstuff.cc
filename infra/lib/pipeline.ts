import {
  type App,
  Stack,
  type StackProps,
  SecretValue,
  RemovalPolicy,
} from "aws-cdk-lib";
import {
  Artifacts,
  type BuildEnvironmentVariable,
  BuildEnvironmentVariableType,
  BuildSpec,
  Cache,
  ComputeType,
  LinuxArmBuildImage,
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
import {
  type IRepository,
  Repository,
  TagMutability,
} from "aws-cdk-lib/aws-ecr";
import { type IRole, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import type { Construct } from "constructs";
import { packageManager } from "../../package.json";
import { z } from "zod";
interface AccountStackProps extends StackProps {
  env: {
    account: string;
    region: string;
  };
  stage: string;
}
const pnpmVersion = z.string().parse(packageManager.split("@")[1]);

export class AppPipeline extends Stack {
  constructor(scope: App, id: string, { stage, ...props }: AccountStackProps) {
    super(scope, id, { ...props, crossRegionReferences: true });
    const artifactBucket = new Bucket(this, "artifact-bucket");
    const cacheBucket = new Bucket(this, "cache-bucket", {
      bucketName: "getstuff.cc-pipeline-cache-bucket",
    });
    const pipeline = new Pipeline(this, "stuff-pipeline", {
      pipelineName: "pipeline-getstuff-cc",
      pipelineType: PipelineType.V2,
      artifactBucket,
      executionMode: ExecutionMode.SUPERSEDED,
    });

    const repoStore = new Artifact("raw-source");
    const buildStore = new Artifact("buildstore");
    const repository = new Repository(this, "getstuff-cc-app", {
      imageTagMutability: TagMutability.IMMUTABLE,
    });

    pipeline.addStage({
      stageName: "Source",
      actions: [this.createSourceAction({ output: repoStore })],
    });

    pipeline.addStage({
      stageName: "Analysis",
      actions: [
        this.createLintingAction({
          input: repoStore,
          buckets: { cache: cacheBucket },
        }),
      ],
    });

    pipeline.addStage({
      stageName: "Build",
      actions: [
        this.createBuildAction({
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

    pipeline.addStage({
      stageName: "Release",
      actions: [
        this.createBuildImageAction({
          input: repoStore,
          buildInput: buildStore,
          buckets: {
            artifact: artifactBucket,
          },
          repository,
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

  private createLintingAction({
    input,
    buckets,
  }: { input: Artifact; buckets: { cache: Bucket } }) {
    return new CodeBuildAction({
      actionName: "Lint",
      input,
      project: this.createPipelineProject(
        this,
        "getstuff-cc-analysis",
        {
          install: [
            `npm install -g pnpm@${pnpmVersion}`,
            "pnpm config set store-dir ./.pnpm-store",
            "pnpm install --frozen-lockfile",
          ],
          build: ["pnpm check:ci"],
          cache: {
            paths: ["./.pnpm-store/**/*", "./node_modules/.modules.yaml"],
          },
        },
        {
          cacheBucket: buckets.cache,
        },
      ),
    });
  }
  private createBuildAction({
    input,
    output,
    extraInputs,
    buckets,
  }: {
    input: Artifact;
    extraInputs?: Artifact[];
    output: Artifact;
    buckets: { artifact: Bucket; cache: Bucket };
  }) {
    const project = this.createPipelineProject(
      this,
      "getstuff-cc-build-project",
      {
        install: [
          `npm install -g pnpm@${pnpmVersion}`,
          "pnpm config set store-dir ./.pnpm-store",
          "pnpm install --frozen-lockfile",
        ],
        build: ["SKIP_ENV_VALIDATION='1' pnpm build:app"],
        artifacts: {
          files: ["./.next/**/*", "./next-env.d.ts", "./unimport.d.ts"],
        },
        cache: {
          paths: ["./.pnpm-store/**/*", "./node_modules/.modules.yaml"],
        },
      },
      { artifactBucket: buckets.artifact, cacheBucket: buckets.cache },
    );

    project.applyRemovalPolicy(RemovalPolicy.DESTROY);

    return new CodeBuildAction({
      actionName: "Compile",
      type: CodeBuildActionType.BUILD,
      input,
      extraInputs,
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
            `npm install -g pnpm@${pnpmVersion}`,
            "pnpm config set store-dir ./.pnpm-store",
            "pnpm install",
          ],
          cache: {
            paths: ["./.pnpm-store/**/*"],
          },
          reports: {
            tests: {
              files: ["reports/*.xml"],
              "file-format": "JUNITXML",
            },
          },
          build: ["pnpm test:unit"],
        },
        { cacheBucket: buckets.cache },
      ),
    });
  }

  private createBuildImageAction({
    input,
    buildInput,
    repository,
    buckets,
  }: {
    input: Artifact;
    buildInput: Artifact;
    repository: IRepository;
    buckets: {
      artifact: Bucket;
    };
  }) {
    const role = new Role(this, "build-image-policy", {
      assumedBy: new ServicePrincipal("codebuild.amazonaws.com"),
    });
    repository.grant(role, "ecr:GetAuthorizationToken");
    repository.grantPush(role);
    const project = this.createPipelineProject(
      this,
      "getstuff-cc-publish-project",
      {
        role,
        envVariables: {
          ECR_REPO: {
            type: BuildEnvironmentVariableType.PLAINTEXT,
            value: repository.repositoryUri,
          },
          IMAGE_NAME: {
            type: BuildEnvironmentVariableType.PLAINTEXT,
            value: "getstuff.cc",
          },
          AWS_ACCOUNT_ID: {
            type: BuildEnvironmentVariableType.PLAINTEXT,
            value: Stack.of(this).account,
          },
          REGION: {
            type: BuildEnvironmentVariableType.PLAINTEXT,
            value: Stack.of(this).region,
          },
        },
        preBuild: [
          'mv "$(echo $CODEBUILD_SRC_DIR_buildstore)"/** .',
          'mv "$(echo $CODEBUILD_SRC_DIR_buildstore)"/.next ./.next',
          "aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $(echo $AWS_ACCOUNT_ID).dkr.ecr.$(echo $REGION).amazonaws.com",
          "export IMAGE_TAG=build-$(echo $CODEBUILD_BUILD_ID | cut -d ':' -f 2)",
        ],
        build: [
          "docker build -t $IMAGE_NAME:$IMAGE_TAG .",
          "docker tag $IMAGE_NAME:$IMAGE_TAG $ECR_REPO:$IMAGE_TAG",
          "docker push $ECR_REPO:$IMAGE_TAG",
        ],
      },
      {
        artifactBucket: buckets.artifact,
      },
    );

    return new CodeBuildAction({
      actionName: "Build-image",
      input,
      extraInputs: [buildInput],
      project,
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
        buildImage: LinuxArmBuildImage.AMAZON_LINUX_2_STANDARD_3_0,
        computeType: ComputeType.SMALL,
        environmentVariables: commands.envVariables,
      },
      role: commands.role,
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
        reports: commands?.reports,
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
  role?: IRole;
  reports?: Record<string, { "file-format": string; files: string[] }>;
  postBuild?: string[];
  cache?: {
    paths: string[];
  };
  envVariables?: {
    [key: string]: BuildEnvironmentVariable;
  };
  artifacts?: {
    files: string[];
    "base-directory"?: string;
  };
}
