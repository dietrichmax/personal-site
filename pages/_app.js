import { useEffect } from "react"
import GlobalStyle from "@/styles/global.js"
import config from "@/src/data/internal/SiteConfig"
import Providers from "@/src/utils/providers"
import Head from "next/head"
import "@/public/fonts/SF-UI/style.css"
import "@/styles/prism.css"
import { usePathname } from 'next/navigation';



export default function App(props) {
  const { Component, pageProps } = props
  const pathname = usePathname();

  const initializeMatomo = () => {
    if (window.location.href.includes(config.domain)) {
      const scriptElement = document.createElement("script");
      const refElement = document.getElementsByTagName("script")[0];

      const _paq = window._paq = window._paq || [];
      _paq.push(["disableCookies"]);
      _paq.push(['enableLinkTracking']);

      _paq.push(['setSiteId', process.env.NEXT_PUBLIC_MATOMO_SITE_ID]);
      _paq.push(["setTrackerUrl", `${process.env.NEXT_PUBLIC_MATOMO_URL}/matomo.php`]);
      _paq.push(["enableHeartBeatTimer"])
      scriptElement.type = "text/javascript";
      scriptElement.async = true;
      scriptElement.defer = true;
      const fullUrl = `${process.env.NEXT_PUBLIC_MATOMO_URL}/matomo.js`;
      scriptElement.src = fullUrl;
      if (refElement.parentNode) {
        refElement.parentNode.insertBefore(scriptElement, refElement);
      }
    }
  };

  const trackPageviewMatomo = () => {
    if (window.location.href.includes(config.domain)) {
      _paq.push(["setCustomUrl", pathname]);
      _paq.push(['setDocumentTitle', document.title]);
      _paq.push(['trackPageView']);
    }
  }

  useEffect(() => {
      initializeMatomo()
  }, [])

  useEffect(() => {
    trackPageviewMatomo()
  }, [pathname]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        {/* DNS Prefetch*/}
        <link rel="dns-prefetch" href="https://cms.mxd.codes" />
        <link rel="dns-prefetch" href="https://geodaten.mxd.codes" />
        <link rel="dns-prefetch" href="https://analytics.mxd.codes/" />
        {/* Preconnect */}
        <link rel="preconnect" href="https://cms.mxd.codes" />,
        <link rel="preconnect" href="https://analytics.mxd.codes/" />
        {/* Preload */}
        {/* IndieCert */}
        <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
        <link rel="micropub" href="https://mxd.codes/micropub" />
        <link rel="token_endpoint" href="https://mxd.codes/token" />
        <link
          rel="webmention"
          href="https://webmention.io/mxd.codes/webmention"
        />
        ,
        <link rel="pingback" href="https://webmention.io/mxd.codes/xmlrpc" />,
        {/* Me */}
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
