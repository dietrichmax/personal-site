import Head from 'next/head'
import React from "react";
import App from "next/app";
import { init } from '@socialgouv/matomo-next';
import GlobalStyle from '@/styles/global.js'
import config from "@/lib/data/SiteConfig"
import "@/styles/prism.css"

import "@/public/fonts/Clarity-City/style.css"
import "@/public/fonts/Happy-Times/style.css"

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
          <link rel="dns-prefetch" href="https://maxst.icons8.com" />,
          <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />,
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />,
          {/* Preconnect */}
          <link rel="preconnect" href="https://api.mxd.codes" crossorigin/>,
          <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin/>,
          <link rel="preconnect" href="https://maxst.icons8.com" crossorigin />,
          <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />,
          {/* Preload */}
          <link rel="preload" href="https://analytics.mxd.codes/matomo.js" as="script" />,
          {/* POSSE POST DISCOVERY */}
          <link rel="feed" href="https://mxd.codes/notes" type="text/html" />,
          {/* IndieCert */}
          <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
          <link rel="micropub" href="https://mxd.codes/micropub" />
          <link rel="token_endpoint" href="https://mxd.codes/token" />
          <link rel="webmention" href="https://webmention.io/mxd.codes/webmention" />,
          <link rel="pingback" href="https://webmention.io/mxd.codes/xmlrpc" />,
          {/* Me */}
          <link rel="me" href={config.socials.mail} />
          <link rel="me" href={config.socials.github} />
          <link rel="me" href={config.socials.twitter} />
          <link rel="me" href={config.socials.linkedin} />
          <link rel="me" href={config.socials.instagram} />
          {/* Stylesheets */}
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" crossorigin/>
          <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/css/line-awesome.min.css" />,
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
      
      <script src="https://cdn.purpleads.io/load.js?publisherId=1c5a04eb3e67a89f46175dea6d694988:41cb18978f35cfac510772db128deb6a1f75831c8958e1f2cc994a11a5482ed29c0a1687bed29dc0e5480f4151f92fc947e67654bfecec255b7618b00144eb3c" id="purpleads-client" /> 
          
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
