import { setupPage } from "@/lib/setupPage";
import { Navbar } from "../_components/navbar";
import { Section } from "../_components/section";
import { Flex } from "packages/components/lib/flex";
import { Card } from "../_components/card";
import { Button } from "packages/components/lib";
import { PageHeador } from "../_components/header";

export default setupPage({
  Component() {
    return (
      <>
        <Navbar />
        <PageHeador
          title="Stuff Pricing"
          comment="Simple pricing for simple services."
        />
        <Section>
          <div className="grid w-full grid-cols-2 gap-4">
            <Card className="flex flex-col gap-2" noPadding>
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
              <div className="border-gray w-full border-t" />

              <div className="p-4">
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
            <Card className="flex flex-col gap-2 rounded-md" noPadding>
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
              <div className="border-gray w-full border-t" />
              <div className="flex grow flex-col p-4">
                <p className="text-lg font-semibold">
                  <em>Features included:</em>
                </p>
                <ul className="flex list-disc flex-col gap-2 p-1 pl-6">
                  <li>Everything in Free</li>
                  <li>20GB storage</li>
                </ul>
                <Button className="ml-auto mt-auto font-semibold">
                  Upgrade
                </Button>
              </div>
            </Card>
          </div>
        </Section>
      </>
    );
  }
});
