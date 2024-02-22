import { fetchGET } from "@/src/utils/fetcher"
import type { NextApiRequest, NextApiResponse } from "next"
import * as qs from "qs"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const recentPostQuery = qs.stringify({
    sort: ["publishedAt:desc"],
    fields: ["title", "slug"],
  })

  const recentPostsData = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/posts?${recentPostQuery}`
  )

  let recentPosts = []
  recentPostsData.data.slice(0, 4).map((post) =>
    recentPosts.push({
      title: post.attributes.title,
      slug: `/articles/${post.attributes.slug}`,
    })
  )
  const about = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about`
  )

  res.status(200).json({
    recentPosts,
    about: about.data.attributes,
  })
}
