import { useEffect } from "react"

export function enableGoogleAdsense () {
    const head = document.getElementsByTagName('head')[0]
    const scriptElement = document.createElement(`script`)
    scriptElement.type = `text/javascript`
    scriptElement.async
    scriptElement.crossOrigin = "anonymous"
    scriptElement.defer
    scriptElement.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`
    head.appendChild(scriptElement);
    (window.adsbygoogle = window.adsbygoogle || []).push({});
}

export function LoadGoogleAdsense({client, slot}) {
    /*const loadAds = () => {
        try {
          if (typeof window !== "undefined") {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (error) {
          console.log("adsense error", error.message);
        }
      };
    
      useEffect(() => {
        loadAds();
      }, []);*/
    
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