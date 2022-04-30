import Head from 'next/head'
import React from "react";
import App from "next/app";
import { init } from '@socialgouv/matomo-next';
import GlobalStyle from '@/styles/global.js'
import config from "src/data/internal/SiteConfig"
import Providers from 'src/utils/providers';
import CookieBanner from "@/components/cookies/cookie-banner"
import Cookie from "js-cookie"
import { enableGoogleAnalytics } from '@/components/google-analytics/google-analytics';
import { enableGoogleAdsense } from "@/components/google-adsense/google-adsense"
import "@/styles/mapbox-gl.css"
import "@/styles/prism.css"
import "@/public/fonts/Clarity-City/style.css"
//import 'mapbox-gl/dist/mapbox-gl.css';


class MyApp extends App {

  
  
  componentDidMount() {
    if (window.location.href.includes("mxd.codes")) {
      init({ 
        url: process.env.NEXT_PUBLIC_MATOMO_URL, 
        siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID
      }), 
      window._paq.push(['enableHeartBeatTimer']);
      
      if (Cookie.get("consent")) {
        enableGoogleAnalytics();
        enableGoogleAdsense();
      }
    }
  }

  componentDidUpdate() {
    if (window.location.href.includes("mxd.codes")) {
      if (Cookie.get("consent")) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }
  }

  
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />

          {/* DNS Prefetch*/} 
  
          {/* Preconnect */}
          <link rel="preconnect" href="https://api.mxd.codes" crossOrigin />,
          <link rel="preconnect" href="https://static-maps-api.mxd.codes" crossOrigin />,
          {/* Preload */}

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
        
          {/* RSS */}
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle}`} href={`${config.siteUrl}/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Articles`} href={`${config.siteUrl}/articles/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Notes`} href={`${config.siteUrl}/notes/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Links`} href={`${config.siteUrl}/links/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Photos`} href={`${config.siteUrl}/photos/feed.xml`} />
          <link rel="alternate" type="application/rss+xml" title={`RSS feed for ${config.siteTitle} - Activities`} href={`${config.siteUrl}/activities/feed.xml`} />
          
          {/* Apple */}
          <meta name='application-name' content={config.siteTitle} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={config.siteTitle} />
          <meta name='description' content={config.siteDescription} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/logos/browserconfig.xml' />
          <meta name='msapplication-TileColor' content={config.themeColor} />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />

          <link rel='apple-touch-icon' href='/logos/apple/apple-touch-icon.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/logos/apple/apple-touch-icon.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/logos/apple/apple-touch-icon.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/logos/apple/apple-touch-icon.png' />



          {/*Others */}
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />          
          {/*<link rel='icon' type='image/png' sizes='32x32' href='/static/icons/favicon-32x32.png' />*/}
          {/*<link rel='icon' type='image/png' sizes='16x16' href='/static/icons/favicon-16x16.png' />*/}
          {/*<link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' />*/}

          {/*Manifest.json  */}
          <link href="/manifest.json" rel="manifest" />

        </Head>
        <Providers>
          <GlobalStyle/> 
          <CookieBanner/> 
          <Component {...pageProps} />
        </Providers>
      </>
    )
  }
}

export default MyApp;
