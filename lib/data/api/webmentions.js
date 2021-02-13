import config from "@/lib/data/SiteConfig"

const API_URL = "https://webmention.io/api/"

export async function fetchWebmentions() {
    const res = await fetch(`${API_URL}mentions.jf2?domain=${config.domain}&token=${process.env.NEXT_PUBLIC_MATOMO_WEBMENTION_KEY}`) 
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch STRAPI API')
    }

    return json.children
}

