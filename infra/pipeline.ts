import { type App, Stack, type StackProps, SecretValue } from "aws-cdk-lib";
import { BuildSpec, Project } from "aws-cdk-lib/aws-codebuild";
import { Artifact, Pipeline, PipelineType } from "aws-cdk-lib/aws-codepipeline";
import {
  CodeBuildAction,
  CodeBuildActionType,
  GitHubSourceAction,
} from "aws-cdk-lib/aws-codepipeline-actions";

interface AccountStackProps extends StackProps {
  env: {
    account: string;
    region: string;
  };
}

export class AppPipeline extends Stack {
  constructor(scope: App, id: string, props: AccountStackProps) {
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
    pipeline.addStage({
      stageName: "Build",
      actions: [
        new CodeBuildAction({
          actionName: "Build",
          type: CodeBuildActionType.BUILD,
          input: artifact,
          project: new Project(this, "getstuff-cc-project", {
            projectName: "getstuff-cc-build",

            environment: {
              environmentVariables: {
                SHELL: {
                  value: "sh",
                },
                AWS_REGION: { value: props.env.region },
                AWS_ACCOUNT_ID: { value: props.env.account },
              },
            },
            buildSpec: BuildSpec.fromObject({
              version: "0.2",
              phases: {
                install: {
                  "runtime-versions": {
                    nodejs: "20",
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
            }),
          }),
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
            buildSpec: BuildSpec.fromObject({
              version: "0.2",
              phases: {
                install: {
                  "runtime-versions": {
                    nodejs: "20",
                  },
                  commands: ["npm i -g pnpm@9.0.2", "pnpm install"],
                },
                build: {
                  commands: ["pnpm test:unit"],
                },
              },
            }),
          }),
        }),
      ],
    });
    Stack.of(this).tags.setTag("scope", "stuff-pipeline");
  }
}
