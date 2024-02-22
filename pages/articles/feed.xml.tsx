import React from "react"
import { config } from "@/src/data/internal/SiteConfig"
import { fetchStrapiAPI } from "@/src/data/external/cms"

const showdown = require("showdown"),
  converter = new showdown.Converter()

interface Post {
  id: number
  attributes: {
    title: string
    slug: string
    content: string
    updatedAt: string
    publishedAt: string
  }
}

const createRssFeed = (posts: Post[]) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">   
        <title>${config.siteTitle}</title>
        <subtitle>${config.siteDescription}</subtitle>
        <link href="${config.siteUrl}${
          config.siteRss
        }" rel="self" type="application/atom+xml"/>
        <link href="${config.siteUrl}/" rel="alternate" type="text/html"/>
        <author>
            <name>Max Dietrich</name>
        </author>
        <updated>${new Date().toISOString()}</updated>
        <id>${config.siteUrl}/</id>
        ${posts
          .map((post) => {
            return `
            <entry>
              <title>${post.attributes.title}</title>
              <link href="${config.siteUrl}/articles/${post.attributes.slug}"/>
              <updated>${post.attributes.updatedAt ? post.attributes.updatedAt : post.attributes.publishedAt}</updated>
              <id>${config.siteUrl}/articles/${post.attributes.slug}</id>
              <content type="html">
                <![CDATA[${post.attributes.content}]]>
              </content>
            </entry>
          `
          })
          .join("")}
    </feed>
    `

class Rss extends React.Component {
  static async getInitialProps({ res }) {
    const posts: any = await fetchStrapiAPI(
      {
        sort: ["publishedAt:desc"],
        populate: {
          photo: {
            poulate: ["formats"],
          },
        },
        fields: ["title", "slug", "updatedAt", "publishedAt", "content"],
      },
      "posts"
    )

    res.setHeader("Content-Type", "text/xml")
    res.write(createRssFeed(posts))
    res.end()
  }
}

export default Rss
