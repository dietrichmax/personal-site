import React from "react"
import { format } from "date-fns"
import {
  getAllPosts,
  getAllPages,
  getAllTags,
  getAllNotes,
  getAllRecipes,
  getAllPhotos,
} from "src/data/external/cms"
import config from "src/data/internal/SiteConfig"
import * as fs from "fs"

const createSitemap = (
  posts,
  tags,
  pages,
  notes,
  photos,
  uniquePages,
  recipes
) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   
        ${posts
          .map((post) => {
            return `
              <url>
                  <loc>${`${config.siteUrl}/articles/${post.slug}`}</loc>
                  <lastmod>${
                    post.updated_at ? post.updated_at : post.published_at
                  }</lastmod>
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
                    <loc>${`${config.siteUrl}/${page.slug}`}</loc>
                    <lastmod>${
                      page.updated_at ? page.updated_at : page.created_at
                    }</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.5</priority>
                 </url>
            `
          })
          .join("")}
          ${uniquePages
            .map((page) => {
              return `
                  <url>
                      <loc>${`${config.siteUrl}/${page}`}</loc>
                      <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
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
                    <loc>${`${config.siteUrl}/topics/${tag.slug}`}</loc>
                    <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.5</priority>
                 </url>
            `
          })
          .join("")}
          ${notes
            .map((note) => {
              return `
                <url>
                    <loc>${`${config.siteUrl}/notes/${note.slug}`}</loc>
                    <lastmod>${
                      note.updated_at ? note.updated_at : note.created_at
                    }</lastmod>
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
                    <loc>${`${config.siteUrl}/photos/${photo.slug}`}</loc>
                    <lastmod>${
                      photo.updated_at ? photo.updated_at : photo.created_at
                    }</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.5</priority>
                 </url>
            `
            })
            .join("")}
          ${recipes
            .map((recipe) => {
              return `
                <url>
                    <loc>${`${config.siteUrl}/recipes/${recipe.slug}`}</loc>
                    <lastmod>${
                      recipe.updated_at ? recipe.updated_at : recipe.created_at
                    }</lastmod>
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
    const getPosts = (await getAllPosts()) || []
    const getTags = (await getAllTags()) || []
    const getPages = (await getAllPages()) || []
    const getNote = (await getAllNotes()) || []
    const getRecipes = (await getAllRecipes()) || []
    const getPhotos = (await getAllPhotos()) || []

    const staticPages = fs
      .readdirSync("pages")
      .filter((staticPage) => {
        return ![
          "api",
          "_app.js",
          "_document.js",
          "404.js",
          "sitemap.xml.js",
          "[slug].js",
          "_error.js",
          "feed.xml.js",
          "manifest.json.js",
        ].includes(staticPage)
      })
      .map((staticPagePath) => {
        return `${staticPagePath.replace(".js", "").replace("index", "")}`
      })
    const uniquePages = [...new Set(staticPages)]
    const posts = getPosts
    const pages = getPages
    const tags = getTags
    const notes = getNote
    const recipes = getRecipes
    const photos = getPhotos

    res.setHeader("Content-Type", "text/xml")
    res.write(
      createSitemap(posts, tags, pages, notes, photos, uniquePages, recipes)
    )
    res.end()
  }
}

export default Sitemap
