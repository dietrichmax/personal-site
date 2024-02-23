import { fetchGET } from "@/src/utils/fetcher"
import { config } from "../internal/SiteConfig"

export async function getMatomoActions() {
  const actions = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2018-02-01,${new Date()
      .toISOString()
      .slice(0, 10)}&module=API&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )
  if (actions.errors) {
    console.error(actions.errors)
    throw new Error("Failed to fetch Matomo Actions")
  }
  return actions
}

export async function getMatomoLiveCounter() {
  const liveViews = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Live.getCounters&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&lastMinutes=5&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`
  )
  if (liveViews.errors) {
    console.error(liveViews.errors)
    throw new Error("Failed to fetch Matomo Actions")
  }
  return liveViews
}

export async function getMatomoPageViews() {
  const lastViews = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=day&date=previous30&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`
  )
  if (lastViews.errors) {
    console.error(lastViews.errors)
    throw new Error("Failed to fetch MATOMO Views")
  }
  return lastViews
}

export async function getMatomoVisitsSummary() {
  const lastViews = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=VisitsSummary.get&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2011-01-01,${new Date()
      .toISOString()
      .slice(0, 10)}&module=API&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )
  if (lastViews.errors) {
    console.error(lastViews.errors)
    throw new Error("Failed to fetch MATOMO Views")
  }
  return lastViews
}

export async function getMatomoSumVisitDuration() {
  const lastViews = await fetchGET(
    `${
      process.env.NEXT_PUBLIC_MATOMO_URL
    }?method=VisitsSummary.getSumVisitsLength&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2011-01-01,${new Date()
      .toISOString()
      .slice(0, 10)}&module=API&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )
  if (lastViews.errors) {
    console.error(lastViews.errors)
    throw new Error("Failed to fetch MATOMO most viewed pages")
  }
  return lastViews
}

export async function getMatomoCountryVisits() {
  const liveViews = await fetchGET(
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
  if (liveViews.errors) {
    console.error(liveViews.errors)
    throw new Error("Failed to fetch Matomo Actions")
  }
  return liveViews
}

export async function getMatomoConsentEvent() {
  const consentEvent = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=SEO.getRank&url=https://mxd.codes/&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`
  )
  if (consentEvent.errors) {
    console.error(consentEvent.errors)
    throw new Error("Failed to fetch Matomo Actions")
  }
  return consentEvent
}

export async function getMatomoSEOStats() {
  const liveViews = await fetchGET(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=SEO.getRank&url=https://mxd.codes/&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`
  )
  if (liveViews.errors) {
    console.error(liveViews.errors)
    throw new Error("Failed to fetch Matomo Actions")
  }
  return liveViews
}

export async function getMatomoTopPageUrls() {
  let topPages: Array<any> = []
  const pageUrl = await fetchGET(
    `${
      process.env.NEXT_PUBLIC_MATOMO_URL
    }?module=API&method=Actions.getPageUrls&flat=1&filter_column=label&filter_pattern=%5E%2Farticles%2F&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2018-02-01,${new Date()
      .toISOString()
      .slice(0, 10)}&filter_limit=-1&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )
  if (pageUrl.errors) {
    console.error(pageUrl.errors)
    throw new Error("Failed to fetch pageUrl")
  } else {
    pageUrl.map((page: any) => {
      if (page.url != undefined) {
        if (!page.url.includes("?")) {
          topPages.push({
            label: page.label,
            nb_hits: page.nb_hits,
          })
        } else {
          const uniquePage = page.url.split("?")[0].replace(config.siteUrl, "")
          const topPagesIndex = topPages.findIndex(
            (obj) => obj.label === uniquePage
          )
          topPages[topPagesIndex].nb_hits += page.nb_hits
        }
      }
    })
  }
  const sortedTopPages = topPages.sort((a, b) => b.nb_hits - a.nb_hits)
  const slicedSortedTopPages = sortedTopPages.slice(0, 7)

  return slicedSortedTopPages
}

export async function getMatomoViewForPage(url) {
  const pageUrl = await fetchGET(
    `${
      process.env.NEXT_PUBLIC_MATOMO_URL
    }?module=API&method=Actions.get&segment=pageUrl=@${url}&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2018-02-01,${new Date()
      .toISOString()
      .slice(0, 10)}&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )
  if (pageUrl.errors) {
    console.error(pageUrl.errors)
    throw new Error("Failed to fetch pageUrl")
  }
  return pageUrl
}

export async function getMatomoConsent() {
  const pageUrl = await fetchGET(
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
  if (pageUrl.errors) {
    console.error(pageUrl.errors)
    throw new Error("Failed to fetch pageUrl")
  }
  return pageUrl
}

export async function getBiggestTrafficSource() {
  const pageUrl = await fetchGET(
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
  if (pageUrl.errors) {
    console.error(pageUrl.errors)
    throw new Error("Failed to fetch pageUrl")
  }
  return pageUrl
}
