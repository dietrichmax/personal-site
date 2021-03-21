import React from 'react';
import { parseISO } from 'date-fns'
import config from "@/lib/data/SiteConfig"
import { getAllPosts, getAllNotes, getAllLinks, getAllRecipes } from '@/lib/data/api/cms'
const showdown  = require('showdown'),
converter = new showdown.Converter()

const createRssFeed = ( allContent ) => 

`<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">   
        <title>${config.siteTitle}</title>
        <subtitle>${config.siteDescription}</subtitle>
        <link href="${config.siteUrl}${config.siteRss}" rel="self" type="application/atom+xml"/>
        <link href="${config.siteUrl}/" rel="alternate" type="text/html"/>
        <author>
            <name>Max Dietrich</name>
        </author>
        <updated>${new Date().toISOString()}</updated>
        <id>${config.siteUrl}/</id>
        ${allContent.map((content) => {
          return `
            <entry>
              <title>${content.title}</title>
              <link href="${content.slug}"/>
              <updated>${content.date}</updated>
              <id>${content.slug}/</id>
              <content type="html">
                <![CDATA[${content.content}]]>
              </content>
            </entry>
          `;
        })
        .join('')}
    </feed>
    `;

class Rss extends React.Component {
  static async getInitialProps({ res }) {
    const posts = (await getAllPosts()) || []
    const notes = (await getAllNotes()) || []
    const links = (await getAllLinks()) || []
    const recipes = (await getAllRecipes()) || []

    const publishOn = (note) => {
      const endpoints = []
      note.publishOnTwitter ? endpoints.push(`[](https://brid.gy/publish/twitter)`) : null
      return endpoints
    }

    const allContent = []

    posts.map((post) => {
      allContent.push({
        title: post.title,
        slug: `${config.siteUrl}/articles/${post.slug}`,
        date: post.dateUpdated ? post.dateUpdated  : post.published_at,
        content: converter.makeHtml(post.content),
      })
    })


    notes.map((note) => {
      const endpoints = publishOn(note)
      allContent.push({
        title: note.title,
        slug: `${config.siteUrl}/notes/${note.id}`,
        date: note.published_at,
        content: converter.makeHtml(note.content+endpoints)
      })
    })

    links.map((link) => {
      allContent.push({
        title: link.title,
        slug: `${link.link}`,
        date: link.published_at,
        content: converter.makeHtml(link.description)
      })
    })

    
    /*recipes.map((recipe) => {
      allContent.push({
        title: recipe.title,
        slug: `${config.siteUrl}/recipes/${recipe.slug}`,
        date: recipe.created_at,
        content: converter.makeHtml(recipe.description)
      })
    })*/

    res.setHeader('Content-Type', 'text/xml');
    res.write(createRssFeed( allContent ));
    res.end();
  }
}

export default Rss;
