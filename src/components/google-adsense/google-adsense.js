import styled from 'styled-components';
import { useEffect, useState } from 'react';

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

  const AdLabel = styled.span`
    font-size: 12px;
    font-style: italic;
  `

  return (
    <div 
      style={{textAlign: 'left',overflow: 'hidden'}}
    >
    <AdLabel>Advertisment</AdLabel>
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