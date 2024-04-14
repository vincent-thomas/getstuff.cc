import { RemovalPolicy, type Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Table,
  AttributeType,
  ProjectionType,
  BillingMode,
} from "aws-cdk-lib/aws-dynamodb";
import {
  getCustomerTable,
  getDataTable,
  getUserTable,
} from "@stuff/infra-constants";

interface TableOptions {
  stage: string;
}
/**
 * Exports a Output named STUFF-TABLE
 */
export class ThingsTable extends Construct {
  public readonly table: Table;
  constructor(
    scope: Stack,
    id: string,

    { stage }: TableOptions,
  ) {
    super(scope, id);
    this.table = new Table(this, `STUFF-TABLE`, {
      tableName: getDataTable(stage),
      partitionKey: {
        name: "pk",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    this.table.addGlobalSecondaryIndex({
      indexName: "gsi1",
      partitionKey: {
        name: "sk",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "pk",
        type: AttributeType.STRING,
      },
      projectionType: ProjectionType.ALL,
    });
    this.table.addGlobalSecondaryIndex({
      indexName: "gsi2",
      partitionKey: {
        name: "gsi2",
        type: AttributeType.STRING,
      },

      projectionType: ProjectionType.KEYS_ONLY,
    });
  }
}

/**
 * Exports a Output named STUFF-TABLE
 */
export class UsersTable extends Construct {
  public readonly table: Table;
  constructor(scope: Stack, id: string, { stage }: TableOptions) {
    super(scope, id);
    this.table = new Table(this, "users-table", {
      tableName: getUserTable(stage),
      partitionKey: {
        name: "user_id",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}

/**
 * Exports a Output named CUSTOMERS-TABLE
 */
export class CustomersTable extends Construct {
  public readonly table: Table;
  constructor(scope: Stack, id: string, { stage }: TableOptions) {
    super(scope, id);
    this.table = new Table(this, "customers-table", {
      tableName: getCustomerTable(stage),
      partitionKey: {
        name: "customer_id",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
