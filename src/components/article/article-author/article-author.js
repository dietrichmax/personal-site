import { useState, useEffect } from "react"
import { fetchGET, fetchPUT } from "@/src/utils/fetcher"
import styled from "styled-components"
import Image from "next/legacy/image"
import Link from "next/link"
import config from "src/data/internal/SiteConfig"
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaXing,
  FaGift,
} from "react-icons/fa"
import { Button } from "@/styles/templates/button"

const AuthorWrapper = styled.div`
  display: flex;
  margin-top: var(--space);
`

const AuthorMeta = styled.div`
  margin-left: var(--space-sm);
  width: 100%;
`

const AuthorName = styled.span`
  font-weight: bold;
  cursor: pointer;
`

const AuthorImgWrapper = styled.div`
  overflow: hidden;
  height: 50px;
  width: 50px;
`

const AuthorSocials = styled.div`
  margin-top: var(--space-sm);
`

const AuthorSocialIcons = styled.i`
  cursor: pointer;
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  margin: var(--space-sm);
  color: var(--thirdy-color);
`

const AuthorTitle = styled.p`
  margin-top: var(--space);
  font-size: 1.5rem;
  font-weight: 600;  
  border-top: 0.1rem solid var(--content-bg);
  padding-top: var(--space);
}
`

const AuthorSubtitle = styled.p``

const AuthorBio = styled.p`
  margin-top: var(--space-sm);
`

const AuthorSocialsContainer = styled.div``

const AuthorDescription = styled.div``

const SupportButtonContainer = styled.div`
  margin-bottom: var(--space);
  margin-top: var(--space);
`

const ButtonText = styled.span`
  margin: auto var(--space-sm);
`

const AuthorLink = styled(Link)`
  border-bottom: 1px dotted #bdc3c7;
  color: var(--primary-color);
  cursor: pointer;
`

export default function Author(author) {
  const [count, setThanks] = useState(0)
  const [gotData, setGotData] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function getCount() {
    fetchGET("/api/cms?_thanks").then(
      (data) => setThanks(data.thanks) && setGotData(true)
    )
  }

  useEffect(() => {
    !gotData ? getCount() : null
  }, [])

  const sendThanks = () => {
    const requestOptions = {
      body: JSON.stringify({ thanks: count + 1 }),
    }
    fetchPUT("/api/cms?_thanks", requestOptions)
      .then(function (response) {
        if (!response.ok) {
          console.log(response.statusText)
        } else {
          console.log(response)
          setSubmitted(true)
          setThanks(count + 1)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const { username, picture, bio, socials } = author.post

  const renderSocials = (socials) => {
    if (socials.plattform === "Instagram") {
      return <FaInstagram />
    } else if (socials.plattform === "Twitter") {
      return <FaTwitter />
    } else if (socials.plattform === "Linkedin") {
      return <FaLinkedin />
    } else if (socials.plattform === "Xing") {
      return <FaXing />
    } else if (socials.plattform === "GitHub") {
      return <FaGithub />
    }
  }

  if (author === undefined) {
    return null
  }
  return (
    <>
      <AuthorTitle>About The Author</AuthorTitle>
      <AuthorWrapper>
        {picture ? (
          <AuthorImgWrapper>
            <Image
              src={`${
                picture.url.startsWith("/")
                  ? process.env.NEXT_PUBLIC_STRAPI_API_URL
                  : ""
              }${picture.url}`}
              alt={username}
              title={username}
              width="50"
              height="50"
            />
          </AuthorImgWrapper>
        ) : null}
        <AuthorMeta>
          <AuthorName title="About me">{username} </AuthorName>
          <AuthorSubtitle>{config.siteSubtitle}</AuthorSubtitle>
        </AuthorMeta>
      </AuthorWrapper>
      <AuthorDescription>
        <AuthorBio>{bio}</AuthorBio>
        <AuthorSocials>
          <AuthorSocialsContainer>
            <SupportButtonContainer>
              <Button onClick={() => sendThanks()}>
                {submitted ? "🎉Thank you!🎉" : "Send Virtual Thanks"}
              </Button>
              <ButtonText>{count} Virtual Thanks Sent.</ButtonText>
            </SupportButtonContainer>
            {/*<AuthorLink href="/support">
              <FaGift /> More Support
            </AuthorLink>*/}
          </AuthorSocialsContainer>
          {/*(socials.map((social) => 
          <AuthorSocialsContainer>
            <a href={social.link} rel="nofollow noopener" title={social.plattform}>
              {renderSocials(social)}
            </a>
          </AuthorSocialsContainer>
      )*/}
        </AuthorSocials>
      </AuthorDescription>
    </>
  )
}
