import React from 'react';
import { parseISO } from 'date-fns'
import config from "@/lib/data/SiteConfig"
import { getAllPosts, getAllNotes, getAllLinks, getAllBlogrolls } from '@/lib/data/api/cms'
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
              <updated>${parseISO(content.date).toISOString()}</updated>
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
    const blogrolls = (await getAllBlogrolls()) || []

    
    const publishOn = (note) => {
      const platforms = []
      note.publishOnTwitter ? platforms.push(`[](https://brid.gy/publish/twitter)`) :
      note.publishOnInstagram ? platforms.push(`<a href="https://brid.gy/publish/instagram" />`) : 
      note.publishOnReddit ? platforms.push(`<a href="https://brid.gy/publish/reddit" />`) : null
      return platforms
    }

    const allContent = []

    posts.map((post) => {
      allContent.push({
        title: post.title,
        slug: `${config.siteUrl}/articles/${post.slug}`,
        date: post.date,
        content: converter.makeHtml(post.content),
      })
    })


    notes.map((note) => {
      const platforms = publishOn(note)
      allContent.push({
        title: note.date,
        slug: `${config.siteUrl}/notes/${note.date}`,
        date: note.date,
        content: converter.makeHtml(note.content + platforms)
      })
    })

    links.map((link) => {
      allContent.push({
        title: link.title,
        slug: `${link.link}`,
        date: link.date,
        content: converter.makeHtml(link.description)
      })
    })

    blogrolls.map((blogroll) => {
      allContent.push({
        title: blogroll.name,
        slug: blogroll.websiteUrl,
        date: new Date().toISOString(),
        content: converter.makeHtml(blogroll.bio)
      })
    })
    

    res.setHeader('Content-Type', 'text/xml');
    res.write(createRssFeed( allContent ));
    res.end();
  }
}

export default Rss;
