import '@/styles/index.css'
import GlobalStyles from '@/styles/global'
import { useEffect } from 'react'
import Router from 'next/router'
import * as gtag from '../lib/gtag'


function isDev() {
  return process.env.NODE_ENV !== "production";
}

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    
    const isDevelopment = isDev();
    
    if (isDevelopment) {
      console.log("Tracking is disabled in development mode")
    } else {
      Router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        Router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
    
  }, [])

  return <Component {...pageProps} />
}

export default App

/*<GlobalStyles />*/
