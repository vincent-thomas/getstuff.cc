"use client";

import { cn } from "@stuff/components/utils";
import { P } from "@stuff/typography";
import { button } from "@stuff/ui/button";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { border, stack } from "src/components/recipies";
import { Spinner } from "./icons/spinner";
import { UserChecker } from "./userChecker";

const Layout = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <UserChecker whenDone={() => setLoading(false)} />
        <Spinner size={24} />
      </div>
    );
  }
  return (
    <>
      <div
        className={cn(
          stack({ direction: "col", align: "center", justify: "center" }),
          css({ height: "screen" }),
        )}
      >
        <div
          className={cn(
            stack({ direction: "col", gap: "md" }),
            css({ p: "large" }),
            border({ rounded: "radius" }),
          )}
          style={{ textAlign: "center" }}
        >
          {children}
          <P>
            By clicking submit you agree to the <br />
            terms and conditions and our{" "}
            <Link
              href="/privacy-policy"
              className={button({ variant: "link" })}
              target="_blank"
            >
              privacy policy
            </Link>
            .
          </P>
        </div>
      </div>
    </>
  );
};

export default Layout;
