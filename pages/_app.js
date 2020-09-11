import Router from "next/router";
import React, { useEffect, useState } from "react";
import GlobalStyle from '@/styles/global.js'
import { useAnalytics } from "../lib/useGA";

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
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
