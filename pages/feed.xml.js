import React from 'react';
import { format } from 'date-fns'
import config from "@/lib/data/SiteConfig"
import { getAllPosts, getAllNotes } from '@/lib/data/api/cms'
import markdownToHtml from '@/lib/markdownToHtml'
const globby = require('globby');


const createRssFeed = ( allContent ) => 

`<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">   
        <script/>
        <title>${config.siteTitle}</title>
        <subtitle>${config.siteDescription}</subtitle>
        <link href="${config.siteUrl}${config.siteRss}" rel="self" type="application/atom+xml"/>
        <link href="${config.siteUrl}" rel="alternate" type="text/html"/>
        <author>
            <name>Max Dietrich</name>
        </author>
        <updated>${new Date()}</updated>
        <id>${config.siteUrl}</id>
        ${allContent.map((content) => {
          return `
            <entry>
              <title>${content.title}</title>
              <link href="${content.slug}"/>
              <updated>${new Date()}</updated>
              <id>${content.slug}</id>
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
    const allContent = []

    posts.map((post) => {
      allContent.push({
        title: post.title,
        slug: `${config.siteUrl}/articles/${post.slug}`,
        date: post.date,
        content: post.content,
      })
    })
    notes.map((note) => {
      allContent.push({
        title: note.date,
        slug: `${config.siteUrl}/notes/${note.date}`,
        date: note.date,
        content: note.content,
      })
    })
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(createRssFeed( allContent ));
    res.end();
  }
}

export default Rss;
