#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { z } from "zod";
import { AppPipeline } from "./lib/pipeline";
import { SESIdentityStack } from "./lib/ses-identity-stack";
import { EmailReciever } from "./lib/email-reciever-stack";
import { HostedZone } from "aws-cdk-lib/aws-route53";
const app = new cdk.App();

const env = {
  region: z.string().parse(process.env.AWS_REGION),
  account: z.string().parse(process.env.AWS_ACCOUNT_ID),
};

const stage = z.string().parse(process.env.STAGE);

const STAGE = z.string().parse(process.env.STAGE);
const DOMAIN = z.string().parse(process.env.DOMAIN);

new AppPipeline(app, "stuff-pipeline", {
  env,
  stage,
});

const RootStack = new cdk.Stack(app, "stuff-shared-stack", {
  env,
});

const zone = HostedZone.fromLookup(RootStack, "stuff-zone", {
  domainName: DOMAIN,
});

new SESIdentityStack(app, "stuff-ses-identity", {
  env,
  zone,
});

new EmailReciever(app, `${stage}-stuff-email-reciever`, {
  zone,
  env,
  stage: STAGE,
});

app.synth();
