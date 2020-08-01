---
layout: "Article"
title: "Integrate Google Ad Manager with Adsense in your Gatsby site"
date: "2020-08-02"
description: ""
category: "Web-Development"
tags: ["GatsbyJS", "Ad Manager", "Adsense"]
image: "../../../../../static/assets/img/postImg/gatsby-google-ad-manager-adsense.jpg"
caption: "by USGS on Unsplash"
published: "yes"
author: "Max Dietrich"
---

With [React GPT](https://github.com/nfl/react-gpt "React GPT") you can easily implement Ad Manager and Adsense via Ad Manager on your Gatsby site.
React GPT is a React component for [Google Publisher Tags](https://developers.google.com/doubleclick-gpt/guides/get-started "Google Publisher Tags").
  
  ```
import React from "react"
import {Bling as GPT} from "react-gpt";
import styled from 'styled-components'
import useTranslations from '../../useTranslations';
import media from 'styled-media-query';

export const Subline = styled.p`
    text-decoration: none;
    font-size: 1rem;
    text-align: right;
    margin: 0 !important;
`
export const Ad1 = styled.div`
    margin: 2rem auto 2rem auto;
    max-width: 728px;
    ${media.lessThan('large')`
      padding: 0 1rem 0 1rem;
    `}
`

const A1 = ({ }) => {

      // translation for ad label
      const { ad, adNotice } = useTranslations();

        return (
          
            <Ad1 >
              <GPT
                  adUnitPath="/21800091745/a1_"
                  //collapseEmptyDiv
                  style={{margin:'auto !important'}}
                  sizeMapping={[
                    {viewport: [0, 0], slot: [336, 280]},
                    {viewport: [490, 0], slot: [480, 320]},
                    {viewport: [650, 0], slot: [640, 90]},
                    {viewport: [750, 0], slot: [728, 90]},
                    {viewport: [980, 0], slot: [728, 300]},
                    {viewport: [1050, 0], slot: [728, 200]},
                    {viewport: [1800, 0], slot: [728, 90]}
                  ]}
                  
              />
              <Subline title={adNotice}>{ad}</Subline>
            </Ad1>
        );
    }


export default A1
```