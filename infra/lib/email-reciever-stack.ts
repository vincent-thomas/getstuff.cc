import { type App, Duration, Stack, type StackProps } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Code, Function as Lambda, Runtime } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { ReceiptRuleSet, TlsPolicy } from "aws-cdk-lib/aws-ses";
import { S3 as S3Action } from "aws-cdk-lib/aws-ses-actions";
import { Topic } from "aws-cdk-lib/aws-sns";
import { SqsSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Queue } from "aws-cdk-lib/aws-sqs";
import type { z } from "zod";
import type { envInterface } from "../../packages/mail-reciever/src/env";
import type { IHostedZone } from "aws-cdk-lib/aws-route53";

interface MailApiStackProps extends StackProps {
  zone: IHostedZone;
  databaseUrl: string;
  env: {
    account: string;
    region: string;
  };
  stage: string;
}

export class EmailReciever extends Stack {
  constructor(
    scope: App,
    id: string,
    { stage, zone, databaseUrl, ...props }: MailApiStackProps,
  ) {
    super(scope, id, props);

    const topic = new Topic(this, "MailApiTopic", {});
    const sqs = new Queue(this, "MailApiQueue", {});
    const RAW_emailsBucket = new Bucket(this, "raw-emails-bucket", {});

    new ReceiptRuleSet(this, "ReceiptRuleSet", {
      dropSpam: true,
      rules: [
        {
          enabled: true,
          recipients: [zone.zoneName],
          tlsPolicy: TlsPolicy.REQUIRE,
          actions: [
            new S3Action({
              bucket: RAW_emailsBucket,
              topic,
            }),
          ],
          scanEnabled: true,
        },
      ],
    });

    topic.addSubscription(new SqsSubscription(sqs));
    // AWS_REGION: Builtin in the runtime
    const lambdaEnv = {
      STAGE: stage,
      EMAIL_DOMAIN: zone.zoneName,
      DATABASE_URL: databaseUrl,
    } satisfies Omit<z.infer<typeof envInterface>, "AWS_REGION">;

    const lambda = new Lambda(this, "MailApiFunction", {
      code: Code.fromAsset("packages/mail-reciever/dist"),
      handler: "main.handler",
      functionName: `${stage}-stuff-mail-reciever-function`,
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(20),
      memorySize: 512,
      environment: {
        ...lambdaEnv,
        NODE_OPTIONS: "--enable-source-maps",
      },
    });

    lambda.addToRolePolicy(
      new PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendBounce"],
        resources: ["*"],
      }),
    );

    RAW_emailsBucket.grantDelete(lambda);
    lambda.addEventSource(
      new SqsEventSource(sqs, {
        batchSize: 10,
      }),
    );
    RAW_emailsBucket.grantRead(lambda);
  }
}
