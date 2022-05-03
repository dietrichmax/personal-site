import { useEffect } from 'react';

export function enableGoogleAdsense () {
    const head = document.getElementsByTagName('head')[0]
    const scriptElement = document.createElement(`script`)
    scriptElement.type = `text/javascript`
    scriptElement.async
    scriptElement.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`
    scriptElement.crossOrigin = "anonymous"
    head.appendChild(scriptElement);
}

export function GoogleAdsenseContainer ( { client, slot }) {

  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div style={{textAlign: 'left',overflow: 'hidden'}} >
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