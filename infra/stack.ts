import { type App, Stack, type StackProps, RemovalPolicy } from "aws-cdk-lib";
import { CustomersTable, ThingsTable, UsersTable } from "./constructs/table";

import { Bucket } from "aws-cdk-lib/aws-s3";
import { getEmailContentBucket } from "@stuff/infra-constants";

interface AccountStackProps extends StackProps {
  stage: string;
  env: {
    account: string;
    region: string;
  };
}

export class DataApiInfra extends Stack {
  public formattedEmailBucket: Bucket;
  constructor(scope: App, id: string, { stage, ...props }: AccountStackProps) {
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

    Stack.of(this).tags.setTag("STAGE", stage);
    Stack.of(this).tags.setTag("scope", "stuff-api");
  }
}
