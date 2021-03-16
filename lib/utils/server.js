import config from "@/lib/data/SiteConfig"

const dev = process.env.NODE_ENV !== 'production'

export const server = dev? 'localhost:3000' : config.siteUrl
