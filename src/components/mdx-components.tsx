import { useMDXComponent } from "next-contentlayer/hooks";
import { z } from "zod";
import { H2, H3, P } from "./typography";
import { button } from "./ui/button";
import { cn } from "./utils";

const components = {
  h1: ({ ...props }) => {
    const id = z
      .string()
      .parse(props.children)
      .toString()
      .toLowerCase()
      .replace(/\s/g, "-");
    return (
      <a
        href={`#${id}`}
        className={cn(
          button({ variant: "link" }),
          css({ marginTop: "large", display: "block" }),
        )}
      >
        <H2
          id={id}
          className={cn(
            css({ fontSize: "2xlarge", fontWeight: "semibold" }),
            "pb-2 scroll-m-14 border-b border-border text-3xl font-semibold tracking-tight transition-colors first:mt-0",
          )}
          {...props}
        />
      </a>
    );
  },
  h2: ({ ...props }) => (
    <H3
      className={cn(
        css({ fontSize: "xlarge", fontWeight: "semibold", marginTop: "large" }),
        "scroll-m-20 text-2xl tracking-tight",
      )}
      {...props}
    />
  ),
  p: ({ ...props }) => (
    <P
      className={cn(
        css({ color: "text2" }),
        "leading-7 [&:not(:first-child)]:mt-4",
      )}
      {...props}
    />
  ),
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
