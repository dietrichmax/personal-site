import { useState, useEffect } from "react"
import Layout from "src/components/layout/layout"
import config from "../src/data/internal/SiteConfig"
import SEO from "src/components/seo/seo"
import media from "styled-media-query"
import styled from "styled-components"
import { useRouter } from "next/router"
import PageTitle from "src/components/title/page-title"
import SubTitle from "src/components/title/sub-title"
import Link from "next/link"
import { Button } from "@/styles/templates/button"
import {
  FaPaypal,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaXing,
} from "react-icons/fa"
import { SiStrava } from "react-icons/si"
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

const SupportText = styled.p`
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

const Heading = styled.p`
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
  const router = useRouter()
  const [count, setThanks] = useState(0)
  const [gotData, setGotData] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function getCount() {
    fetch("/api/cms?_thanks")
      .then((response) => response.json())
      .then((data) => setThanks(data.thanks))
    setGotData(true)
  }

  useEffect(() => {
    !gotData ? getCount() : null
  }, [])

  const sendThanks = () => {
    const requestOptions = {
      body: JSON.stringify({ thanks: count + 1 }),
    }
    fetch("/api/cms?_thanks", requestOptions)
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
    <>
      <Layout>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO
              title="Support this Site"
              slug="support"
              description=" If you've enjoyed my content and learnt something new please consider supporting what I do. There is no better way to say thanks!"
            />

            <PageTitle>Support this Site</PageTitle>

            <SubTitle>My site has no ads or sponsors!</SubTitle>

            <Container>
              <SupportContainer>
                If you've enjoyed my content and learnt something new please
                consider supporting what I do. <br />
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
                If you'd still like to say thanks you can message me on my
                socials.
                <List>
                  <Socialtem>
                    <a
                      href={config.socials.twitter}
                      title="@mxdietrich on Twitter"
                    >
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
                    <a
                      href={config.socials.github}
                      title="mxdietrich on GitHub"
                    >
                      <FaGithub />
                    </a>
                  </Socialtem>
                  <Socialtem>
                    <a
                      href={config.socials.strava}
                      title="Max Dietrich on Strava"
                    >
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
          </>
        )}
      </Layout>
    </>
  )
}
