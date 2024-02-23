import { fetchGET } from "@/src/utils/fetcher"
import type { NextApiRequest, NextApiResponse } from "next"
import {
  getAllPostSlugs,
  getAllLinkSlugs,
  getAllPageSlugs,
  getAllPhotoSlugs,
  getAllTagSlugs,
  getAllSubscribers,
} from "@/src/data/external/cms"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const liveViews = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Live.getCounters&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&lastMinutes=5&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`
  )

  const thanks = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/thank`
  )

  const pages = await getAllPageSlugs()
  const posts = await getAllPostSlugs()
  const photos = await getAllPhotoSlugs()
  const links = await getAllLinkSlugs()
  const topics = await getAllTagSlugs()
  const subscribers = await getAllSubscribers()
  const comments = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/comments`
  )

  const activities = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/activities`
  )

  /*const overallPageViews = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2018-02-01,${new Date()
      .toISOString()
      .slice(0, 10)}&module=API&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )
  const recentPageViews = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=day&date=previous30&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`
  )

  const allTimeStats = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=VisitsSummary.get&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2011-01-01,${new Date()
      .toISOString()
      .slice(0, 10)}&module=API&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )

  const seoStats = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=SEO.getRank&url=https://mxd.codes/&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`
  )

  const topPages = await fetchGET(
    `${
      process.env.NEXT_PUBLIC_MATOMO_URL
    }?module=API&method=Actions.getPageUrls&segment=pageUrl=@/articles/&flat=1&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2018-02-01,${new Date()
      .toISOString()
      .slice(0, 10)}&format=JSON&filter_limit=5&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )

  const cookieConsent = await fetchGET(
    `${
      process.env.NEXT_PUBLIC_MATOMO_URL
    }?module=API&method=Events.getCategory&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2018-02-01,${new Date()
      .toISOString()
      .slice(
        0,
        10
      )}&filter_limit=10&flat=1&force_api_session=1&format_metrics=1&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )

  const biggestTrafficSource = await fetchGET(
    `${
      process.env.NEXT_PUBLIC_MATOMO_URL
    }?module=API&method=Referrers.getReferrerType&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2018-02-01,${new Date()
      .toISOString()
      .slice(
        0,
        10
      )}&filter_limit=1&flat=1&force_api_session=1&format_metrics=1&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )
  const countryVisits = await fetchGET(
    `${
      process.env.NEXT_PUBLIC_MATOMO_URL
    }?method=UserCountry.getCountry&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2011-01-01,${new Date()
      .toISOString()
      .slice(0, 10)}&module=API&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )
*/

  res.status(200).json({
    analytics: {
      currentVisitors: liveViews[0].visitors,
      /*overallPageViews: overallPageViews.nb_pageviews,
      recentPageViews: recentPageViews,
      allTimeStats: allTimeStats,
      seoStats: seoStats,
      topPages: topPages,
      cookieConsent: cookieConsent,
      biggestTrafficSource: biggestTrafficSource,
      countryVisits: countryVisits,*/
    },
    cms: {
      thanks: thanks.data.attributes.thanks,
      subscribersCount: subscribers.length,
      pagesCount: pages.length,
      postsCount: posts.length,
      linksCount: links.length,
      photosCount: photos.length,
      commentsCount: comments.data.length,
      topicsCount: topics.length,
      activitiesCount: 0,
    },
  })
}
