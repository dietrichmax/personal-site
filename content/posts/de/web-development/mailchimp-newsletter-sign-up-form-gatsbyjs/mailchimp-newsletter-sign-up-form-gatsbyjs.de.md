---
layout: "post"
title: "So erstellst Du ein Mailchimp-Newsletter-Anmeldeformular für deine GatsbyJS-Site"
date: "2020-07-21"
description: "Der Aufbau deines eigenen Newsletters ist entscheidend für ein nachhaltiges Online-Business. Mit E-Mails kannst Du eine Beziehung zu Deinem Publikum aufbauen und Traffic gezielt auf bestimmten Content lenken."
category: "Web-Development"
tags: ["Gatsby", "Mailchimp", "React","Newsletter"]
image: "./mailchimp_signup_gatsbyjs.jpg"
caption: "by USGS on Unsplash"
author: "Max Dietrich"
---

Der Aufbau deines eigenen Newsletters ist entscheidend für ein nachhaltiges Online-Business. Mit E-Mails kannst Du eine Beziehung zu deinem Publikum aufbauen und Traffic gezielt auf bestimmten Content lenken.

Falls du Mailchimp nutzt, kannst Du das Plugin [gatsby-plugin-mailchimp](https://github.com/benjaminhoffman/gatsby-plugin-mailchimp "gatsby-plugin-mailchimp") nutzen um deine E-Mail-Liste auszubauen

## Erste Schritte

Füge einfach das Plugin zu deiner package.json mit
```
npm
npm install gatsby-plugin-mailchimp
```
oder
```
yarn
yarn add gatsby-plugin-mailchimp
```
hinzu und konfiguriere das Plugin in **gatsby.config.js** mit

```js
{
        resolve: 'gatsby-plugin-mailchimp',
        options: {
            endpoint: '', // string; add your MC list endpoint here; see instructions below
            timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
        },
    },
```
Wenn du noch kein Mailchimp Endpoint hast, findest du auf der Plugin Seite auf Github eine ausführliche Anleitung mit Bildern, die jeden Schritt beschreibt um die Endpoint Url zu generieren.

> Sobald Du deinen Mailchimp-Endpoint hast, solltest Du ihn als Umgebungsvariable in deinem Projekt speichern. 🔒

## Erstelle ein sign-up Formular

Du musst lediglich die Methode **addToMailChimp** in dein Newsletter-Component importieren.
```js
import addToMailchimp from 'gatsby-plugin-mailchimp'
```
(Ich arbeite eigentlich mit styled-components, die in einer separaten Datei im selben Ordner gespeichert sind. Diese Datei wird mit
```
import * as S from './styled'
```
importiert und die Components werden dann mit zum Beispiel **S.NewsletterWrapper** verwendet. Aber um es ein bisschen klarer zu machen, habe ich für diesen Beitrag alles in derselben Datei deklariert.)

Jetzt benötigst du einige (responsive) styled-components, die dein eigentlich Sign-up-Formular erstellen.

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

In diesem Component wirst du auch eine unterschiedliche Message dem User zeigen, je nachdem ob der User den Newsletter erfolgreich abonniert hat oder nicht.
Dafür benötigst Du eine Variable die den aktuellen Zustand speichert (submitted = true oder submitted = false).
Die Variable wird den Standardwert **false** haben, welche auf **true** geändert wird,sobald der User erfolgreich den Newsletter abonniert hat.

Wenn also ein User auf den "Subscribe-Button" klickt, wird die Funktion **handleSubmit** ausgeführt:

+ Eingabedaten werden mit **addToMailchimp(email)** an den Mailchimp-Endpoint gesendet,
+ wenn die von der Mailchim-API zurückgegebene property den Wert "error" hat, behandelt Deine Fehlerbehandlungsfunktion das Ereignis,
+ andernfalls wird das Abonnement mit einem Google Analytics Event getracket und Submitted auf true gesetzt.

> Die Mailchimp-API gibt immer ein Objekt mit den Eigenschaften **result** and **msg**. zurück 💡

```js
{
    result: string; // either `success` or `error` (helpful to use this key to update your state)
    msg: string; // a user-friendly message indicating details of your submissions (usually something like "thanks for subscribing!" or "this email has already been added")
}
```
Letztendlich musst Du nurnoch den Wert von **submitted** überprüfen und den relevanten Inhalt wie folgt rendern:

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

Wenn du mehr über Sign-up Formulare erfahren möchtest empfehle ich dir [Non-Invasive Sign Up Forms](https://sld.codes/articles/Non-Invasive-Sign-Up-Forms "Non-Invasive Sign Up Forms") von Slarsen Disney.

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