"use client";

import { useState, type ReactNode } from "react";
import { UserChecker } from "./userChecker";
import { Spinner } from "./icons/spinner";
import Link from "next/link";
import { cn } from "@stuff/components/utils";
import { border, stack } from "src/components/recipies";
import { P } from "@stuff/typography";

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
      <div className={cn(stack({direction: "col", align: "center", justify: "center"}), css({height: 'screen'}))}>
        <div className={cn(stack({direction: "col", gap: "md"}),css({p: "large"}), border({rounded: "radius"}))} style={{textAlign: "center"}}>
          {children}
          <P>
            By clicking submit you agree to the <br />
            terms and conditions and our{" "}
            <Link href="/privacy-policy" className="underline" target="_blank">
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
