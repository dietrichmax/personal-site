import React from 'react';
import config from "src/data/internal/SiteConfig"
import { getAllLinks } from 'src/data/external/cms'
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
                <![CDATA[${content.content} Link: <a href=${content.link}>${content.link}</a>]]>
              </content>
            </entry>
          `;
        })
        .join('')}
    </feed>
    `;

class Rss extends React.Component {
  static async getInitialProps({ res }) {
    const links = (await getAllLinks()) || []

    const allContent = []

    links.map((link) => {
      allContent.push({
        title: link.title,
        slug: `${config.siteUrl}/links/${link.link}`,
        date: link.published_at,
        content: converter.makeHtml(link.description),
        link: link.link
      })
    })


    res.setHeader('Content-Type', 'text/xml');
    res.write(createRssFeed( allContent ));
    res.end();
  }
}

export default Rss;
