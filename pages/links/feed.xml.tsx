import React from "react"
import { config } from "@/src/data/internal/SiteConfig"
import { getAllLinks } from "@/src/data/external/cms"
const showdown = require("showdown"),
  converter = new showdown.Converter()

interface Link {
  attributes: {
    title: string
    link: string
    description: string
    publishedAt: string
    slug: string
  }
}

const createRssFeed = (links: Link[]) =>
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
        ${links
          .map((link) => {
            return `
            <entry>
              <title>${link.attributes.title}</title>
              <link href="${config.siteUrl}/links/${link.attributes.slug}"/>
              <updated>${link.attributes.publishedAt}</updated>
              <id>${link.attributes.slug}/</id>
              <content type="html">
                <![CDATA[${converter.makeHtml(link.attributes.description)} Link: <a href=${link.attributes.link}>${link.attributes.link}</a>]]>
              </content>
            </entry>
          `
          })
          .join("")}
    </feed>
    `

class Rss extends React.Component {
  static async getInitialProps({ res }) {
    const links = await getAllLinks()

    res.setHeader("Content-Type", "text/xml")
    res.write(createRssFeed(links))
    res.end()
  }
}

export default Rss
