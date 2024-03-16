#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DataApiInfra } from "./stack";
import { env } from "../src/env";
import { EmailReciever } from "./email-reciever-stack";

const app = new cdk.App();

const dataApiStack = new DataApiInfra(app, `${env.STAGE}-stuff-infra`, {
  env: {
    region: env.REGION,
    account: env.AWS_ACCOUNT_ID
  },
  zoneName: "getstuff.cc",
  domain: env.DOMAIN,

  stage: env.STAGE
});

new EmailReciever(app, `${env.STAGE}-stuff-email-reciever`, {
  emailDomain: env.DOMAIN,
  env: {
    region: env.REGION,
    account: env.AWS_ACCOUNT_ID
  },
  appUrl: env.APP_URL,
  formattedEmailBucket: dataApiStack.formattedEmailBucket,
  stage: env.STAGE
});

app.synth();
