---
layout: "post"
title: "How to create a Mailchimp newsletter sign-up-form for your GatsbyJS Site"
date: "2020-07-21"
description: "Managing your own newsletter is crucial for creating a sustainable online-business. With E-Mails you can build a relationsship with your audience and engage with them so they will drive some nice traffic to your new post or whatever you just have published and want to promote."
category: "Web-Development"
tags: ["Gatsby", "Mailchimp", "React","Newsletter"]
image: "../../../../../static/assets/img/postImg/mailchimp_signup_gatsbyjs.jpg"
caption: "by USGS on Unsplash"
author: "Max Dietrich"
---

Managing your own newsletter is crucial for creating a sustainable online-business. With E-Mails you can build a relationsship with your audience and engage with them so they will drive some nice traffic to your new post or whatever you just have published and want to promote.

If you are using Mailchimp you can use the plugin [gatsby-plugin-mailchimp](https://github.com/benjaminhoffman/gatsby-plugin-mailchimp "gatsby-plugin-mailchimp") to manage your e-mail list.

## Getting started

Simply add the plugin to your package.json with
```
npm
npm install gatsby-plugin-mailchimp
```
or
```
yarn
yarn add gatsby-plugin-mailchimp
```

and implement it in your **gatsby.config.js** like
```js
{
        resolve: 'gatsby-plugin-mailchimp',
        options: {
            endpoint: '', // string; add your MC list endpoint here; see instructions below
            timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
        },
    },
```
If you don't have your Mailchimp endpoint yet i would suggest to have a README of gatsby-plugin-mailchimp. They described every step with images so it's really easy to get your endpoint url.

> Once you have your Mailchimp endpoint you should save it as environment variable in your project. 🔒

## Creating a sign-up form

Only thing you will need is to import the **addToMailChimp** method to your newsletter sign-up component which will work like this:
```js
import addToMailchimp from 'gatsby-plugin-mailchimp'
```
(I am actually working with styled components which are stored in a separate file in the same folder. This file is imported with
```
import * as S from './styled'
```
and the components then are used like **S.NewsletterWrapper**. But to make it a bit more clear i declared everything in the same file for this post.)

So now you need some styled (and responsive) components which will create your actual form like:
```js
<NewsletterWrapper>
  <DescriptionWrapper>
    <p>
      Do you want to know when I post something new? <br/> 
      Then subscribe to my newsletter.
      🚀
    </p>
  </DescriptionWrapper>
  <InputWrapper>
    <Input
      type="email"
      name="email"
      id="mail"
      label="email-input"
      placeholder="Your e-mail address"
      onChange={(e) => setEmail(e.target.value)}
    />
  </InputWrapper>
  <ButtonWrapper>
    <Button
      type="button"
      aria-label="Subscribe"
      onClick={() => handleSubmit()}
    >
    Subscribe
    </Button>
  </ButtonWrapper>
</NewsletterWrapper>
```

In this component you will show a different message from the default one after a user has successfully subscribed to your newsletter.
To do so you need a variable which will store the current state (submitted = true or submitted = false). 
This variable will have the default value **false**, which will be set to **true** after a user has subscribed successfully.

So if a user clicks on the "Subscribe-Button" the function **handleSubmit** will be executed which does the following:

+ input data will be send to the Mailchimp endpoint with ```addToMailchimp(email)``,
+ if the returned property from the Mailchim API has the value "error" your error handling function will handle the event,
+ otherwise the subscribe is being tracking with a custom Google Analytics event and submitted will be set to true.

> The Mailchimp API will always return a object with the properties **result** and **msg**. 💡

```js
{
    result: string; // either `success` or `error` (helpful to use this key to update your state)
    msg: string; // a user-friendly message indicating details of your submissions (usually something like "thanks for subscribing!" or "this email has already been added")
}
```

Finally you just have to check the value of **submitted** and render the relevant content like the following:

```js
  return (
    <>
      {submitted ? (
        <NewsletterWrapper>
          <DescriptionWrapper>
            <h2>
              🎉 Successfully subscribed! 🎉
            </h2>
            <p>
            Thank your for your interest in my content.
            </p>
          </DescriptionWrapper>
        </NewsletterWrapper>
      ) : (
        <NewsletterWrapper>
            <DescriptionWrapper>
              <p>
                Do you want to know when I post something new? <br/> 
                Then subscribe to my newsletter.
                🚀
              </p>
            </DescriptionWrapper>
          <InputWrapper>
            <Input
              type="email"
              name="email"
              id="mail"
              label="email-input"
              placeholder="Your e-mail address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button
              type="button"
              aria-label="Subscribe"
              onClick={() => handleSubmit()}
            >
              "Subscribe"
            </Button>
          </ButtonWrapper>
        </NewsletterWrapper>
      )}
    </>
  )
}
```
If you want to learn more about sign-up forms i suggest to have a look at [Non-Invasive Sign Up Forms](https://sld.codes/articles/Non-Invasive-Sign-Up-Forms "Non-Invasive Sign Up Forms") from Slarsen Disney. He is creating super UX-friendly websites and is sharing the code for it.

```js
import addToMailchimp from "gatsby-plugin-mailchimp"
import React, { useState } from "react"
import ConfettiAnimation from "../Animations/ConfettiAnimation"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import styled from 'styled-components';

export const NewsletterWrapper = styled.form`
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
    max-width: 750px;
    justify-content: center;
`
export const DescriptionWrapper = styled.div`
    text-align: center;
    flex-grow: 0;    
    flex-shrink: 0;
    flex-basis: 100%;    
    max-width: 100%;
`

export const InputWrapper = styled.div`
    flex-direction: column;
    justify-content: center;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    max-width: 66.66667%;
`

export const Input = styled.input`
    padding-top: 15px!important;
    padding-bottom: 15px!important;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid hsla(0,0%,90.2%,.95);
    :invalid {
        border: 1px solid red;
    }
`

export const ButtonWrapper = styled.div`
    flex-direction: column;
    justify-content: center;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    max-width: 33.33333%;
`

export const Button = styled.button`
    box-sizing: border-box;
    border: 2px solid ${props =>
        props.background ? props.background : 'white'};
    color: white;
    text-transform: uppercase;
    position: relative;
    padding-top: 15px!important;
    padding-bottom: 15px!important;
    outline: none;
    overflow: hidden;
    width: 100%;
    transition: all .2s ease-in-out;
    text-align: center;
    background: ${props =>
        props.background ? props.background : 'hsla(0,0%,90.2%,.95)'};
    :hover {
        box-shadow: rgba(0, 0, 0, 0.5) 0px 8px 16px 0px;
        transform: translateY(0) scale(1);
`

export default ({ }) => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)   


  function errorHandling(data) {
    // your error handling
  }
  
  const handleSubmit = () => {
    addToMailchimp(email).then((data) => {

      if (data.result == "error") {
        errorHandling(data)
      } else {
        trackCustomEvent({
          category: "Newsletter",
          action: "Click",
          label: `Newsletter Click`,
        })
        setSubmitted(true)
      }
    })
  }

  return (
    <>
      {submitted ? (
        <NewsletterWrapper>
          <DescriptionWrapper>
            <h2>
              🎉 Successfully subscribed! 🎉
            </h2>
            <p>
            Thank your for your interest in my content.
            </p>
          </DescriptionWrapper>
        </NewsletterWrapper>
      ) : (
        <NewsletterWrapper>
            <DescriptionWrapper>
              <p>
                Do you want to know when I post something new? <br/> 
                Then subscribe to my newsletter.
                🚀
              </p>
            </DescriptionWrapper>
          <InputWrapper>
            <Input
              type="email"
              name="email"
              id="mail"
              label="email-input"
              placeholder="Your e-mail address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button
              type="button"
              aria-label="Subscribe"
              onClick={() => handleSubmit()}
            >
              "Subscribe"
            </Button>
          </ButtonWrapper>
        </NewsletterWrapper>
      )}
    </>
  )
}
```