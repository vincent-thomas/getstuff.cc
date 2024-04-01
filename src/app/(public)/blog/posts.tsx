"use client";

import { Post } from "contentlayer/generated";
import { Section } from "../_components/section";
import { BlogSearch } from "./_components/blog-search";
import { Link } from "src/components/structure/link";
import { formatDate } from "date-fns";
import { H2 } from "@stuff/typography";
import { useState } from "react";
import { Flex } from "@stuff/structure";
import { cn } from "@stuff/components/utils";
import { button } from "@stuff/ui/button";
import { stack } from "src/components/recipies";

export const BlogPosts =({posts}: {posts: Post[]}) => {

  const [dynPosts, setPosts] = useState<Post[]>(posts);

  const postsToUse = dynPosts.length ? dynPosts : posts;

  return (
    <Section maxWidth="md">
    <BlogSearch blogs={posts} setQuery={(posts) => setPosts(posts)} />
    {posts?.length ? (
      <div style={{display:"grid", gridTemplateColumns: "1fr 1fr",gap:"2.5rem"}}>
        {postsToUse.map((post) => (

          <article
            key={post._id}
            style={{whiteSpace: "wrap"}}
            className={cn(stack({direction: "col"}),button({variant: "ghost", size: "md", rounded: "medium"}),"relative space-y-2 p-4")}
          >
            <Link href={`/blog/${post.id}`}>
            <H2 className="text-2xl font-extrabold text-text">{post.title}</H2>
            {post.description && (
              <p className="text-text2">{post.description}</p>
            )}
            {post.date && (
              <p className="text-sm text-muted-foreground">
                {formatDate(post.date, "MMMM dd, yyyy")}
              </p>
            )}
            <Flex gap="1rem" align="center">{post.tags.map(v => <p key={v}>#{v}</p>)}</Flex>
            </Link>

          </article>
        ))}
      </div>
    ) : (
      <p>No posts published.</p>
    )}
  </Section>
  )
}