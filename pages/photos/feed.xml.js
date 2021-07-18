import React from 'react';
import config from "@/lib/data/SiteConfig"
import { getAllPhotos } from '@/lib/data/external/cms'
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
                <![CDATA[${content.content} Photo: ${content.photo ? content.photo.map((photo,i) => {
                  <img src={process.env.NEXT_PUBLIC_STRAPI_API_URL+photo.url} alt={photo.title} />
                 }) : null }
                ]]>
              </content>
            </entry>
          `;
        })
        .join('')}
    </feed>
    `;

class Rss extends React.Component {
  static async getInitialProps({ res }) {
    const photos = (await getAllPhotos()) || []

    const allContent = []

    photos.map((photo) => {
      allContent.push({
        title: photo.title,
        slug: `${config.siteUrl}/photos/${photo.slug}`,
        date: photo.published_at,
        content: converter.makeHtml(photo.description),
        photo: photo.photo
      })
    })


    res.setHeader('Content-Type', 'text/xml');
    res.write(createRssFeed( allContent ));
    res.end();
  }
}

export default Rss;
