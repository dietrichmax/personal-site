import { fetchGET } from "@/src/utils/fetcher"
import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const recentPostsData = await fetchGET(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts?_sort=published_at:DESC&_limit=4`)
  let recentPosts = []
  recentPostsData.map((post) => 
    recentPosts.push({
        title: post.title,
        slug: `/articles/${post.slug}`
    })
  )
  const about = await fetchGET(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/about`)

  res.status(200).json({
    recentPosts,
    about
  })
}