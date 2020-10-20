import React from 'react';
import { format } from 'date-fns'
import { getAllSitemapPosts, getAllSitemapPages, getAllSitemapTags } from '@/lib/data/api/cms'
const globby = require('globby');


const createSitemap = (posts, tags, pages, morePages) => 

`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   
        ${posts.map((post) => {
          return `
              <url>
                  <loc>${`https://mxd.codes/articles/${post.slug}`}</loc>
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
                    <loc>${`https://mxd.codes/${page.slug}`}</loc>
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
                          <loc>${`https://mxd.codes${route}`}</loc>
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
                    <loc>${`https://mxd.codes/articles/topic/${tag.slug}`}</loc>
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
    const getPosts = (await getAllSitemapPosts()) || []
    const getTags = (await getAllSitemapTags()) || []
    const getPages = (await getAllSitemapPages()) || []
    const morePages = await globby([
        'pages/**/*{.js,.mdx}',
        '!pages/**/*[*.js',
        '!pages/_*.js',
        '!pages/sitemap.xml.js',
        '!pages/api'
    ]);
    const posts = getPosts.posts
    const pages = getPages.pages
    const tags = getTags.tags
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(posts, tags, pages, morePages));
    res.end();
  }
}

export default Sitemap;
