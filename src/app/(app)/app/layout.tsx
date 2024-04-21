import { setupLayout } from "src/utils/setupPage";
import { rootStyle } from "./layout.css";
import { getUser as getUserE } from "backend/utils/user";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyJwt } from "backend/utils/jwt";
import { CreateAliasButton } from "./components/create-alias";
import { Profile } from "./components/profile-image";

export const getUser = async () => {
  const jwt = cookies().get("token")?.value;
  if (!jwt) {
    redirect("/auth/identify");
  }

  try {
    const session = await verifyJwt(jwt);
    return (await getUserE(session.userId))!;
  } catch {
    redirect("/auth/identify");
  }
};

export default setupLayout({
  async Component({ children }) {
    const user = await getUser();

    return (
      <div className={cn(stack({ direction: "col" }))}>
        <div
          className={cn(
            rootStyle,
            stack({ direction: "col", gap: "xl" }),
            css({ width: "full", mX: "auto", pY: "3xlarge", pX: "large" }),
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
              Welcome back, {user.name}!
            </h1>
            <Profile url={user.profileImageUrl} />
          </div>
          <div className={cn(stack({ justify: "between", align: "end" }))}>
            <h2
              className={cn(
                css({
                  color: "text1",
                  fontSize: "medium",
                  fontWeight: "semibold",
                }),
              )}
            >
              Mail aliases:
            </h2>
            <CreateAliasButton />
          </div>
          {children}
        </div>
      </div>
    );
  },
});
