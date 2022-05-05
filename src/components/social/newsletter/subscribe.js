import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Emojione } from "react-emoji-render"
import media from "styled-media-query"
import { Input } from "@/styles/templates/input"
import { Button } from "@/styles/templates/button"
import Link from "next/link"

const NewsletterWrapper = styled.label`
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  max-width: 1200px;
  padding: var(--space-sm) 0;
  margin: 0 auto;
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

const FeedLink = styled.span`
  border-bottom: 1px solid var(--primary-color);
`

export default function Subscribe({ noLabel, cb }) {
  const [email, setEmail] = useState("")
  const [count, setCount] = useState("")
  const [gotData, setGotData] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function getCount() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
    fetch("https://api.mxd.codes/subscribers/count", requestOptions)
      .then((response) => response.json())
      .then((data) => setCount(data))
    setGotData(true)
  }

  useEffect(() => {
    !gotData ? getCount() : null
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
            Do you like my content and want to know when new content is
            published? <br /> Then subscribe to the newsletter as well as{" "}
            {count} other subscribers or to any{" "}
            <FeedLink>
              <Link href="/feeds" title="Feeds">
                feed
              </Link>
            </FeedLink>{" "}
            you like.
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
