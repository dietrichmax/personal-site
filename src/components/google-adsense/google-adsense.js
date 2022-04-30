import { useEffect } from "react"
import { default as Router } from "next/router";
import Script from 'next/script'

export function enableGoogleAdsense () {
    const head = document.getElementsByTagName('head')[0]
    const scriptElement = document.createElement(`script`)
    scriptElement.type = `text/javascript`
    scriptElement.async
    scriptElement.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`
    scriptElement.crossOrigin = "anonymous"
    head.appendChild(scriptElement);
    window.adsbygoogle = window.adsbygoogle || []
    window.adsbygoogle.push({})
}

export function GoogleAdsenseContainer ( { client, slot }) {

  return (
    <div key={slot}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );     
}