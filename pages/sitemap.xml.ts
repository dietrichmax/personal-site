import React from "react"
import {
  getAllPosts,
  getAllPages,
  getAllPhotos,
  getAllLinks,
  getAllTags
} from "@/src/data/external/cms"
import { config } from "@/src/data/internal/SiteConfig"
import * as fs from "fs"
const showdown = require("showdown")
const converter = new showdown.Converter()

const createSitemap = (posts, pages, photos, links, staticPages, tags) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   
      ${posts
        .map((post) => {
          return `
          <url>
          <loc>${`${config.siteUrl}/articles/${post.attributes.slug}`}</loc>
            <lastmod>${post.attributes.updatedAt ? post.attributes.updatedAt : post.attributes.createdAt}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.5</priority>
          </url>
        `
        })
        .join("")}
        ${pages
          .map((page) => {
            return `
              <url>
                <loc>${`${config.siteUrl}/${page.attributes.slug}`}</loc>
                <lastmod>${page.attributes.updatedAt ? page.attributes.updatedAt : page.attributes.createdAt}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.5</priority>
              </url>
            `
          })
          .join("")}
        ${staticPages
          .map((staticPage) => {
            return `
              <url>
                <loc>${`${config.siteUrl}/${staticPage}`}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.5</priority>
              </url>
            `
          })
          .join("")}
          ${photos
            .map((photo) => {
              return `
              <url>
              <loc>${`${config.siteUrl}/photos/${photo.attributes.slug}`}</loc>
                <lastmod>${photo.attributes.updatedAt ? photo.attributes.updatedAt : photo.attributes.createdAt}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>0.5</priority>
              </url>
            `
            })
            .join("")}
            ${links
              .map((link) => {
                return `
                <url>
                <loc>${`${config.siteUrl}/links/${link.attributes.slug}`}</loc>
                  <lastmod>${link.attributes.updatedAt ? link.attributes.updatedAt : link.attributes.createdAt}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>0.5</priority>
                </url>
              `
              })
              .join("")}
              ${tags
                .map((tag) => {
                  return `
                  <url>
                  <loc>${`${config.siteUrl}/topics/${tag.attributes.slug}`}</loc>
                    <lastmod>${tag.attributes.updatedAt ? tag.attributes.updatedAt : tag.attributes.createdAt}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.5</priority>
                  </url>
                `
                })
                .join("")}
    </urlset>
    `

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const posts = await getAllPosts()
    const pages = await getAllPages()
    const photos = await getAllPhotos()
    const links = await getAllLinks()
    const tags = await getAllTags()

    const staticPages = fs
      .readdirSync("pages")
      .filter((staticPage) => {
        return ![
          "api",
          "_app.tsx",
          "_document.tsx",
          "404.tsx",
          "sitemap.xml.ts",
          "[slug].tsx",
          "_error.tsx",
          "feed.xml.ts",
          "manifest.json.ts",
        ].includes(staticPage)
      })
      .map((staticPagePath) => {
        return `${staticPagePath.replace(".js", "").replace(".jsx", "").replace(".ts", "").replace(".tsx", "").replace("index", "")}`
      })

    res.setHeader("Content-Type", "text/xml")
    res.write(createSitemap(posts, pages, photos, links, staticPages, tags))
    res.end()
  }
}

export default Sitemap
