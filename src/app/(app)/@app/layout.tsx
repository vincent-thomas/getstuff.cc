import { setupLayout } from "src/utils/setupPage";
import { rootStyle } from "./layout.css";
import { getUser as getUserE } from "@backend/utils/user";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyJwt } from "@backend/utils/jwt";
import { Profile } from "./components/profile-image";
import { SubscribeButton } from "./components/subscribe-button";
import { PlusIcon } from "lucide-react";
import { Button } from "@stuff/ui/button";
import { revalidatePath } from "next/cache";
import { db } from "@backend/db";
import { subscriptionTable } from "@backend/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { Link } from "src/components/structure/link";
export const getUser = async () => {
  const jwt = cookies().get("token")?.value;
  if (!jwt) {
    redirect("/identify");
  }

  try {
    const session = await verifyJwt(jwt);
    const user = (await getUserE(session.userId))!;
    const subscription = await db
      .select()
      .from(subscriptionTable)
      .orderBy(desc(subscriptionTable.startDate))
      .where(and(eq(subscriptionTable.customerId, session.customerId)))
      .then(v => v?.[0]);

    const status =
      subscription === undefined ? "inactive" : subscription.status;

    return {
      status,
      when_cancelling: subscription?.canceled_at,
      ...user,
    };
  } catch {
    redirect("/identify");
  }
};

export default setupLayout({
  async Component({ children }) {
    const session = await getUser();
    const shouldRender = cookies().get("warning-attachments")?.value;
    return (
      <div className={cn(stack({ direction: "col" }))}>
        <div
          className={cn(
            rootStyle,
            stack({ direction: "col", gap: "lg" }),
            css({
              width: "full",
              mX: "auto",
              pY: "3xlarge",
              position: "relative",
              pX: "large",
              maxHeight: "screen",
            }),
          )}
        >
          <div
            className={cn(
              stack({ justify: "between", align: "center" }),
              css({ width: "full" }),
            )}
          >
            <h1
              className={cn(
                css({
                  fontSize: "xlarge",
                  color: "text2",
                  fontWeight: "semibold",
                }),
              )}
            >
              Stuff{session.status !== "inactive" ? "+" : ""}
            </h1>
            <div className={cn(stack({ gap: "md", align: "center" }))}>
              {session.when_cancelling && (
                <div
                  className={cn(css({ fontSize: "medium", color: "text1" }))}
                >
                  Stuff+ is canceled,{" "}
                  <Button
                    variant="link"
                    render={<Link href="/blog/closing-subscriptions" />}
                    className={cn(css({ fontSize: "medium" }))}
                  >
                    what happens next?
                  </Button>
                </div>
              )}
              {session.status === "inactive" && <SubscribeButton />}
              <Profile url={session.profileImageUrl} />
            </div>
          </div>
          {shouldRender === undefined && (
            <form
              // biome-ignore lint/suspicious/useAwait: Because server actions
              action={async () => {
                "use server";
                cookies().set("warning-attachments", "1");
                revalidatePath("/");
              }}
            >
              <div
                className={cn(
                  css({ bg: "accent1", p: "large" }),
                  stack({ justify: "between" }),
                )}
                style={{
                  border: `2px solid ${palette.solid2}`,
                  borderRadius: "12px",
                }}
              >
                <div>
                  <h1
                    className={cn(
                      css({ fontSize: "large", fontWeight: "semibold" }),
                    )}
                  >
                    Warning
                  </h1>
                  <p className={cn(css({ fontSize: "medium" }))}>
                    Attachments is not supported
                  </p>
                </div>

                <Button size="sm" type="submit">
                  <PlusIcon size={24} style={{ rotate: "45deg" }} />
                </Button>
              </div>
            </form>
          )}
          {children}
        </div>
      </div>
    );
  },
});
