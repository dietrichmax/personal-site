export async function getMatomoActions() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=year&date=last&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`)
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch Matomo Actions')
    }
    return json
}


export async function getMatomoLiveCounter() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Live.getCounters&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&lastMinutes=1&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`)
    const liveViews = await res.json()
    if (liveViews.errors) {
      console.error(liveViews.errors)
      throw new Error('Failed to fetch Matomo Actions')
    }
    return liveViews
}

export async function getMatomoPageViews() {
    const getViews = encodeURI(`${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=day&date=previous50&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`)
    const matomoDataLastViews = await fetch(getViews)
    const lastViews = await matomoDataLastViews.json()
    if (lastViews.errors) {
      console.error(lastViews.errors)
      throw new Error('Failed to fetch MATOMO Views')
    }
    return lastViews
}