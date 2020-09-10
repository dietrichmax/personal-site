import Router from "next/router";
import withGA from "next-ga";
import '@/styles/global.css'
import analyticsPageTracking from '../lib/analyticsPageTracking'

function MyApp({ Component, pageProps }) {

  analyticsPageTracking();
  
  return <Component {...pageProps} />
}

export default withGA(process.env.GA_ID, Router)(MyApp);
