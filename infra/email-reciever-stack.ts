import { env } from "@/env";
import { getDataTable, getUserTable } from "@stuff/infra-constants";
import { type App, Duration, Stack, type StackProps } from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { ReceiptRuleSet, TlsPolicy } from "aws-cdk-lib/aws-ses";
import { S3 as S3Action } from "aws-cdk-lib/aws-ses-actions";
import { Topic } from "aws-cdk-lib/aws-sns";
import { SqsSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { z } from "zod";

interface MailApiStackProps extends StackProps {
  emailDomain: string;
  env: {
    account: string;
    region: string;
  };
  formattedEmailBucket: Bucket;
  stage: string;
  appUrl:string;
}

export class EmailReciever extends Stack {
  constructor(
    scope: App,
    id: string,
    { stage, emailDomain, formattedEmailBucket,appUrl, ...props }: MailApiStackProps
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
          recipients: [emailDomain],
          tlsPolicy: TlsPolicy.REQUIRE,
          actions: [
            new S3Action({
              bucket: RAW_emailsBucket,
              topic
            })
          ],
          scanEnabled: true
        }
      ]
    });

    topic.addSubscription(new SqsSubscription(sqs));

    const table = Table.fromTableArn(
      this,
      "EntitiesTable",
      `arn:aws:dynamodb:${props.env.region}:${props.env.account}:table/${getDataTable(env.STAGE)}`
    );
    const tableGSI1 = Table.fromTableArn(
      this,
      "EntitiesTableGSI1",
      `arn:aws:dynamodb:${props.env.region}:${props.env.account}:table/${getDataTable(env.STAGE)}/index/gsi1`
    );

    const usersTable = Table.fromTableArn(
      this,
      "usersTable",
      `arn:aws:dynamodb:${props.env.region}:${props.env.account}:table/${getUserTable(env.STAGE)}`
    );

    const lambda = new Function(this, "MailApiFunction", {
      code: Code.fromAsset("packages/mail-reciever/dist"),
      handler: "main.handler",
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(20),
      environment: {
        STAGE: z.string().parse(stage),
        DOMAIN: emailDomain,
        AWS_ACCOUNT_ID: z.string().parse(props.env.account),
        REGION: z.string().parse(props.env.region),
        NODE_ENV: "production",
        NODE_OPTIONS: "--enable-source-maps",
        APP_URL: appUrl
      }
    });

    formattedEmailBucket.grantPut(lambda);
    usersTable.grant(lambda, "dynamodb:GetItem");

    table.grant(lambda, "dynamodb:PutItem");
    tableGSI1.grant(lambda, "dynamodb:Query");

    lambda.addToRolePolicy(
      new PolicyStatement({
        actions: ["ses:SendEmail"],
        resources: ["*"]
      })
    );

    lambda.addEventSource(
      new SqsEventSource(sqs, {
        batchSize: 10
      })
    );
    RAW_emailsBucket.grantReadWrite(lambda);
  }
}
