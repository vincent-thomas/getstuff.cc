import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { PageHeador } from "../_components/header"
import type { Metadata } from "next"
import { Logo } from "src/components/logo"
import { Flex } from "@stuff/structure"
import { BlogPosts } from "./posts"


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
      <BlogPosts posts={posts} />
    </>
  )
}