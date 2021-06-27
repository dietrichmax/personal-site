import React from 'react';
import { format } from 'date-fns'
import { getAllPosts, getAllPages, getAllTags, getAllNotes, getAllRecipes } from '@/lib/data/api/cms'
import config from "@/lib/data/SiteConfig"

//const globby = require('globby');


const createSitemap = (posts, tags, pages, notes, /*morePages,*/ recipes) => 

`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   
        ${posts.map((post) => {
          return `
              <url>
                  <loc>${`${config.siteUrl}/articles/${post.slug}`}</loc>
                  <lastmod>${post.updated_at ? post.updated_at : post.published_at}</lastmod>
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
                    <lastmod>${page.updated_at ? page.updated_at : page.created_at}</lastmod>
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
          ${notes.map((note) => {
            return `
                <url>
                    <loc>${`${config.siteUrl}/notes/${note.slug}`}</loc>
                    <lastmod>${note.updated_at ? note.updated_at : note.created_at}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>0.5</priority>
                 </url>
            `;
          })
          .join('')}
          ${recipes.map((recipe) => {
            return `
                <url>
                    <loc>${`${config.siteUrl}/recipes/${recipe.slug}`}</loc>
                    <lastmod>${recipe.updated_at ? recipe.updated_at : recipe.created_at}</lastmod>
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
    const getRecipes = (await getAllRecipes()) || []
    //const morePages = await globby([
    //    'pages/**/*{.js,.mdx}',
    //    '!pages/**/*[*.js',
    //    '!pages/_*.js',
    //    '!pages/sitemap.xml.js',
    //    '!pages/api',
    //    '!pages/404.js',
    //    '!pages/feed.xml.js',
    //]);

    const posts = getPosts
    const pages = getPages
    const tags = getTags
    const notes = getNote
    const recipes = getRecipes
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap(posts, tags, pages, notes, /*morePages,*/ recipes));
    res.end();
  }
}

export default Sitemap;

/*
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
  .join('')}*/