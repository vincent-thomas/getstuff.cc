"use client";

import { useState, type ReactNode } from "react";
import { UserChecker } from "./userChecker";
import { Spinner } from "./icons/spinner";

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
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col gap-4 rounded p-6 text-center">
          {children}
          <p className="text-muted-foreground">
            By clicking submit you agree to the <br />
            terms and conditions
          </p>
        </div>
      </div>
    </>
  );
};

export default Layout;
