import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Emojione } from "react-emoji-render"
import media from "styled-media-query"
import { Input } from "@/styles/templates/input"
import { Button } from "@/styles/templates/button"

const NewsletterWrapper = styled.label`
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  max-width: 1200px;
  padding: var(--space);
  margin: 0 auto var(--space-lg) auto;
  ${media.lessThan("medium")`
      padding: var(--space-sm);
    `}
`
const DescriptionWrapper = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  line-height: 28px;
  font-size: 1rem;
`

const InputWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 50%;
  max-width: 66.66667%;
`

const ButtonWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 50%;
  max-width: 33.33333%;
`

const Emoji = styled(Emojione)`
  display: inline-block;
`

export default function Subscribe({ noLabel, cb }) {
  const [email, setEmail] = useState("")
  const [count, setCount] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
    fetch("https://api.mxd.codes/subscribers/count", requestOptions)
      .then((response) => response.json())
      .then((data) => setCount(data))

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [])

  const handleSubmit = () => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    }
    fetch("https://api.mxd.codes/subscribers", requestOptions)
      .then(function (response) {
        if (!response.ok) {
          console.log(response.statusText)
        } else {
          setSubmitted(true)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      {submitted ? (
        <NewsletterWrapper>
          <DescriptionWrapper>
            <h2>
              <Emoji text={"🎉"} />
              Awsome, your are signed up!
              <Emoji text={"🎉"} />
            </h2>
            <p>Thank you for your interest in my content.</p>
          </DescriptionWrapper>
        </NewsletterWrapper>
      ) : (
        <NewsletterWrapper>
          <DescriptionWrapper>
            Would you like to know when there is something new? <br /> Then
            subscribe to the newsletter, as well as {count} other subscribers.
            <Emoji text={"🚀"} />
          </DescriptionWrapper>

          <InputWrapper>
            <Input
              type="email"
              name="email"
              id="mail"
              label="email-input"
              placeholder="Your E-Mail adress"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button
              type="button"
              aria-label="Subscribe to Mailinglist"
              onClick={() => handleSubmit()}
              style={{ width: "100%" }}
            >
              Subscribe
            </Button>
          </ButtonWrapper>
        </NewsletterWrapper>
      )}
    </>
  )
}
