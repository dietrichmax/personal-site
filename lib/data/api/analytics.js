import { parseISO, format } from "date-fns"

export async function fetchMatomoAPI(query, { variables } = {}) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_MATOMO_URL}${method}&idSite=${
            process.env.NEXT_PUBLIC_MATOMO_SITE_ID
        }${period}&module=API&format=JSON&token_auth=${
            process.env.NEXT_PUBLIC_MATOMO_API_KEY
        }`,
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
        }&period=range&date=2011-01-01,${new Date().toISOString().slice(0,10)}&module=API&format=JSON&token_auth=${
            process.env.NEXT_PUBLIC_MATOMO_API_KEY
        }`
    )
    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error("Failed to fetch Matomo Actions")
    }
    return json
}

export async function getMatomoLiveCounter() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Live.getCounters&idSite=${
            process.env.NEXT_PUBLIC_MATOMO_SITE_ID
        }&lastMinutes=5&module=API&format=JSON&token_auth=${
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

export async function getMatomoPageViews() {
    const getViews = encodeURI(
        `${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${
            process.env.NEXT_PUBLIC_MATOMO_SITE_ID
        }&period=day&date=previous30&module=API&format=JSON&token_auth=${
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

export async function getMatomoAllVisits() {
    const getViews = encodeURI(
        `${
            process.env.NEXT_PUBLIC_MATOMO_URL
        }?method=VisitsSummary.getVisits&idSite=${
            process.env.NEXT_PUBLIC_MATOMO_SITE_ID
        }&period=range&date=2011-01-01,${new Date().toISOString().slice(0,10)}&module=API&format=JSON&token_auth=${
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

export async function getMatomoSumVisitDuration() {
    const getViews = encodeURI(
        `${
            process.env.NEXT_PUBLIC_MATOMO_URL
        }?method=VisitsSummary.getSumVisitsLength&idSite=${
            process.env.NEXT_PUBLIC_MATOMO_SITE_ID
        }&period=range&date=2011-01-01,${new Date().toISOString().slice(0,10)}&module=API&format=JSON&token_auth=${
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
        }&period=range&date=2011-01-01,${new Date().toISOString().slice(0,10)}&module=API&format=JSON&token_auth=${
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
        `${
            process.env.NEXT_PUBLIC_MATOMO_URL
        }?method=SEO.getRank&url=https://mxd.codes/&idSite=${
            process.env.NEXT_PUBLIC_MATOMO_SITE_ID
        }&module=API&format=JSON&token_auth=${
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
