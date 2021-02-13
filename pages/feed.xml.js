import React from 'react';
import { format } from 'date-fns'
import config from "@/lib/data/SiteConfig"
import { getAllPosts, getAllNotes } from '@/lib/data/api/cms'
import markdownToHtml from '@/lib/markdownToHtml'
import remark from 'remark'
import html from 'remark-html'
import slug from 'remark-slug'
const showdown  = require('showdown')
const globby = require('globby')


const createRssFeed = ( allContent ) => 

`<?xml version="1.0" encoding="UTF-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom">   
        <script/>
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
              <updated>${new Date().toISOString()}</updated>
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

    const allContent = []
    const converter = new showdown.Converter()

    posts.map((post) => {
      allContent.push({
        title: post.title,
        slug: `${config.siteUrl}/articles/${post.slug}`,
        date: post.date,
        content: converter.makeHtml(post.content),
      })
    })

    notes.map((note) => {
      allContent.push({
        title: note.date,
        slug: `${config.siteUrl}/notes/${note.date}`,
        date: note.date,
        content: converter.makeHtml(note.content)
      })
    })
    
    res.setHeader('Content-Type', 'text/xml');
    res.write(createRssFeed( allContent ));
    res.end();
  }
}

export default Rss;
