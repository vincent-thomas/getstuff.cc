import {
  type App,
  CfnOutput,
  RemovalPolicy,
  Stack,
  type StackProps,
} from "aws-cdk-lib";
import { CustomersTable, ThingsTable, UsersTable } from "./constructs/table";

import { getEmailContentBucket } from "@stuff/infra-constants";
import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3";

import {
  CfnAccessKey,
  Effect,
  Policy,
  PolicyDocument,
  PolicyStatement,
  User,
} from "aws-cdk-lib/aws-iam";
import {
  ARecord,
  CnameRecord,
  type IHostedZone,
} from "aws-cdk-lib/aws-route53";
import type { EmailIdentity } from "aws-cdk-lib/aws-ses";

interface AccountStackProps extends StackProps {
  stage: string;
  domain: string;
  zone: IHostedZone;
  emailIdentity: EmailIdentity;
  env: {
    account: string;
    region: string;
  };
}

export class DataApiInfra extends Stack {
  public formattedEmailBucket: Bucket;
  constructor(
    scope: App,
    id: string,
    { stage, domain, zone, emailIdentity, ...props }: AccountStackProps,
  ) {
    super(scope, id, { ...props, crossRegionReferences: true });

    this.formattedEmailBucket = new Bucket(this, "stuff-emails-bucket", {
      bucketName: getEmailContentBucket(stage),
      removalPolicy: RemovalPolicy.DESTROY,
      cors: [
        {
          allowedMethods: [HttpMethods.GET],
          allowedOrigins: ["http://localhost:3000", `https://${domain}`],
        },
      ],
    });

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

    Stack.of(this).tags.setTag("STAGE", stage);
    Stack.of(this).tags.setTag("scope", "stuff-api");
  }
}
