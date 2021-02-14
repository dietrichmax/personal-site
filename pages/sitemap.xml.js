import React from 'react';
import { format } from 'date-fns'
import { getAllPosts, getAllPages, getAllTags, getAllNotes } from '@/lib/data/api/cms'
import config from "@/lib/data/SiteConfig"

const globby = require('globby');


const createSitemap = (posts, tags, pages, notes, morePages) => 

`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   
        ${posts.map((post) => {
          return `
              <url>
                  <loc>${`${config.siteUrl}/articles/${post.slug}`}</loc>
                  <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
                  <changefreq>monthly</changefreq>
                  <priority>0.5</priority>
               </url>
          `;
        })
        .join('')}
        ${pages.map((page) => {
            return `
                <url>
                    <loc>${`${config.siteUrl}/${page.slug}`}</loc>
                    <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.5</priority>
                 </url>
            `;
          })
          .join('')}
        ${tags.map((tag) => {
            return `
                <url>
                    <loc>${`${config.siteUrl}/articles/topics/${tag.slug}`}</loc>
                    <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.5</priority>
                 </url>
            `;
          })
          .join('')}
        ${morePages.map((page) => {
            const path = page
                .replace('pages', '')
                .replace('.js', '')
                .replace('.mdx', '');
              const route = path === '/index' ? '' : path;
              return `
                      <url>
                          <loc>${`${config.siteUrl}${route}`}</loc>
                          <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
                          <changefreq>monthly</changefreq>
                          <priority>0.5</priority>
                      </url>
                  `;
            })
            .join('')}
          ${notes.map((note) => {
            return `
                <url>
                    <loc>${`${config.siteUrl}/notes/${note.slug}`}</loc>
                    <lastmod>${format(new Date(), "yyyy-MM-dd")}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.5</priority>
                 </url>
            `;
          })
          .join('')}
    </urlset>
    `;

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const getPosts = (await getAllPosts()) || []
    const getTags = (await getAllTags()) || []
    const getPages = (await getAllPages()) || []
    const getNote = (await getAllNotes()) || []
    const morePages = await globby([
        'pages/**/*{.js,.mdx}',
        '!pages/**/*[*.js',
        '!pages/_*.js',
        '!pages/sitemap.xml.js',
        '!pages/api',
        '!pages/404.js',
        '!pages/feed.xml.js',
    ]);

    const posts = getPosts
    const pages = getPages
    const tags = getTags
    const notes = getNote
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(posts, tags, pages, notes, morePages));
    res.end();
  }
}

export default Sitemap;
