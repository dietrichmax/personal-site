import '@/styles/index.css'
import Router from "next/router";
import withGA from "next-ga";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withGA(process.env.GA_ID, Router)(MyApp);
