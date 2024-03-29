import { useEffect, ReactElement } from "react"
import GlobalStyle from "@/styles/global"
import "@/src/data/internal/SiteConfig"
import Providers from "@/src/utils/providers"
import Head from "next/head"
import "@/public/fonts/SF-UI/style.css"
import "@/styles/prism.css"
import type { AppProps } from "next/app"
import { config } from "@/src/data/internal/SiteConfig"
import init from "@/src/utils/matomo"

declare global {
  interface Window {
    _paq: any
  }
}

export default function App({ Component, pageProps }: AppProps): ReactElement {
  useEffect(() => {
    if (window.location.href.includes(config.domain)) {
      init({
        url: process.env.NEXT_PUBLIC_MATOMO_URL,
        siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
      })
      window._paq.push(["enableHeartBeatTimer"])
    }
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        {/* DNS Prefetch*/}
        <link
          rel="dns-prefetch"
          href={process.env.NEXT_PUBLIC_STRAPI_API_URL}
        />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_GEODATA_URL} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_MATOMO_URL} />
        {/* Preconnect */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_STRAPI_API_URL} />,
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_MATOMO_URL} />
        {/* Preload */}
        {/* IndieCert */}
        <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
        <link rel="micropub" href={`${config.siteUrl}/micropub`} />
        <link rel="token_endpoint" href={`${config.siteUrl}/token"`} />
        <link
          rel="webmention"
          href={`https://webmention.io/${config.siteTitleShort}/webmention`}
        />
        ,
        <link
          rel="pingback"
          href={`https://webmention.io/${config.siteTitleShort}/xmlrpc`}
        />
        ,{/* Me */}
        <link rel="me" href={config.socials.mail} />
        <link rel="me" href={config.socials.github} />
        <link rel="me" href={config.socials.twitter} />
        <link rel="me" href={config.socials.linkedin} />
        <link rel="me" href={config.socials.instagram} />
        {/* Stylesheets */}
        {/* RSS */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`RSS feed for ${config.siteTitle}`}
          href={`${config.siteUrl}/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`RSS feed for ${config.siteTitle} - Articles`}
          href={`${config.siteUrl}/articles/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`RSS feed for ${config.siteTitle} - Links`}
          href={`${config.siteUrl}/links/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`RSS feed for ${config.siteTitle} - Photos`}
          href={`${config.siteUrl}/photos/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`RSS feed for ${config.siteTitle} - Activities`}
          href={`${config.siteUrl}/activities/feed.xml`}
        />
        {/* Apple */}
        <meta name="application-name" content={config.siteTitle} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={config.siteTitle} />
        <meta name="description" content={config.siteDescription} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/logos/browserconfig.xml" />
        <meta name="msapplication-TileColor" content={config.themeColor} />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logos/apple/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/logos/apple/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logos/apple/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/logos/apple/apple-touch-icon.png"
        />
        {/*Others */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        {/*<link rel='icon' type='image/png' sizes='32x32' href='/static/icons/favicon-32x32.png' />*/}
        {/*<link rel='icon' type='image/png' sizes='16x16' href='/static/icons/favicon-16x16.png' />*/}
        {/*<link rel='mask-icon' href='/static/icons/safari-pinned-tab.svg' color='#5bbad5' />*/}
        {/*Manifest.json  */}
        <link href="/manifest.json" rel="manifest" />
      </Head>
      <Providers>
        <GlobalStyle />
        {/*<CookieBanner />*/}
        <Component {...pageProps} />
      </Providers>
    </>
  )
}
