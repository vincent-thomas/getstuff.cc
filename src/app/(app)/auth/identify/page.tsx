import { button } from "@stuff/ui/button/button.css";
import { Form } from "./_components/form";
import Link from "next/link";
import { cn } from "@stuff/components/utils";
import { stack } from "src/components/recipies";


const Page = () => {
  return (
    <>
      <div
        className={cn(stack({
          justify: "between"
        }))}
      >
        <h1 className={cn(css({fontWeight: "semibold", fontSize: "medium"}))}>Login to Stuff!</h1>
        <Link
          href="/auth/init"
          className={cn(
            button({ variant: "link" })
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
