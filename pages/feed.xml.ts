import React from "react"
import { config } from "@/src/data/internal/SiteConfig"
import { fetchStrapiAPI } from "@/src/data/external/cms"
import { getAllLinks } from "@/src/data/external/cms"

const showdown = require("showdown"),
  converter = new showdown.Converter()

const createRssFeed = (posts, links, photos) =>
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
    const links = await getAllLinks()

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
    res.write(createRssFeed(posts, links, photos))
    res.end()
  }
}

export default Rss
