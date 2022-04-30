import { useEffect } from "react"
import { default as Router } from "next/router";

export function enableGoogleAdsense () {
    const head = document.getElementsByTagName('head')[0]
    const scriptElement = document.createElement(`script`)
    scriptElement.type = `text/javascript`
    scriptElement.async
    scriptElement.crossOrigin = "anonymous"
    scriptElement.defer
    scriptElement.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`
    head.appendChild(scriptElement);
}

export function GoogleAdsenseContainer({client, slot}) {


      useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }, []);

      return (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      );
      
}

export function adsenseRefresher () {
  const ads = document.getElementsByClassName("adsbygoogle").length;
      for (let i = 0; i < ads; i++) {
        try {
          (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) { }
      }
  Router.events.on('routeChangeComplete', (url) => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  });
}