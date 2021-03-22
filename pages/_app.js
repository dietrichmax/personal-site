import Head from 'next/head'
import React from "react";
import App from "next/app";
import { init } from '@socialgouv/matomo-next';
import GlobalStyle from '@/styles/global.js'
import config from "@/lib/data/SiteConfig"

import styled from 'styled-components';
import "@/styles/prism.css"
import "@/public/fonts/Clarity-City/style.css"
import "@/public/fonts/Cormorant_Garamond/style.css"

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

class MyApp extends App {
  componentDidMount() {
    if (window.location.href.includes("mxd.codes")) {
      init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID }), 
      window._paq.push(['enableHeartBeatTimer']);
    }
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          {/* DNS Prefetch*/} 
          <link rel="dns-prefetch" href="https://analytics.mxd.codes" />,
          <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />,
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />,
          {/* Preconnect */}
          <link rel="preconnect" href="https://api.mxd.codes" crossorigin/>,
          <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin/>,
          <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />,
          {/* Preload */}
          <link rel="preload" href="https://analytics.mxd.codes/matomo.js" as="script" />,
          {/* IndieCert */}
          <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
          <link rel="micropub" href="https://mxd.codes/micropub" />
          <link rel="token_endpoint" href="https://mxd.codes/token" />
          <link rel="webmention" href="https://webmention.io/mxd.codes/webmention" />,
          <link rel="pingback" href="https://webmention.io/mxd.codes/xmlrpc" />,
          {/* Web Actions 
          <script type="text/javascript" src="/scripts/indieconfig.js" /> 
          <script type="text/javascript" src="/scripts/webaction.js" />*/}
          {/* Me */}
          <link rel="me" href={config.socials.mail} />
          <link rel="me" href={config.socials.github} />
          <link rel="me" href={config.socials.twitter} />
          <link rel="me" href={config.socials.linkedin} />
          <link rel="me" href={config.socials.instagram} />
          {/* Leaflet*/}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" crossorigin/>
      
          {/* Stylesheets */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle}`} href={`${config.siteUrl}/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Articles`} href={`${config.siteUrl}/articles/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Notes`} href={`${config.siteUrl}/notes/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Links`} href={`${config.siteUrl}/links/feed.xml`} />
          {/* Typekit Font 
          <link rel="dns-prefetch" href="https://use.typekit.net" />,
          <link rel="preconnect" href="https://use.typekit.net" crossorigin />,
          <link rel="stylesheet" href="https://use.typekit.net/xhe6fwq.css" />*/}
        </Head>
        <GlobalStyle/>
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp;
