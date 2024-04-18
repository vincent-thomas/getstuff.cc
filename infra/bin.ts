#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
// import { HostedZone } from "aws-cdk-lib/aws-route53";
import "source-map-support/register";
// import { EmailReciever } from "./email-reciever-stack";
// import { SESIdentityStack } from "./ses-identity-stack";
// import { DataApiInfra } from "./stack";
import { z } from "zod";
import { AppPipeline } from "./pipeline";
const app = new cdk.App();

const env = {
  region: z.string().parse(process.env.AWS_REGION),
  account: z.string().parse(process.env.AWS_ACCOUNT_ID),
};

// const STAGE = z.string().parse(process.env.STAGE);
// const DOMAIN = z.string().parse(process.env.DOMAIN)

const _pipeline = new AppPipeline(app, "stuff-pipeline", {
  env,
});

// const RootStack = new cdk.Stack(app, "stuff-shared-stack", {
//   env
// });

// const zone = HostedZone.fromLookup(RootStack, "stuff-zone", {
//   domainName: DOMAIN,
// });

// const identityStack = new SESIdentityStack(app, "stuff-ses-identity", {
//   env,
//   zone,
// });

// const dataApiStack = new DataApiInfra(app, `${STAGE}-stuff-infra`, {
//   env,
//   domain: DOMAIN,
//   zone,
//   emailIdentity: identityStack.emailIdentity,
//   stage: STAGE,
// });

// new EmailReciever(app, `${STAGE}-stuff-email-reciever`, {
//   emailDomain: DOMAIN,
//   env,
//   formattedEmailBucket: dataApiStack.formattedEmailBucket,
//   stage: STAGE,
// });

app.synth();
