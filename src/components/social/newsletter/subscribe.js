import { useState, useEffect } from "react"
import styled from "styled-components"
import { Input } from "@/styles/templates/input"
import { Button } from "@/styles/templates/button"
import Link from "next/link"

const NewsletterBox = styled.div`
  border-top: 0.1rem solid var(--content-bg);
  padding-top: var(--space-sm);
`

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
  margin-top: var(--space-sm);
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

const FeedLink = styled.span`
  text-decoration: none;
  box-shadow: 0px -3px 0px 0px var(--secondary-color) inset;
  transition: box-shadow 150ms ease-in-out;
  color: var(--text-color);
  cursor: pointer;
  &:hover {
    box-shadow: 0px -18px 0px 0px var(--secondary-color) inset;
  }
`

const NewsletterTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`

export default function Subscribe({ noLabel, cb }) {
  const [email, setEmail] = useState("")
  const [count, setCount] = useState("")
  const [submitted, setSubmitted] = useState(false)

  async function getCount() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
    fetch("https://cms.mxd.codes/subscribers/count", requestOptions)
      .then((response) => response.json())
      .then((data) => setCount(data))
  }

  useEffect(() => {
    getCount()
  }, [])

  const handleSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }

    fetch("https://cms.mxd.codes/subscribers", requestOptions)
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
    <NewsletterBox>
      {submitted ? (
        <NewsletterWrapper>
          <DescriptionWrapper>
            <h2>🎉 Awsome, your are signed up! 🎉</h2>
            <p>Thank you for your interest in my content!</p>
          </DescriptionWrapper>
        </NewsletterWrapper>
      ) : (
        <NewsletterWrapper>
          <NewsletterTitle>Newsletter</NewsletterTitle>
          <DescriptionWrapper>
            Do you like my content and want to know when new content is
            published? <br /> Then subscribe to the newsletter as well as{" "}
            {count} other subscribers or to any{" "}
            <FeedLink>
              <Link href="/feeds" title="Feeds">
                feed
              </Link>
            </FeedLink>{" "}
            you like. 🚀
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
    </NewsletterBox>
  )
}
