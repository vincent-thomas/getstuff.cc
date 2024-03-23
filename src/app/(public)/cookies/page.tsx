import { PageHeador } from "../_components/header";
import { Section } from "../_components/section";
import Link from "next/link";
import { setupPage } from "@stuff/lib/setupPage";
import { H2, P } from "@stuff/typography";
import { env } from "@/env";
import { StuffBranding } from "../_components/stuff";

export default setupPage({
  Component() {
    return (
      <>
        <PageHeador
          title={<>Cookie policy for <StuffBranding /></>}
          comment={
            <>
              This is the Cookie Policy for Stuff, accessible from{" "}
              <Link href={env.APP_URL} className="underline hover:text-primary">
                {env.APP_URL}
              </Link>
              .
            </>
          }
        />
        <Section>
          <H2>What are cookies</H2>
          <P>
            As is common practice with almost all professional websites this
            site uses cookies, which are tiny files that are downloaded to your
            computer, to improve your experience. This page describes what
            information they gather, how we use it and why we sometimes need to
            store these cookies. We will also share how you can prevent these
            cookies from being stored however this may downgrade or
            &apos;break&apos; certain elements of the sites functionality.
          </P>
        </Section>
        <Section>
          <H2>How We Use Cookies</H2>
          <P>
            We use cookies for a variety of reasons detailed below.
            Unfortunately in most cases there are no industry standard options
            for disabling cookies without completely disabling the functionality
            and features they add to this site. It is recommended that you leave
            on all cookies if you are not sure whether you need them or not in
            case they are used to provide a service that you use.
          </P>
        </Section>
        <Section>
          <H2>Disabling Cookies</H2>
          <P>
            You can prevent the setting of cookies by adjusting the settings on
            your browser (see your browser Help for how to do this). Be aware
            that disabling cookies will affect the functionality of this and
            many other websites that you visit. Disabling cookies will usually
            result in also disabling certain functionality and features of the
            this site. Therefore it is recommended that you do not disable
            cookies.
          </P>
        </Section>
        <Section>
          <H2>The Cookies We Set</H2>
          <ul>
            <li>
              <P>Account related cookies</P>
              <P>
                If you create an account with us then we will use cookies for
                the management of the signup process and general administration.
                These cookies will usually be deleted when you log out however
                in some cases they may remain afterwards to remember your site
                preferences when logged out.
              </P>
            </li>
            <li>
              <P>Login related cookies</P>
              <P>
                We use cookies when you are logged in so that we can remember
                this fact. This prevents you from having to log in every single
                time you visit a new page. These cookies are typically removed
                or cleared when you log out to ensure that you can only access
                restricted features and areas when logged in.
              </P>
            </li>
          </ul>
        </Section>
        <Section>
          <H2>Third Party Cookies</H2>
          <P>
            In some special cases we also use cookies provided by trusted third
            parties. The following section details which third party cookies you
            might encounter through this site.
          </P>
          <ul>
            <li>
              <P>
                From time to time we test new features and make subtle changes
                to the way that the site is delivered. When we are still testing
                new features these cookies may be used to ensure that you
                receive a consistent experience whilst on the site whilst
                ensuring we understand which optimisations our users appreciate
                the most.
              </P>
            </li>
          </ul>
        </Section>
        <Section>
          <H2>More Information</H2>
          <P>
            Hopefully that has clarified things for you and as was previously
            mentioned if there is something that you aren&apos;t sure whether
            you need or not it&apos;s usually safer to leave cookies enabled in
            case it does interact with one of the features you use on our site.
          </P>
        </Section>
        <Section>
          <P>
            However if you are still looking for more information then you can
            contact us through one of our preferred contact methods:
          </P>
          <ul>
            <li>Email: vincent@getstuff.cc</li>
          </ul>
        </Section>
      </>
    );
  }
});
