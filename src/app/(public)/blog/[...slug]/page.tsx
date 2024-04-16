import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import Link from "next/link";

import { cn } from "@stuff/components/utils";
import { Flex } from "@stuff/structure";
import { H1, H2, P } from "@stuff/typography";
import { button } from "@stuff/ui/button/button.css";
import { formatDate } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { Mdx } from "src/components/mdx-components";
import { ShareFacebook } from "../../_components/share-facebook";
import { ShareTwitter } from "../../_components/share-twitter";

import { env } from "@/env";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "packages/ui/components/tooltip/tooltip";
import { border, stack } from "src/components/recipies";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(slug: string) {
  const post = allPosts.find(post => post.id === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params.slug.join("/"));

  if (!post) {
    return {};
  }

  const url = env.APP_URL;

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", post.title);
  ogUrl.searchParams.set("type", "Blog Post");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: "Vincent Thomas" }],
    twitter: {
      card: "summary_large_image",
      images: [ogUrl],
      title: post.title,
      description: post.description,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.published ? post.date : undefined,
      authors: ["Vincent Thomas"],
      url: `${url}/blog/${post.id}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

const isHeader = (line: string) => {
  return (
    line.startsWith("# ") ||
    line.startsWith("## ") ||
    line.startsWith("### ") ||
    line.startsWith("#### ") ||
    line.startsWith("##### ") ||
    line.startsWith("###### ")
  );
};

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map(post => ({
    slug: post.id.split("/"),
  }));
}

const tableOfContents = (content: string[]) => {
  const _headers = [];
  for (const line of content) {
    if (line.startsWith("# ")) {
      _headers.push(line);
    }
  }

  return _headers.map(v => ({
    title: v.replace("# ", ""),
    slug: v.replace("# ", "").toLowerCase().replaceAll(" ", "-"),
  }));
};

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params.slug.join("/"));

  if (!post) {
    notFound();
  }

  const readTime = Math.ceil(post.body.raw.split(" ").length / 200);
  const toc = tableOfContents(
    post.body.raw.split("\n").filter(v => isHeader(v)),
  );

  return (
    <div
      className={cn(
        css({ mX: "auto", marginTop: "xlarge" }),
        stack({ direction: "col", gap: "xl" }),
      )}
      style={{ maxWidth: "1200px" }}
    >
      <div
        className={cn(
          css({
            width: "full",
            bg: "accent1",
            color: "bgApp",
            p: "2xlarge",
          }),
          stack({ direction: "col" }),
          border({ rounded: "lg" }),
        )}
      >
        <div
          className={cn(
            stack({ gap: "sm", align: "center" }),
            css({ fontWeight: "bold" }),
          )}
        >
          <p>{formatDate(post.date, "LLLL dd, yyyy")}</p>
          <span>•</span>
          <p>{readTime} minute read</p>
        </div>
        <H1
          className={cn(
            css({
              color: "bgApp",

              fontSize: "2xlarge",
              fontWeight: "bolder",
            }),
          )}
        >
          {post.title}
        </H1>
        <p
          className={css({ color: "bgApp", fontWeight: "semibold" })}
          style={{ maxWidth: "70ch" }}
        >
          {post.description}
        </p>
      </div>
      <div className={cn(stack({ direction: "col" }), css({ mX: "auto" }))}>
        <div
          className={cn(
            stack({ justify: "center", gap: "md", direction: "row" }),
          )}
        >
          <aside
            className={cn(
              css({ pX: "medium" }),
              stack({ direction: "col", gap: "xl" }),
              // "px-4 flex flex-col gap-[3.5rem] hidden xl:block",
            )}
          >
            <div
              style={{ top: 0 }}
              className={cn(
                css({
                  position: "sticky",
                  paddingTop: "medium",
                }),
                // "sticky top-[50px] pt-4",
              )}
            >
              <H2>Table of contents</H2>
              <Flex col gap="0.5rem">
                {toc.map(v => (
                  <Link
                    key={v.slug}
                    href={`#${v.slug}`}
                    className="block text-text2 hover:underline"
                  >
                    {v.title}
                  </Link>
                ))}
              </Flex>
            </div>
          </aside>
          <article style={{ maxWidth: "800px" }}>
            {/* <PageHeador
						title={
							<span className={css({ color: "accent1" })}>{post.title}</span>
						}
						comment={
							<>
								<time dateTime={post.date} className="block text-sm text-text2">
									Published on {formatDate(post.date, "MMMM dd, yyyy")}
								</time>
								<span className="text-sm text-text2">
									{readTime} minute read
								</span>
								<p className="flex gap-2 text-text2">
									{post.tags.map((v) => (
										<Link
											key={v}
											target="_blank"
											href={"/blog?q=" + encodeURIComponent(`#${v}`)}
											className="underline"
										>
											#{v}
										</Link>
									))}
								</p>
							</>
						}
					/> */}
            <Flex className="mx-auto px-2 md:px-4" col align="start">
              <Mdx code={post.body.code} />
              <div className="mt-12 border-t border-border w-full">
                <P className={css({ color: "text2" })}>Share post:</P>
                <Flex className="pt-6">
                  <div
                    className={cn(
                      stack({}),
                      css({ bg: "bgSubtle", p: "xsmall" }),
                      border({
                        rounded: "radius",
                        color: "subtle",
                        side: "all",
                      }),
                    )}
                  >
                    <Tooltip>
                      <TooltipTrigger>
                        <ShareTwitter blogId={post.id} />
                      </TooltipTrigger>
                      <TooltipContent>Share on X/Twitter</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <ShareFacebook blogId={post.id} />
                      </TooltipTrigger>
                      <TooltipContent>Share on Facebook</TooltipContent>
                    </Tooltip>
                  </div>
                </Flex>
              </div>
              <div
                className={cn(
                  stack({ justify: "start" }),
                  css({ pY: "xlarge" }),
                )}
              >
                <Link
                  href="/blog"
                  className={cn(
                    button({ variant: "ghost", size: "md", rounded: "medium" }),
                  )}
                >
                  <ChevronLeft size={16} />
                  <span>See all posts</span>
                </Link>
              </div>
            </Flex>
          </article>
        </div>
      </div>
    </div>
  );
}
