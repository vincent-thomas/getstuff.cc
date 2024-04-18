import { type App, Stack, type StackProps, SecretValue } from "aws-cdk-lib";
import { BuildSpec, Project } from "aws-cdk-lib/aws-codebuild";
import { Artifact, Pipeline, PipelineType } from "aws-cdk-lib/aws-codepipeline";
import {
  CodeBuildAction,
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

      // synth: new ShellStep("Synth", {
      //   input: CodePipelineSource.gitHub("vincent-thomas/getstuff.cc", "main", {
      //     authentication: SecretValue.secretsManager(
      //       "/stuff/pipeline/github-token",
      //     ),
      //   }),
      //   env: {
      //     SHELL: "sh",
      //     AWS_REGION: props.env.region,
      //     AWS_ACCOUNT_ID: props.env.account,
      //   },
      //   installCommands: ["npm i -g pnpm@9.0.2", "pnpm install"],
      //   commands: ["pnpm cdk:synth:pipeline"],
      //   primaryOutputDirectory: "cdk.out",
      // }),
    });

    const artifact = new Artifact();

    pipeline.addStage({
      stageName: "Source & Static Analysis",
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
          input: artifact,
          project: new Project(this, "getstuff.cc-project", {
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
          outputs: [artifact],
        }),
      ],
    });

    // pipeline.addStage({});

    // pipeline.addStage(
    //   new Stage("Build", {
    //     commands: [],
    //   }),
    // );

    // const artifact = new Artifact();

    // const repository =

    // pipeline.addStage({
    //   stageName: "Source",
    //   actions: [
    //     new GitHubSourceAction({
    //       actionName: "source-getstuff.cc",
    //       output: artifact,
    //       branch: "main",

    //     })
    //   ]
    // })

    // pipeline.addStage({
    //   stageName: "Build",
    //   actions: [
    //     new CodeBuildAction({
    //       actionName: "Build",
    //       input: artifact,
    //       project: new PipelineProject(this, "BuildProject", {
    //         buildSpec: BuildSpec.fromObject({
    //           version: "0.2",
    //           phases: {
    //             install: {
    //               commands: [
    //                 "npm install -g pnpm",
    //                 "pnpm install"
    //               ],
    //               build: {
    //                 commands: [
    //                   'pnpm check:ci',
    //                   "SKIP_ENV_VALIDATION='1' pnpm build"
    //                 ]
    //               }
    //             }
    //           }
    //         })
    //       })
    //     })
    //   ]
    // })

    // this.formattedEmailBucket = new Bucket(this, "stuff-emails-bucket", {
    //   bucketName: getEmailContentBucket(stage),
    //   removalPolicy: RemovalPolicy.DESTROY,
    //   cors: [
    //     {
    //       allowedMethods: [HttpMethods.GET],
    //       allowedOrigins: ["http://localhost:3000", `https://${domain}`],
    //     },
    //   ],
    // });

    // if (stage === "prod") {
    //   new CnameRecord(this, "stuff-email-cname-record", {
    //     zone,
    //     recordName: "wwww",
    //     domainName: "cname.vercel-dns.com",
    //   });

    //   new ARecord(this, "stuff-email-a-record", {
    //     zone,
    //     target: {
    //       values: ["76.76.21.21"],
    //     },
    //   });
    // }

    // const parameterStatement = new PolicyStatement({
    //   effect: Effect.ALLOW,
    //   actions: ["ssm:GetParameter"],
    //   resources: [
    //     `arn:aws:ssm:${props.env.region}:${props.env.account}:parameter/stuff/api/${stage}/*`,
    //     `arn:aws:ssm:${props.env.region}:${props.env.account}:parameter/stuff/api/${stage}/prices/*`,
    //   ],
    // });

    // const storageStatement = new PolicyStatement({
    //   effect: Effect.ALLOW,
    //   actions: ["s3:PutObject", "s3:GetObject"],
    //   resources: [`${this.formattedEmailBucket.bucketArn}/*`],
    // });

    // const inlinePolicy = new PolicyDocument({
    //   statements: [parameterStatement, storageStatement],
    // });
    // const user = new User(this, "app-external-user", {
    //   userName: `${stage}-stuff-app-user`,
    // });

    // emailIdentity.grantSendEmail(user);
    // user.attachInlinePolicy(
    //   new Policy(this, "CustomPolicy", {
    //     policyName: "MyCustomPolicy",
    //     document: inlinePolicy,
    //   }),
    // );

    // const userAccessKey = new CfnAccessKey(this, "stuff-access-key", {
    //   userName: user.userName,
    // });

    // new CfnOutput(this, "userUsername", { value: user.userName });
    // new CfnOutput(this, "AppAccessKeyId", { value: userAccessKey.ref });
    // new CfnOutput(this, "AppAccessSecretKey", {
    //   value: userAccessKey.attrSecretAccessKey,
    // });

    Stack.of(this).tags.setTag("scope", "stuff-api");
  }
}
