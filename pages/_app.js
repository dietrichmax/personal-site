import Head from 'next/head'
import React from "react";
import App from "next/app";
import { init } from '@socialgouv/matomo-next';
import GlobalStyle from '@/styles/global.js'
//import CookieBanner from '@/components/cookies/cookie-banner' not used due to no cookies
import "@/styles/prism.css"

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
          {/* Matomo Optimization*/}
          <link 
            rel="dns-prefetch" 
            href="https://analytics.mxd.codes" 
          />,
          <link 
            rel="preload" 
            href="https://analytics.mxd.codes/matomo.js" 
            type="script"
          />,
          {/* Strapi Optimization*/}
          <link 
            rel="preconnect" 
            href="https://api.mxd.codes"
          />,
          {/* webmentions */}
          <link
            rel="prefetch"
            href="https://webmention.io"
          />,
          <link
            rel="preconnect"
            href="https://webmention.io"
          />,
          <link 
            rel="webmention" 
            href="https://webmention.io/mxd.codes/webmention" 
          />,
          <link 
            rel="pingback" 
            href="https://webmention.io/mxd.codes/xmlrpc" 
          />,
          {/* IndieWeb stuff */}
          <link href="https://github.com/DaTurboD/" rel="me" />,
          <link href="https://twitter.com/mxdietrich" rel="me" />,
          <link href="mailto:kontakt@gis-netzwerk.com" rel="me" />,
          <link href="https://www.instagram.com/_maxdietrich/" rel="me" />,
          {/* LineAwsome */}
          <link 
            rel="dns-prefetch" 
            href="https://maxst.icons8.com" 
          />,
          <link 
            rel="preconnect" 
            href="https://maxst.icons8.com"
            crossorigin 
          />,
          <link 
            rel="stylesheet" 
            href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/css/line-awesome.min.css"
          />,
          {/* Google Font */}
          <link 
            rel="dns-prefetch" 
            href="https://fonts.gstatic.com" 
          />,
          <link 
            rel="preconnect" 
            href="https://fonts.googleapis.com" 
            crossorigin 
          />,
          <link 
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Source+Serif+Pro:ital,wght@0,400;0,600;1,400&display=swap" 
          />,
          {/* Typekit 
          <link 
            rel="dns-prefetch" 
            href="https://use.typekit.net" 
          />,
          <link 
            rel="preconnect" 
            href="https://use.typekit.net" 
            crossorigin 
          />,
          <link 
            rel="stylesheet"  
            href="https://use.typekit.net/xhe6fwq.css"
          />*/}
        </Head>
        <GlobalStyle/>
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp;
