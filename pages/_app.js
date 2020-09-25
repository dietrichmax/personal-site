import Router from "next/router";
import React, { useEffect } from "react";
import '@/styles/global.css'
//import GlobalStyle from '@/styles/global.js'
import CookieBanner from '@/components/cookies/cookie-banner'
import "prismjs/themes/prism-tomorrow.css";

function MyApp({ Component, pageProps }) {


  return (
    <>
      {/*<GlobalStyle/>*/}
      <Component {...pageProps} />
      <CookieBanner/>
    </>
  )
}

export default MyApp;
