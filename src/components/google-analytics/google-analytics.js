import { default as Router } from "next/router";

export function addGoogleAnalytics () {
    return new Promise((resolve, reject) => {
      const head = document.getElementsByTagName('head')[0]
      const scriptElement = document.createElement(`script`)
      scriptElement.type = `text/javascript`
      scriptElement.async
      scriptElement.defer
      scriptElement.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`
      scriptElement.onload = () => {
        resolve(true)
      }
      head.appendChild(scriptElement);
    });
}

export function initializeGoogleAnalytics () {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){window.dataLayer.push(arguments);}
    window.gtag('js', new Date())
    window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
      'anonymize_ip': true,
      'allow_google_signals': true
    })
    const pagePath = location ? location.pathname + location.search + location.hash : undefined
    window.gtag(`event`, `page_view`, { page_path: pagePath })
}
  
export function trackGoogleAnalytics () {
    Router.events.on('routeChangeComplete', (url) => {
      window.gtag(`event`, `page_view`, { page_path: url })
    });
}

export function enableGoogleAnalytics () {
    addGoogleAnalytics().then((status) => {
      if (status) {
        initializeGoogleAnalytics()
        trackGoogleAnalytics()
      }
    })
}

export function trackEventGoogleAnalytics (params) {
  window.gtag('send', 'event', "consent", true)
}
