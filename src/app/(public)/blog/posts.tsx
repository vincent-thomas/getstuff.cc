"use client";

import { Post } from "contentlayer/generated";
import { Section } from "../_components/section";
import { BlogSearch } from "./_components/blog-search";
import { Link } from "src/components/structure/link";
import { formatDate } from "date-fns";
import { H2 } from "@stuff/typography";
import { useState } from "react";



export const BlogPosts =({posts}: {posts: Post[]}) => {

  const [dynPosts, setPosts] = useState<Post[]>(posts);

  const postsToUse = dynPosts.length ? dynPosts : posts;

  return (
    <Section>
    <BlogSearch blogs={posts} setQuery={(posts) => setPosts(posts)} />
    {posts?.length ? (
      <div className="grid gap-10 sm:grid-cols-2 pt-14">
        {postsToUse.map((post) => (
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
  )
}