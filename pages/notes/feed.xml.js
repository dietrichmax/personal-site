import React from 'react';
import { parseISO } from 'date-fns'
import config from "@/lib/data/SiteConfig"
import { getAllNotes, } from '@/lib/data/api/cms'
const slugify = require('slugify')
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
    const notes = (await getAllNotes()) || []

    const allContent = []

    notes.map((note) => {
      allContent.push({
        title: note.title,
        slug: `${config.siteUrl}/notes/${note.id}`,
        date: note.created_at,
        content: converter.makeHtml(note.content)
      })
    })


    

    res.setHeader('Content-Type', 'text/xml');
    res.write(createRssFeed( allContent ));
    res.end();
  }
}

export default Rss;
