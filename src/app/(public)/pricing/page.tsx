import { Section } from "../_components/section";
import { Card } from "../_components/card";
import { PageHeador } from "../_components/header";
import { CheckoutButton } from "./_components/button-checkout";
import { setupPage } from "@stuff/lib/setupPage";
import { Flex } from "@stuff/structure";
import { StuffBranding } from "../_components/stuff";

export default setupPage({
  Component() {
    return (
      <>
        <PageHeador
          title={<><StuffBranding plus /> Pricing</>}
          comment="Simple pricing for simple services."
        />
        <Section>
          <div className="grid w-full grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4">
            <Card className="flex flex-col" noPadding>
              <div className="p-4">
                <Flex align="center" justify="between">
                  <h2 className="text-3xl font-bold">Stuff free</h2>
                  <p className="text-lg font-semibold text-muted-foreground">
                    free
                  </p>
                </Flex>
                <p className="text-lg text-muted-foreground">
                  Average consumers
                </p>
              </div>
              <div className="border-border w-full border-t" />

              <div className="p-4 bg-background2">
                <p className="text-lg font-semibold">
                  <em>Features included:</em>
                </p>
                <ul className="flex list-disc flex-col gap-2 p-1 pl-6">
                  <li>2GB storage</li>
                  <li>Tracking prevention</li>
                  <li>End-to-End encrypted data</li>
                  <li>Community support</li>
                </ul>
              </div>
            </Card>
            <Card className="flex flex-col rounded-md" noPadding>
              <div className="p-4">
                <Flex align="center" justify="between">
                  <h2 className="text-3xl font-bold">Stuff+</h2>
                  <p className="text-lg font-semibold text-muted-foreground">
                    $2.99/mo
                  </p>
                </Flex>
                <p className="text-lg text-muted-foreground">
                  Average consumers
                </p>
              </div>
              <div className="border-border w-full border-t" />
              <div className="flex grow flex-col p-4 bg-background2">
                <p className="text-lg font-semibold">
                  <em>Features included:</em>
                </p>
                <ul className="flex list-disc flex-col gap-2 p-1 pl-6">
                  <li>Everything in Free</li>
                  <li>20GB storage</li>
                </ul>
                <div className="ml-auto mt-auto">
                  <CheckoutButton />
                </div>
              </div>
            </Card>
          </div>
        </Section>
      </>
    );
  }
});
