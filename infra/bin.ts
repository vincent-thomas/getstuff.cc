#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import "source-map-support/register";
import { env } from "../src/env";
import { EmailReciever } from "./email-reciever-stack";
import { SESIdentityStack } from "./ses-identity-stack";
import { DataApiInfra } from "./stack";
import { Pipeline } from "./pipeline";

const app = new cdk.App();


const pipeline = new Pipeline(app, "stuff-pipeline", {
  env: {
    region: env.AWS_REGION,
    account: env.AWS_ACCOUNT_ID
  }
});

const RootStack = new cdk.Stack(app, "stuff-shared-stack", {
  env: {
    region: env.AWS_REGION,
    account: env.AWS_ACCOUNT_ID,
  },
});

const zone = HostedZone.fromLookup(RootStack, "stuff-zone", {
  domainName: env.DOMAIN,
});

const identityStack = new SESIdentityStack(app, "stuff-ses-identity", {
  env: {
    region: env.AWS_REGION,
    account: env.AWS_ACCOUNT_ID,
  },
  zone,
});

const dataApiStack = new DataApiInfra(app, `${env.STAGE}-stuff-infra`, {
  env: {
    region: env.AWS_REGION,
    account: env.AWS_ACCOUNT_ID,
  },
  domain: env.DOMAIN,
  zone,
  emailIdentity: identityStack.emailIdentity,
  stage: env.STAGE,
});

new EmailReciever(app, `${env.STAGE}-stuff-email-reciever`, {
  emailDomain: env.DOMAIN,
  env: {
    region: env.AWS_REGION,
    account: env.AWS_ACCOUNT_ID,
  },
  formattedEmailBucket: dataApiStack.formattedEmailBucket,
  stage: env.STAGE,
});

app.synth();
