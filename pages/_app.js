import Router from "next/router";
import withGA from "next-ga";
import '@/styles/global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withGA(process.env.GA_ID, Router)(MyApp);