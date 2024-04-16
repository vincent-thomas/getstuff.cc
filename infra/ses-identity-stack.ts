import { type App, Stack, type StackProps } from "aws-cdk-lib";
import {
  CnameRecord,
  type IHostedZone,
  MxRecord,
  TxtRecord,
} from "aws-cdk-lib/aws-route53";
import {
  DkimIdentity,
  EasyDkimSigningKeyLength,
  EmailIdentity,
  Identity,
  MailFromBehaviorOnMxFailure,
} from "aws-cdk-lib/aws-ses";

interface SESIdentityStackProps extends StackProps {
  env: {
    account: string;
    region: string;
  };
  zone: IHostedZone;
}

export class SESIdentityStack extends Stack {
  public emailIdentity: EmailIdentity;

  constructor(
    scope: App,
    id: string,
    { zone, ...props }: SESIdentityStackProps,
  ) {
    super(scope, id, props);

    this.emailIdentity = new EmailIdentity(this, "stuff-email-identity", {
      identity: Identity.domain(zone.zoneName),
      dkimIdentity: DkimIdentity.easyDkim(
        EasyDkimSigningKeyLength.RSA_2048_BIT,
      ),

      dkimSigning: true,
      feedbackForwarding: false,
      mailFromDomain: `mail.${zone.zoneName}`,
      mailFromBehaviorOnMxFailure: MailFromBehaviorOnMxFailure.REJECT_MESSAGE,
    });

    for (const dkimRecord of this.emailIdentity.dkimRecords) {
      new CnameRecord(
        this,
        `stuff-email-dkim-record-${this.emailIdentity.dkimRecords.indexOf(
          dkimRecord,
        )}`,
        {
          zone,
          recordName: `${dkimRecord.name}.`,
          domainName: dkimRecord.value,
        },
      );
    }

    new MxRecord(this, "stuff-mx-record", {
      values: [
        {
          hostName: `inbound-smtp.${props.env.region}.amazonaws.com`,
          priority: 10,
        },
      ],
      zone,
      recordName: `${zone.zoneName}.`,
    });

    new MxRecord(this, "stuff-feedback-mx-record", {
      values: [
        {
          hostName: `feedback-smtp.${props.env.region}.amazonaws.com`,
          priority: 10,
        },
      ],
      zone,
      recordName: "mail",
    });

    new TxtRecord(this, "stuff-txt-record", {
      zone,
      recordName: `mail.${zone.zoneName}.`,
      values: ["v=spf1 include:amazonses.com ~all"],
    });

    new TxtRecord(this, "stuff-dmarc-record", {
      zone,
      recordName: `_dmarc.${zone.zoneName}.`,
      values: ["v=DMARC1; p=none;"],
    });
  }
}
