import { unstable_noStore as noStore } from "next/cache";

import { api } from "@stuff/api-client/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Section } from "./_components/section";
import { Card } from "./_components/card";
import { PageHeador } from "./_components/header";
import { SharedLayout } from "./layout-client";
import { cn } from "@stuff/components/utils"
import { setupPage } from "@stuff/lib/setupPage";
import { buttonVariants } from "@stuff/ui/button/variants";

export default setupPage({
  query: z.object({
    stay: z.enum(["1"]).optional()
  }),
  async Component({ query }) {
    noStore();

    if (query.stay !== "1") {
      const session = await api.user.session.query();
      if (session !== null) {
        redirect("/mail/inbox");
      }
    }

    return (
      <SharedLayout>
        <PageHeador
          title="Focus on what matters with Stuff"
          comment="Stuff mail for the productive"
        />
        <Section>
          <img
            src={"/hero-image.svg"}
            className="mx-auto w-full max-w-[600px] px-4 md:px-10"
            alt="Hero image of a computer with a mail client open"
          />
        </Section>
        <div className="my-6 w-full border-b border-border"></div>
        <Section className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold">Stuff stands for</h2>
          <div className="flex flex-col gap-4">
            <Card>
              <h1 className="text-3xl font-semibold">Most Secure Mail</h1>
              <p className="max-w-[50ch]">
                We keep your account safe to the extreme with protocols such
                as SRP (secure remote password)
              </p>
              <Link
                href="#"
                className={cn(
                  "ml-auto block font-semibold",
                  buttonVariants({ variant: "link" })
                )}
              >
                Learn more
              </Link>
            </Card>
            <Card>
              <h1 className="text-3xl font-semibold">Private</h1>
              <p className="max-w-[50ch]">
                All your user information and emails are end-to-end encrypted
                and is only viewable by you, we can&apos;t even see it.
              </p>
              <Link
                href="#"
                className={cn(
                  "ml-auto block font-semibold",
                  buttonVariants({ variant: "link" })
                )}
              >
                Learn more
              </Link>
            </Card>
            <Card>
              <h1 className="text-3xl font-semibold">Polished</h1>
              <p className="max-w-[50ch]">
                With its polished user experience, you can be sure to get the
                most out of a mail service
              </p>
            </Card>
          </div>
        </Section>
        <Section className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold">Makes your life easier</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h1 className="text-3xl font-semibold">Most Secure Mail</h1>
              <p className="max-w-[50ch]">
                We keep your account safe to the extreme with protocols such
                as SRP (secure remote password)
              </p>
              <Link
                href="#"
                className={cn(
                  "ml-auto block font-semibold",
                  buttonVariants({ variant: "link" })
                )}
              >
                Learn more
              </Link>
            </Card>
            <Card>
              <h1 className="text-3xl font-semibold">Private</h1>
              <p className="max-w-[50ch]">
                All your user information and emails are end-to-end encrypted
                and is only viewable by you, we can&apos;t even see it.
              </p>
              <Link
                href="#"
                className={cn(
                  "ml-auto block font-semibold",
                  buttonVariants({ variant: "link" })
                )}
              >
                Learn more
              </Link>
            </Card>
            <Card>
              <h1 className="text-3xl font-semibold">Polished</h1>
              <p className="max-w-[50ch]">
                With its polished user experience, you can be sure to get the
                most out of a mail service
              </p>
            </Card>
          </div>
        </Section>
      </SharedLayout>
    );
  }
});
