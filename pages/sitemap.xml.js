import React from 'react';
import { format } from 'date-fns'
import { getAllSitemapPosts, getAllSitemapPages } from '@/lib/api/cms'
const globby = require('globby');

const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';


const createSitemap = (posts, pages, morePages) => 

`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   
        ${posts.map((post) => {
          return `
              <url>
                  <loc>${`https://gis-netzwerk.com/blog/${post.slug}`}</loc>
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
                    <loc>${`https://gis-netzwerk.com/blog/${page.slug}`}</loc>
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
                          <loc>${`https://gis-netzwerk.com${route}`}</loc>
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
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(posts, pages, morePages));
    res.end();
  }
}

export default Sitemap;
