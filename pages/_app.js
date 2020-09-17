import Router from "next/router";
import React, { useEffect, useState } from "react";
//import '@/styles/global.css'
import GlobalStyle from '@/styles/global.js'
import { useAnalytics } from "../lib/useGA";
import CookieBanner from '@/components/cookies/cookie-banner'

function MyApp({ Component, pageProps }) {

  const { init, trackPageViewed } = useAnalytics();

  useEffect(() => {
      init("UA-117248551-1");
      trackPageViewed();
      Router.events.on("routeChangeComplete", () => {
        trackPageViewed();
      });
  }, []);

  return (
    <>
      <GlobalStyle/>
      <Component {...pageProps} />
      <CookieBanner/>
    </>
  )
}

export default MyApp;
