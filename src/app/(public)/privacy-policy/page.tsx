import { Section } from "../_components/section";
import { PageHeador } from "../_components/header";
import { H2, P } from "@stuff/typography";
import { setupPage } from "@stuff/lib/setupPage";
import { StuffBranding } from "../_components/stuff";

export default setupPage({
  Component() {
    return (
      <>
        <PageHeador
          title={<><StuffBranding /> Privacy Policy</>}
          comment={
            <>
              For questions and concerns, please contact us at{" "}
              <a href="mailto:vincent@getstuff.cc" className="underline">
                vincent@getstuff.cc
              </a>
            </>
          }
        />
        <Section className="flex flex-col gap-4">
          <P>
            At Stuff, accessible from https://getstuff.cc, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by Stuff and how we use it.
          </P>
          <P>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </P>
          <H2>Log Files</H2>
          <P>
            Stuff follows a standard procedure of using log files. These files
            log visitors when they visit websites. All hosting companies do this
            and a part of hosting services&apos; analytics. The information
            collected by log files include internet protocol (IP) addresses,
            browser type, Internet Service Provider (ISP), date and time stamp,
            referring/exit pages, and possibly the number of clicks. These are
            not linked to any information that is personally identifiable. The
            purpose of the information is for analyzing trends, administering
            the site, tracking users&apos; movement on the website, and
            gathering demographic information.
          </P>
          <H2>Cookies and Web Beacons</H2>
          <P>
            Like any other website, Stuff uses &quot;cookies&quot;. These
            cookies are used to store information including visitors&apos;
            preferences, and the pages on the website that the visitor accessed
            or visited. The information is used to optimize the users&apos;
            experience by customizing our web page content based on
            visitors&apos; browser type and/or other information.
          </P>

          <H2>Third Party Privacy Policies</H2>
          <P>
            Stuff&apos;s Privacy Policy does not apply to other advertisers or
            websites. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options.
          </P>
          <P>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers&apos;
            respective websites. What Are Cookies?
          </P>
          <H2>Online Privacy Policy Only</H2>
          <P>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in Stuff. This policy is not
            applicable to any information collected offline or via channels
            other than this website.
          </P>
          <H2>Consent</H2>
          <P>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its Terms and Conditions.
          </P>
        </Section>
      </>
    );
  }
});
