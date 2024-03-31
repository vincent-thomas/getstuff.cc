import { button } from "@stuff/ui/button/button.css";
import { Form } from "./_components/form";
import Link from "next/link";
import { cn } from "@stuff/components/utils";

const Page = () => {
  return (
    <>
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-semibold">Login to Stuff!</h1>
        <Link
          href="/auth/init"
          className={cn(
            button({ variant: "link" }),
            "text-sm font-medium leading-none"
          )}
        >
          Sign up
        </Link>
      </div>
      <Form />
    </>
  );
};

export default Page;
