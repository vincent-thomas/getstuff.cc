#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { z } from "zod";
import { SESIdentityStack } from "./lib/ses-identity-stack";
import { EmailReciever } from "./lib/email-reciever-stack";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { CDPipeline } from "./stacks/cd";
const app = new cdk.App();

const env = {
  region: z.string().parse(process.env.AWS_REGION),
  account: z.string().parse(process.env.AWS_ACCOUNT_ID),
};

const stage = z.string().parse(process.env.STAGE);
const DOMAIN = z.string().parse(process.env.NEXT_PUBLIC_DOMAIN);
const DATABASE_URL = z.string().parse(process.env.DATABASE_URL);

const RootStack = new cdk.Stack(app, "stuff-shared-stack", {
  env,
});

const zone = HostedZone.fromLookup(RootStack, "stuff-zone", {
  domainName: DOMAIN,
});

new CDPipeline(app, "stuff-cd-pipeline", {
  env,
})

new SESIdentityStack(app, "stuff-ses-identity", {
  env,
  zone,
});

new EmailReciever(app, `${stage}-stuff-email-reciever`, {
  zone,
  env,
  stage,
  databaseUrl: DATABASE_URL,
});

app.synth();
