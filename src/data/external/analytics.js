export async function fetchMatomoAPI(params) {
  const options = {
    module: params.module || "API",
    method: params.method || "Actions.getPageUrls",
    period: params.period || "month",
    date: params.mdate || "today",
    idSite: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
    format: "json",
    token_auth: process.env.NEXT_PUBLIC_MATOMO_API_KEY,
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}`,
    null,
    { params: options },
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json.data
}

export async function getMatomoActions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2018-02-01,${new Date()
      .toISOString()
      .slice(0, 10)}&module=API&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )
  const actions = await res.json()
  if (actions.errors) {
    console.error(actions.errors)
    throw new Error("Failed to fetch Matomo Actions")
  }
  return actions
}

export async function getMatomoLiveCounter() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Live.getCounters&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&lastMinutes=30&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`
  )
  const liveViews = await res.json()
  if (liveViews.errors) {
    console.error(liveViews.errors)
    throw new Error("Failed to fetch Matomo Actions")
  }
  return liveViews
}

export async function getMatomoPageViews() {
  const getViews = encodeURI(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=day&date=previous30&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`
  )
  const matomoDataLastViews = await fetch(getViews)
  const lastViews = await matomoDataLastViews.json()
  if (lastViews.errors) {
    console.error(lastViews.errors)
    throw new Error("Failed to fetch MATOMO Views")
  }
  return lastViews
}

export async function getMatomoVisitsSummary() {
  const getViews = encodeURI(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=VisitsSummary.get&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2011-01-01,${new Date()
      .toISOString()
      .slice(0, 10)}&module=API&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }`
  )
  const matomoDataLastViews = await fetch(getViews)
  const lastViews = await matomoDataLastViews.json()
  if (lastViews.errors) {
    console.error(lastViews.errors)
    throw new Error("Failed to fetch MATOMO Views")
  }
  return lastViews
}

export async function getMatomoSumVisitDuration() {
  const getViews = encodeURI(
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
  const matomoDataLastViews = await fetch(getViews)
  const lastViews = await matomoDataLastViews.json()
  if (lastViews.errors) {
    console.error(lastViews.errors)
    throw new Error("Failed to fetch MATOMO most viewed pages")
  }
  return lastViews
}

export async function getMatomoCountryVisits() {
  const res = await fetch(
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
  const liveViews = await res.json()
  if (liveViews.errors) {
    console.error(liveViews.errors)
    throw new Error("Failed to fetch Matomo Actions")
  }
  return liveViews
}

export async function getMatomoSEOStats() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=SEO.getRank&url=https://mxd.codes/&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`
  )
  const liveViews = await res.json()
  if (liveViews.errors) {
    console.error(liveViews.errors)
    throw new Error("Failed to fetch Matomo Actions")
  }
  return liveViews
}

export async function getPageUrl(url) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_MATOMO_URL
    }?module=API&method=Actions.getPageUrl&idSite=${
      process.env.NEXT_PUBLIC_MATOMO_SITE_ID
    }&period=range&date=2018-02-01,${new Date()
      .toISOString()
      .slice(0, 10)}&format=JSON&token_auth=${
      process.env.NEXT_PUBLIC_MATOMO_API_KEY
    }&pageUrl=${url}`
  )
  const pageUrl = await res.json()
  if (pageUrl.errors) {
    console.error(pageUrl.errors)
    throw new Error("Failed to fetch pageUrl")
  }
  return pageUrl
}
