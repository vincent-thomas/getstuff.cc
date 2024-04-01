import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import type { Metadata } from "next"
import Link from "next/link"

import { cn } from "@stuff/components/utils"
import { button } from "@stuff/ui/button/button.css"
import { ChevronLeft } from "lucide-react"
import { formatDate } from "date-fns"
import { PageHeador } from "../../_components/header"
import { Mdx } from "src/components/mdx-components"
import { ShareTwitter } from "../../_components/share-twitter"
import { Flex } from "@stuff/structure"
import { Tooltip, TooltipContent, TooltipTrigger } from "@stuff/ui/tooltip"
import { ShareFacebook } from "../../_components/share-facebook"
import { H2 } from "@stuff/typography"
import { css } from "src/components/styler.css"
import { stack } from "src/components/recipies"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(slug: string) {
  const post = allPosts.find((post) => post.id === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params.slug.join("/"))

  if (!post) {
    return {}
  }

  const url = env.APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set("heading", post.title)
  ogUrl.searchParams.set("type", "Blog Post")
  ogUrl.searchParams.set("mode", "dark")

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{name: "Vincent Thomas"}],
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
          alt: post.title
        }
      ]
    }
  }
}

const isHeader = (line: string) => {
  return line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### ") || line.startsWith("#### ") || line.startsWith("##### ") || line.startsWith("###### ")
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.id.split("/"),
  }))
}

const tableOfContents = (content: string[]) => {
  const _headers = [];
  for (const line of content) {
    if (line.startsWith("# ")) {
      _headers.push(line)
      continue;
    }
  }

  return _headers.map(v => ({title: v.replace("# ", ""), slug: v.replace("# ", "").toLowerCase().replaceAll(" ", "-")}));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params.slug.join("/"))

  if (!post) {
    notFound()
  }

  const readTime = Math.ceil(post.body.raw.split(" ").length / 200);
  const toc = tableOfContents(post.body.raw.split("\n").filter(v => 
    isHeader(v)
  ));


  return (
    <div style={{maxWidth: "1200px"}} className={cn(stack({direction: "col"}),css({mX: "auto"}))}>
      <div className={cn(stack({justify:"center", gap: "md", direction: "row" }))}>
        <aside className="px-4 flex flex-col gap-[3.5rem] hidden xl:block">
          <div className="sticky top-[50px] pt-4">
            <H2>Table of contents</H2>
            <Flex col gap="0.5rem">
              {toc.map(v => <Link key={v.slug} href={`#${v.slug}`} className="block text-text2 hover:underline">{v.title}</Link>)}
            </Flex>
          </div>
        </aside>
        <article className="max-w-[900px]">
          <PageHeador
            title={post.title} comment={<>
              <time
              dateTime={post.date}
              className="block text-sm text-text2"
              >
              Published on {formatDate(post.date, "MMMM dd, yyyy")}
              </time>
              <span className="text-sm text-text2">{readTime} minute read</span>
              <p className="flex gap-2 text-text2">{post.tags.map(v => <Link key={v} target="_blank" href={"/blog?q=" + encodeURIComponent(`#${v}`)} className="underline">#{v}</Link>)}</p>
            </>}
          />
          <Flex className="mx-auto px-2 md:px-4" col align="start">
            <Mdx code={post.body.code} />
            <div className="mt-12 border-t border-border w-full">
              <p className="text-text pt-4">Share post:</p>
              <Flex className="pt-6">
                <Flex className="p-1 bg-background2 border-border border rounded-md">
                  <Tooltip>
                    <TooltipTrigger>
                      <ShareTwitter blogId={post.id} />
                    </TooltipTrigger>
                    <TooltipContent  className="bg-background2 shadow-lg">
                      Share on X/Twitter
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <ShareFacebook blogId={post.id} />
                    </TooltipTrigger>
                    <TooltipContent  className="bg-background2 shadow-lg">
                      Share on Facebook
                    </TooltipContent>
                  </Tooltip>
                </Flex>
              </Flex>
            </div>
            <div className={cn(
              stack({justify: "start"}),
              css({pY: "x-large"})
            )}>
              <Link href="/blog" className={cn(button({ variant: "ghost", size: "md", rounded: "medium" }))}>
                <ChevronLeft size={16} />
                <span>See all posts</span>
              </Link>
            </div>
          </Flex>
        </article>
      </div>
    </div>
  )
}