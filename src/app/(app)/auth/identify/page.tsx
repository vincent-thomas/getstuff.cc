import { cn } from "@stuff/components/utils";
import { button } from "@stuff/ui/button/button.css";
import Link from "next/link";
import { stack } from "src/components/recipies";
import { FormInput } from "./_components/form";

const Page = () => {
  return (
    <>
      <div
        className={cn(
          stack({
            justify: "between",
          }),
        )}
      >
        <h1
          className={cn(
            css({ fontWeight: "semibold", fontSize: "large", color: "text2" }),
          )}
        >
          Login to Stuff!
        </h1>
        <Link href="/auth/init" className={cn(button({ variant: "link" }))}>
          Sign up
        </Link>
      </div>
      <FormInput />
    </>
  );
};

export default Page;
