import Router from "next/router";
import React, { useEffect, useState } from "react";
import GlobalStyle from '@/styles/global.js'
import { useAnalytics } from "../lib/useGA";

function MyApp({ Component, pageProps }) {

  // Check if in production
  const isProduction = process.env.NODE_ENV === 'production'

  const { init, trackPageViewed } = useAnalytics();

  useEffect(() => {
    if (isProduction) {
      init("UA-117248551-1");
      trackPageViewed();
      Router.events.on("routeChangeComplete", () => {
        trackPageViewed();
      });
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
