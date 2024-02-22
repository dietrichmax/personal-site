import React from "react"
import { config } from "@/src/data/internal/SiteConfig"
import { fetchStrapiAPI } from "@/src/data/external/cms"

const showdown = require("showdown"),
  converter = new showdown.Converter()

interface Photo {
  attributes: {
    title: string
    slug: string
    publishedAt: string
    description: string
    photo: any
  }
}

const createRssFeed = (photos: Photo[]) =>
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
        ${photos
          .map((photo) => {
            return `
            <entry>
              <title>${photo.attributes.title}</title>
              <link href="${photo.attributes.slug}"/>
              <updated>${photo.attributes.publishedAt}</updated>
              <id>${config.siteUrl}/photos/${photo.attributes.slug}/</id>
              <content type="html">
                <![CDATA[${converter.makeHtml(photo.attributes.description)} Photo: ${photo.attributes.photo.data.map(
                  (photo) => {
                    return `<img
                        src=${process.env.NEXT_PUBLIC_STRAPI_API_URL + photo.attributes.url}
                        alt=${photo.attributes.title}
                      />`
                  }
                )}
                ]]>
              </content>
            </entry>
          `
          })
          .join("")}
    </feed>
    `

class Rss extends React.Component {
  static async getInitialProps({ res }) {
    const photos: any = await fetchStrapiAPI(
      {
        sort: ["publishedAt:desc"],
        populate: {
          photo: {
            poulate: ["formats"],
          },
        },
        fields: ["title", "slug", "updatedAt", "publishedAt", "description"],
      },
      "photos"
    )

    res.setHeader("Content-Type", "text/xml")
    res.write(createRssFeed(photos))
    res.end()
  }
}

export default Rss
