---
layout: "Article"
title: "Integrate Google Ad Manager with Adsense in your Gatsby site"
date: "2020-08-02"
description: "With React GPT you can easily implement Ad Manager and Adsense via Ad Manager on your Gatsby site. React GPT is a React component for Google Publisher Tags."
category: "Web-Development"
tags: ["GatsbyJS", "Ad Manager", "Adsense"]
image: "../../../../../static/assets/img/postImg/gatsby-google-ad-manager-adsense.jpg"
caption: "ESA/DLR/FU Berlin; CC BY-SA 3.0 IGO"
published: "yes"
author: "Max Dietrich"
---

With [React GPT](https://github.com/nfl/react-gpt "React GPT") you can easily implement Ad Manager and Adsense via Ad Manager on your Gatsby site.
React GPT is a React component for [Google Publisher Tags](https://developers.google.com/doubleclick-gpt/guides/get-started "Google Publisher Tags").

It supports
+ all rendering modes (single request mode, async rendering node and *sync rendering mode),
+ responsive ads,
+ interstitial ads and
+ lazy render.

You can install it with
```
yarn react-gpt
```
and import it into your ad-components like
```
import {Bling as GPT} from "react-gpt";

class Application extends React.Component {
    render() {
        return (
            <GPT
                adUnitPath="/4595/nfl.test.open"
                slotSize={[728, 90]}
            />
        );
    }
} 
```

To be able to deliver an ad you will need an active ad slot in [Google Ad Manager](https://admanager.google.com/ "Google Ad Manager").
We are gonna create now a component which will render that ad slot and add a small ad label to it. It's gonna be styled with [Styled Components](https://styled-components.com/ "Styled Components").

```js
import React from "react"
import {Bling as GPT} from "react-gpt";
import styled from 'styled-components'
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
              <Subline title="Ad">Ad</Subline>
            </Ad1>
        );
    }


export default A1
```
Most important part is ```adUnitPath="iu=[123]".
You will get your ```adUnitPath``` through the Ad Manager console.
When you are creating new Tags for an ad slot it will show you an individual tag based on the settings you chose.

Somewhere in the tag you can find ```iu=``` and everything after that until ```&```will be your adUnitPath.

With ```sizeMapping={[...]}``` you can display different sizes depending on the screen size of the viewer (I played here a bit with the sizes).

After you created your component you can import it like any other component.

For a simple consent solution i implement a conditional rendering so that the ad is only shown after a user accepted cookies.

```js

import A1 from "../components/Ads/GoogleAdManager/A1.js"
import Cookies from 'js-cookie'

// get value of Cookie "consent"
  const consentGiven = Cookies.get('consent')

  {consentGiven ? <A1/> : null }
```

If you have enabled in your Ad Manager settings to fill up your ad slots with Adsense ads you can also display this way "normal" Adsense ads.