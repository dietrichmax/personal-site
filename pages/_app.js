import Head from 'next/head'
import React from "react";
import App from "next/app";
import { init } from '@socialgouv/matomo-next';
import GlobalStyle from '@/styles/global.js'
import config from "@/lib/data/internal/SiteConfig"
import { ThemeProvider } from 'styled-components'
import { themes } from '@/styles/themes'
//import useDarkMode from 'use-dark-mode'

import "@/styles/mapbox-gl.css"
import "@/styles/prism.css"
import "@/public/fonts/Clarity-City/style.css"
import "@/public/fonts/Cormorant_Garamond/style.css"
//import 'mapbox-gl/dist/mapbox-gl.css';

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

class MyApp extends App {
  //const darkMode = useDarkMode(true)
  //const theme = darkMode.value ? darkTheme : lightTheme
  
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
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          {/* DNS Prefetch*/} 
          <link rel="dns-prefetch" href="https://analytics.mxd.codes" />,
          <link rel="dns-prefetch" href="https://fonts.gstatic.com" />,
          {/* Preconnect */}
          <link rel="preconnect" href="https://api.mxd.codes" crossOrigin="true"/>,
          <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="true" />,
          {/* Preload */}
          <link rel="preload" href="https://analytics.mxd.codes/matomo.js" as="script" />,
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
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
          {/*<link rel='stylesheet' href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.1/mapbox-gl.css'  />*/}
          {/*<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" crossOrigin="true"/>*/}
        
          {/* RSS */}
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle}`} href={`${config.siteUrl}/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Articles`} href={`${config.siteUrl}/articles/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Notes`} href={`${config.siteUrl}/notes/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Links`} href={`${config.siteUrl}/links/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Photos`} href={`${config.siteUrl}/photos/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Activities`} href={`${config.siteUrl}/activities/feed.xml`} />
          
          {/* Android */}
          <meta name="theme-color" content={config.themeColor} />
          <meta name="mobile-web-app-capable" content="yes" />

          {/* iOS */}
          <meta name="apple-mobile-web-app-title" content={config.siteTitle} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <link href="images/icon-52x52.png" rel="apple-touch-icon-precomposed" sizes="57x57" />

          {/*Others */}
          <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />

          {/*Manifest.json  */}
          <link href="/manifest.json" rel="manifest" />

        </Head>
        {/*<ThemeProvider theme={themes}>*/}
          <GlobalStyle/>
          <Component {...pageProps} />
        {/*</ThemeProvider>*/}
      </>
    )
  }
}

export default MyApp;
