import { cn } from "@stuff/components/utils";
import { H2, P } from "@stuff/typography";
import { allPosts } from "contentlayer/generated";
import { compareDesc, formatDate } from "date-fns";
import type { Metadata } from "next";
import { Logo } from "src/components/logo";
import { border, stack } from "src/components/recipies";
import { Link } from "src/components/structure/link";
import { PageHeador } from "../_components/header";
import { Section } from "../_components/section";
import { blogContainer } from "./page.css";

export const metadata: Metadata = {
  title: "Stuff Blog",
  description:
    "A blog by Stuff developers spreading messages of how security and privacy is important on the internet.",
};

export default async function BlogPage() {
  const posts = allPosts
    .filter(post => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <Section maxWidth="md" className={cn(css({ paddingTop: "2xlarge" }))}>
      <div
        className={cn(
          css({ mX: "auto", marginBottom: "xlarge" }),
          stack({ justify: "between", align: "center" }),
        )}
      >
        <PageHeador
          title={
            <div
              className={cn(css({ fontSize: "4xlarge" }), stack({ gap: "md" }))}
            >
              <Logo size={58} />
              Blog
            </div>
          }
          comment={"A Blog"}
        />
      </div>

      <div className={blogContainer}>
        {posts.map(post => {
          const readTime = Math.ceil(post.body.raw.split(" ").length / 200);

          const title =
            post.title.length > 37
              ? `${post.title.slice(0, 37)}...`
              : post.title;

          return (
            <Link href={`/blog/${post.id}`} key={post._id}>
              <article
                style={{ whiteSpace: "wrap" }}
                className={cn(
                  stack({
                    direction: "col",
                    justify: "start",
                    align: "start",
                    gap: "xs",
                  }),
                  css({
                    bg: { hover: "bgHover", default: "bgComponent" },
                    height: "full",
                    width: "full",
                    p: "large",
                  }),
                  border({
                    color: "interactive",
                    rounded: "radius",
                    side: "all",
                  }),
                  "relative space-y-2 p-4",
                )}
              >
                <H2
                  className={cn(
                    css({
                      fontWeight: "bold",
                      color: "text2",
                      fontSize: "large",
                    }),
                  )}
                >
                  {title}
                </H2>
                <div
                  className={cn(
                    stack({ gap: "sm" }),
                    css({ fontSize: "small", color: "text1" }),
                  )}
                >
                  <p>{formatDate(post.date, "MMMM dd, yyyy")}</p>
                  <p>•</p>
                  <p>{readTime} minute read</p>
                </div>
                {post.description && <P>{post.description}</P>}
                <div className={css({ marginTop: "auto" })}>
                  <div
                    className={cn(
                      stack({ gap: "md", align: "center" }),
                      css({ color: "text2", marginTop: "medium" }),
                    )}
                  >
                    {post.tags.map(v => (
                      <p key={v}>#{v}</p>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
