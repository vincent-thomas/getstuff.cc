import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc, formatDate } from "date-fns"
import { H2 } from "@stuff/typography"
import { Section } from "../_components/section"
import { PageHeador } from "../_components/header"
import type { Metadata } from "next"
import { Logo } from "src/components/logo"
import { Flex } from "@stuff/structure"


export const metadata: Metadata = {
  title: "Stuff Blog",
  description: "A blog by Stuff developers spreading messages of how security and privacy is important on the internet.",
}

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <>
      <PageHeador title={<Flex gap="1rem"><Logo size={55}/>Blog</Flex>} comment={"A Blog"} />
      <Section>
        {posts?.length ? (
          <div className="grid gap-10 sm:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group relative flex flex-col space-y-2 hover:bg-hover p-4 rounded-xl"
              >
                <H2 className="text-2xl font-extrabold text-text">{post.title}</H2>
                {post.description && (
                  <p className="text-text2">{post.description}</p>
                )}
                {post.date && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date, "MMMM dd, yyyy")}
                  </p>
                )}
                <Link href={`/blog/${post.id}`} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p>No posts published.</p>
        )}
      </Section>
    </>
  )
}