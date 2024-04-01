import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { PageHeador } from "../_components/header"
import type { Metadata } from "next"
import { Logo } from "src/components/logo"
import { BlogPosts } from "./posts"
import { stack } from "src/components/recipies"
import { cn } from "@stuff/components/utils"
import { BlogIcon } from "./blog.icon"



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
    <div className={css({paddingTop: "2xlarge"})}>
      <div className={stack({justify: "between", align: "center"})}>

      <PageHeador
        title={
          <div className={cn(
              css({fontSize: "4xlarge"}),
              stack({gap: "md"})
            )}
          >
            <Logo size={58}/>
            Blog
          </div>
        }
        comment={"A Blog"}
      />
      <BlogIcon />
      </div>

      <BlogPosts posts={posts} />
    </div>
  )
}