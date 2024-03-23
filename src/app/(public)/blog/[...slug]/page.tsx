import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import type { Metadata } from "next"
import Link from "next/link"

import { env } from "@/env"
import { cn } from "@stuff/components/utils"
import { buttonVariants } from "@stuff/ui/button/variants"
import { ChevronLeft } from "lucide-react"
import { formatDate } from "date-fns"
import { Section } from "../../_components/section"
import { PageHeador } from "../../_components/header"
import { Mdx } from "src/components/mdx-components"

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
    // description: post.description,
    // authors: post.authors.map((author) => ({
    //   name: author,
    // })),
    // openGraph: {
    //   title: post.title,
    //   description: post.description,
    //   type: "article",
    //   url: absoluteUrl(post.slug),
    //   images: [
    //     {
    //       url: ogUrl.toString(),
    //       width: 1200,
    //       height: 630,
    //       alt: post.title,
    //     },
    //   ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: post.title,
    //   description: post.description,
    //   images: [ogUrl.toString()],
    // },
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    slug: post.id.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params.slug.join("/"))

  if (!post) {
    notFound()
  }
  return (
    <article>
      <PageHeador
        maxWOverride="800px"
        title={post.title} comment={
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.date, "MMMM dd, yyyy")}
          </time>
      }/>
      <Section className="max-w-[800px]">
        <Mdx code={post.body.code} />
        <div className="flex justify-center py-6 lg:py-10">
          <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </Section>
    </article>
  )
}