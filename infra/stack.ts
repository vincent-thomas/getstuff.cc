import { type App, Stack, type StackProps, RemovalPolicy } from "aws-cdk-lib";
import { CustomersTable, ThingsTable, UsersTable } from "./constructs/table";

import { Bucket } from "aws-cdk-lib/aws-s3";
import { getEmailContentBucket } from "@stuff/infra-constants";
import {
  DkimIdentity,
  EasyDkimSigningKeyLength,
  EmailIdentity,
  Identity,
  MailFromBehaviorOnMxFailure
} from "aws-cdk-lib/aws-ses";
import { HostedZone, MxRecord } from "aws-cdk-lib/aws-route53";

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

    new ThingsTable(this, "stuff-data-table", {
      stage
    });

    new UsersTable(this, "stuff-users-table", {
      stage
    });

    new CustomersTable(this, "stuff-customers-table", {
      stage
    });

    this.formattedEmailBucket = new Bucket(this, "stuff-emails-bucket", {
      bucketName: getEmailContentBucket(stage),
      removalPolicy: RemovalPolicy.DESTROY
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

    new MxRecord(this, "stuff-mx-record", {
      values: [
        {
          hostName: `inbound-smtp.${props.env.region}.amazonaws.com`,
          priority: 10
        }
      ],
      zone: HostedZone.fromLookup(this, "stuff-zone", {
        domainName: zoneName
      }),
      recordName: domain + "."
    });

    Stack.of(this).tags.setTag("STAGE", stage);
    Stack.of(this).tags.setTag("scope", "stuff-api");
  }
}
