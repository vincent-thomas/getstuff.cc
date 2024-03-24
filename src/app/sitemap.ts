import { env } from '@/env'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {

   const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return [
    {
      url: env.APP_URL,
      lastModified: new Date(),
      changeFrequency: "daily"
    },
    {
      url: `${env.APP_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly"
    },
       {
      url: `${env.APP_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly"
    },
    {
      url: `${env.APP_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "weekly"
    },
    {
      url: `${env.APP_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: "weekly"
    },
    ...posts.map(post => ({
      url: `${env.APP_URL}/blog/${post.id}`,
      changeFrequency: "weekly" as const,
      lastModified: new Date(post.date),
    }))
  ]
}