import { useState, useEffect } from "react"
import Layout from "@/src/components/layout/layout"
import { config } from "@/src/data/internal/SiteConfig"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import styled from "styled-components"
import PageTitle from "@/src/components/title/page-title"
import SubTitle from "@/src/components/title/sub-title"
import Link from "next/link"
import { Button } from "@/styles/templates/button"
import { FaPaypal } from "@react-icons/all-files/fa/FaPaypal"
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaGithub } from "@react-icons/all-files/fa/FaGithub"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaXing } from "@react-icons/all-files/fa/FaXing"
import { SiStrava } from "@react-icons/all-files/si/SiStrava"
import { fetchGET } from "@/src/utils/fetcher"

const Container = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto;
  padding-left: var(--space);
  padding-right: var(--space);
  ${media.lessThan("medium")`
    margin: var(--space-sm);
    padding: 0;
  `}
`

const SupportText = styled.div`
  max-width: 900px;
`

const ButtonText = styled.span`
  margin-left: var(--space-sm);
`
const SupportContainer = styled.div`
  margin-bottom: var(--space);
`

const SupportButtonContainer = styled.div`
  margin-bottom: var(--space);
  margin-top: var(--space);
`

const Heading = styled.div`
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-color);
  margin-bottom: var(--space-sm);
`

const List = styled.ol`
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  margin-bottom: var(--space);
`

const Socialtem = styled.li`
  margin: var(--space-sm) var(--space-sm) var(--space-sm) 0;
  transition: 0.2s;
  :hover {
    color: var(--secondary-color);
    cursor: pointer;
  }
`

export default function Support({}) {
  const [count, setThanks] = useState<number>(0)
  const [submitted, setSubmitted] = useState<boolean>(false)

  async function getThanks() {
    const res = await fetch("/api/stats")
    const json = await res.json()
    setThanks(json.cms.thanks)
  }

  useEffect(() => {
    getThanks()
  }, [])

  const sendThanks = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { thanks: count + 1 } }),
    }
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/thank`, requestOptions)
      .then(function (response) {
        if (!response.ok) {
          console.log(response.statusText)
        } else {
          setSubmitted(true)
          setThanks(count + 1)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Layout>
      <SEO
        title="Support this Site"
        slug="support"
        description=" If you've enjoyed my content and learnt something new please consider supporting what I do. There is no better way to say thanks!"
      />

      <PageTitle>Support this Site</PageTitle>

      <SubTitle>My site has no ads or sponsors!</SubTitle>

      <Container>
        <SupportContainer>
          If you've enjoyed my content and learnt something new please consider
          supporting what I do. <br />
          There is no better way to say thanks!
        </SupportContainer>

        <SupportButtonContainer>
          <Link href="/pay">
            <Button>
              <FaPaypal /> Paypal
            </Button>
          </Link>
        </SupportButtonContainer>

        <Heading>Not able to support right now?</Heading>
        <SupportText>
          That's cool and I totally get it. <br />
          If you'd still like to say thanks you can message me on my socials.
          <List>
            <Socialtem>
              <a href={config.socials.twitter} title="@mxdietrich on Twitter">
                <FaTwitter />
              </a>
            </Socialtem>
            <Socialtem>
              <a
                href={config.socials.instagram}
                title="_maxdietrich on Instagram"
              >
                <FaInstagram />
              </a>
            </Socialtem>
            <Socialtem>
              <a href={config.socials.github} title="mxdietrich on GitHub">
                <FaGithub />
              </a>
            </Socialtem>
            <Socialtem>
              <a href={config.socials.strava} title="Max Dietrich on Strava">
                <SiStrava />
              </a>
            </Socialtem>
            <Socialtem>
              <a href={config.socials.xing} title="Max Dietrich on Xing">
                <FaXing />
              </a>
            </Socialtem>
            <Socialtem>
              <a
                href={config.socials.linkedin}
                title="Max Dietrich on Linkedin"
              >
                <FaLinkedin />
              </a>
            </Socialtem>
          </List>
        </SupportText>
        <SupportText>
          <p>You can also hit the button below to send me some love!</p>

          <SupportButtonContainer>
            <Button onClick={() => sendThanks()}>
              {submitted ? "🎉Thank you!🎉" : "Send Virtual Thanks"}
            </Button>
            <ButtonText>{count} Virtual Thanks Sent.</ButtonText>
          </SupportButtonContainer>
        </SupportText>
      </Container>
    </Layout>
  )
}
