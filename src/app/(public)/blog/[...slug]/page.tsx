import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import type { Metadata } from "next"
import Link from "next/link"

import { env } from "@/env"
import { cn } from "@stuff/components/utils"
import { buttonVariants } from "@stuff/ui/button/variants"
import { ChevronLeft } from "lucide-react"
import { formatDate } from "date-fns"
import { PageHeador } from "../../_components/header"
import { Mdx } from "src/components/mdx-components"
import { ShareTwitter } from "../../_components/share-twitter"
import { Flex } from "@stuff/structure"
import { Tooltip, TooltipContent, TooltipTrigger } from "@stuff/ui/tooltip"
import { ShareFacebook } from "../../_components/share-facebook"
import { H2 } from "@stuff/typography"

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
    <Flex col className="max-w-[1200px] mx-auto">
      <Flex className="pt-14" justify="between" gap="1rem">
        <aside className="px-4 flex flex-col gap-[3.5rem] hidden xl:block">
          <div className="sticky top-[132px] pt-4">
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
            <div className="flex justify-center py-6 lg:py-10">
              <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                See all posts
              </Link>
            </div>
          </Flex>
        </article>
      </Flex>
    </Flex>
  )
}