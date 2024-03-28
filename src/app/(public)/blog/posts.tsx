"use client";

import { Post } from "contentlayer/generated";
import { Section } from "../_components/section";
import { BlogSearch } from "./_components/blog-search";
import { Link } from "src/components/structure/link";
import { formatDate } from "date-fns";
import { H2 } from "@stuff/typography";
import { useState } from "react";
import { Flex } from "@stuff/structure";



export const BlogPosts =({posts}: {posts: Post[]}) => {

  const [dynPosts, setPosts] = useState<Post[]>(posts);

  const postsToUse = dynPosts.length ? dynPosts : posts;

  return (
    <Section maxWidth="md">
    <BlogSearch blogs={posts} setQuery={(posts) => setPosts(posts)} />
    {posts?.length ? (
      <div className="grid gap-10 sm:grid-cols-2 pt-14">
        {postsToUse.map((post) => (

          <article
            key={post._id}
            className="group relative flex flex-col space-y-2 hover:bg-hover p-4 rounded-xl"
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