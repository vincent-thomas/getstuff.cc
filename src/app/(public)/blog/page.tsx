import Link from "next/link"
import { allPosts } from "contentlayer/generated"
import { compareDesc, formatDate } from "date-fns"
import { H2 } from "@stuff/typography"
import { Section } from "../_components/section"
import { PageHeador } from "../_components/header"


export const metadata = {
  title: "Blog",
}

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <>
      <PageHeador title={"Blog"} comment="A blog" />
      <Section>
        {posts?.length ? (
          <div className="grid gap-10 sm:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group relative flex flex-col space-y-2"
              >
                <H2 className="text-2xl font-extrabold">{post.title}</H2>
                {post.description && (
                  <p className="text-muted-foreground">{post.description}</p>
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