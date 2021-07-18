import config from "@/lib/data/internal/SiteConfig"

const API_URL = "https://webmention.io/api/"
const pageLimit = 1000

export async function fetchWebmentions() {
    const res = await fetch(`${API_URL}mentions.jf2?domain=${config.domain}&per-page=${pageLimit}&page=0&token=${process.env.NEXT_PUBLIC_WEBMENTION_KEY}`) 
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch STRAPI API')
    }

    return json.children
}

