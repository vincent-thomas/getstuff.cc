import { type App, Stack, type StackProps, RemovalPolicy, CfnOutput } from "aws-cdk-lib";
import { CustomersTable, ThingsTable, UsersTable } from "./constructs/table";

import { Bucket, HttpMethods } from "aws-cdk-lib/aws-s3";
import { getEmailContentBucket } from "@stuff/infra-constants";
import {
  DkimIdentity,
  EasyDkimSigningKeyLength,
  EmailIdentity,
  Identity,
  MailFromBehaviorOnMxFailure
} from "aws-cdk-lib/aws-ses";
import { ARecord, CnameRecord, HostedZone, MxRecord } from "aws-cdk-lib/aws-route53";
import { CfnAccessKey, Effect, Policy, PolicyDocument, PolicyStatement, User } from "aws-cdk-lib/aws-iam";

interface AccountStackProps extends StackProps {
  stage: string;
  domain: string;
  zoneName: string;
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
    { stage, domain, zoneName, ...props }: AccountStackProps
  ) {
    super(scope, id, { ...props, crossRegionReferences: true });

    const {table: dataTable} = new ThingsTable(this, "stuff-data-table", {
      stage
    });

    const {table: userTable} = new UsersTable(this, "stuff-users-table", {
      stage
    });

    const {table: customerTable} = new CustomersTable(this, "stuff-customers-table", {
      stage
    });

    this.formattedEmailBucket = new Bucket(this, "stuff-emails-bucket", {
      bucketName: getEmailContentBucket(stage),
      removalPolicy: RemovalPolicy.DESTROY,
      cors: [{
        allowedMethods: [HttpMethods.GET],
        allowedOrigins: ["http://localhost:3000", `https://${domain}`],
      }]
    });

    new EmailIdentity(this, "stuff-email-identity", {
      identity: Identity.domain(domain),
      dkimIdentity: DkimIdentity.easyDkim(
        EasyDkimSigningKeyLength.RSA_2048_BIT
      ),

      dkimSigning: true,
      feedbackForwarding: false,
      mailFromDomain: `mail.${domain}`,
      mailFromBehaviorOnMxFailure: MailFromBehaviorOnMxFailure.REJECT_MESSAGE
    });

    const zone = HostedZone.fromLookup(this, "stuff-zone", {
        domainName: zoneName
      })

    new MxRecord(this, "stuff-mx-record", {
      values: [
        {
          hostName: `inbound-smtp.${props.env.region}.amazonaws.com`,
          priority: 10
        }
      ],
      zone,
      recordName: domain + "."
    });

    new CnameRecord(this, "stuff-email-cname-record", {
      zone,
      recordName: `wwww`,
      domainName: `cname.vercel-dns.com`
    })

    new ARecord(this, "stuff-email-a-record", {
      zone,
      target: {
        values: ["76.76.21.21"]
      }
    })



    const parameterStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["ssm:GetParameter"],
      resources: [
        `arn:aws:ssm:${props.env.region}:${props.env.account}:parameter/stuff/api/${stage}/*`,
        `arn:aws:ssm:${props.env.region}:${props.env.account}:parameter/stuff/api/${stage}/prices/*`
      ]
    });

    const emailSendingStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["ses:SendEmail"],
      resources: [
        `arn:aws:ses:${props.env.region}:${props.env.account}:identity/${domain}`,
      ]
    });

      const storageStatement = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:PutObject"],
      resources: [
        this.formattedEmailBucket.bucketArn + "/*"
      ]
    });



    const inlinePolicy = new PolicyDocument({
      statements: [
        parameterStatement,
        emailSendingStatement,
        storageStatement
      ]
    });
    const user = new User(this, "app-external-user", {
      userName: `${stage}-stuff-app-user`,
    })
    user.attachInlinePolicy(new Policy(this, 'CustomPolicy', {
      policyName: 'MyCustomPolicy',
      document: inlinePolicy
    }))

    userTable.grantReadWriteData(user);
    customerTable.grantReadWriteData(user);
    dataTable.grantReadWriteData(user);

    const userAccessKey = new CfnAccessKey(this, "stuff-access-key", {
      userName: user.userName
    });

    new CfnOutput(this, "userUsername", {value: user.userName})
    new CfnOutput(this, "AppAccessKeyId", {value: userAccessKey.ref})
    new CfnOutput(this, "AppAccessSecretKey", {value: userAccessKey.attrSecretAccessKey})


    Stack.of(this).tags.setTag("STAGE", stage);
    Stack.of(this).tags.setTag("scope", "stuff-api");
  }
}
