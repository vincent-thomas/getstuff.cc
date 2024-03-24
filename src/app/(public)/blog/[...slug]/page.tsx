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

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{name: "Vincent Thomas"}],
    twitter: {
      card: "summary",
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
    }
  }
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
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