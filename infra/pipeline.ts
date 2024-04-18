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
  LinuxBuildImage,
  LocalCacheMode,
  Project,
} from "aws-cdk-lib/aws-codebuild";
import { Artifact, Pipeline, PipelineType } from "aws-cdk-lib/aws-codepipeline";
import {
  CodeBuildAction,
  CodeBuildActionType,
  GitHubSourceAction,
} from "aws-cdk-lib/aws-codepipeline-actions";
import {
  Effect,
  Policy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import {} from "aws-cdk-lib/pipelines";

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

    const pipeline = new Pipeline(this, "stuff-pipeline", {
      pipelineName: "pipeline-getstuff-cc",
      pipelineType: PipelineType.V2,
    });
    const artifact = new Artifact();

    const installedDepsArtifacts = new Artifact();
    pipeline.addStage({
      stageName: "Source",
      actions: [
        new GitHubSourceAction({
          actionName: "source",
          oauthToken: SecretValue.secretsManager(
            "/stuff/pipeline/github-token",
          ),
          owner: "vincent-thomas",
          repo: "getstuff.cc",
          output: artifact,
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
    const dbUrl = StringParameter.fromStringParameterName(
      this,
      "stuff-plus-pricing",
      `/stuff/api/${stage}/database-url`,
    );

    const project = new Project(this, "getstuff-cc-project", {
      projectName: "getstuff-cc-build",
      // role: buildRole,
      environment: {
        buildImage: LinuxBuildImage.STANDARD_7_0,
        environmentVariables: {
          SHELL: {
            value: "sh",
          },
          AWS_REGION: { value: props.env.region },
          AWS_ACCOUNT_ID: { value: props.env.account },
          REDIS_URL: { value: redisParam.stringValue },
        },
      },
      buildSpec: BuildSpec.fromObject({
        version: "0.2",
        phases: {
          install: {
            "runtime-versions": {
              nodejs: 20,
            },
            commands: ["npm i -g pnpm@9.0.2", "pnpm install"],
          },
          pre_build: {
            commands: ["pnpm check:ci"],
          },
          build: {
            commands: [
              "SKIP_ENV_VALIDATION='1' pnpm build:app",
              "pnpm test:unit",
            ],
          },
        },
        cache: {
          paths: ["~/.local/share/pnpm/store"],
        },
      }),
    });

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

    pipeline.addStage({
      stageName: "Build",
      actions: [
        new CodeBuildAction({
          actionName: "Build",
          type: CodeBuildActionType.BUILD,
          input: artifact,
          project,

          outputs: [installedDepsArtifacts],
        }),
      ],
    });

    pipeline.addStage({
      stageName: "Test",
      actions: [
        new CodeBuildAction({
          actionName: "test",
          type: CodeBuildActionType.TEST,
          input: installedDepsArtifacts,
          project: new Project(this, "getstuff-cc-test", {
            projectName: "getstuff-cc-test",
            environment: {
              buildImage: LinuxBuildImage.STANDARD_7_0,
            },
            buildSpec: BuildSpec.fromObject({
              version: "0.2",
              phases: {
                install: {
                  "runtime-versions": {
                    nodejs: 20,
                  },
                  commands: ["npm i -g pnpm@9.0.2", "pnpm install"],
                },
                build: {
                  commands: ["pnpm test:unit"],
                },
              },
              cache: {
                paths: {},
              },
            }),
          }),
        }),
      ],
    });
    Stack.of(this).tags.setTag("scope", "stuff-pipeline");
  }
}
