import Router from "next/router";
import React, { useEffect } from "react";
import '@/styles/global.css'
//import GlobalStyle from '@/styles/global.js'
import { useAnalytics } from "../lib/useGA";
import CookieBanner from '@/components/cookies/cookie-banner'
import "prismjs/themes/prism-tomorrow.css";

function MyApp({ Component, pageProps }) {

  const { init, trackPageViewed } = useAnalytics();

  useEffect(() => {
      Router.events.on("routeChangeComplete", () => {
        trackPageViewed();
      });
  }, []);

  return (
    <>
      {/*<GlobalStyle/>*/}
      <Component {...pageProps} />
      <CookieBanner/>
    </>
  )
}

export default MyApp;
