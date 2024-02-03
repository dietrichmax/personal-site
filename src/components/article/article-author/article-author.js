import { useState, useEffect } from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import config from "@/src/data/internal/SiteConfig"
import { FaGithub } from "@react-icons/all-files/fa/FaGithub"
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaXing } from "@react-icons/all-files/fa/FaXing"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaGift } from "@react-icons/all-files/fa/FaGift"
import { Button } from "@/styles/templates/button"
import media from "styled-media-query"

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
const AuthorTitle = styled.p`
  margin-top: var(--space);
  font-size: 1.5rem;
  font-weight: 600;
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
  ${media.lessThan("medium")`  
    margin-top: var(--space-sm);
  `}
`

const AuthorLink = styled(Link)`
  padding-top: 1rem;
  text-decoration: none;
  box-shadow: 0px -3px 0px 0px var(--secondary-color) inset;
  transition: box-shadow 150ms ease-in-out;
  color: var(--text-color);
  cursor: pointer;
`


export default function Author(author) {
  const [count, setThanks] = useState(0)
  const [gotData, setGotData] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function getCount() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
    fetch("https://cms.mxd.codes/thanks", requestOptions)
      .then((response) => response.json())
      .then((data) => setThanks(data.thanks))
    setGotData(true)
  }

  useEffect(() => {
    !gotData ? getCount() : null
  }, [])

  const sendThanks = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ thanks: count + 1 }),
    }
    fetch("https://cms.mxd.codes/thanks", requestOptions)
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
              src="/images/IMG_20231229_WA_0005_1925a8f37e50x50.webp"
              alt={username}
              title={username}
              width={50}
              height={50}
            />
          </AuthorImgWrapper>
        ) : null}
        <AuthorMeta>
          <AuthorName title="About me">{username} </AuthorName>
          <AuthorSubtitle>{config.siteSubtitle}</AuthorSubtitle>
        </AuthorMeta>
      </AuthorWrapper>
      <AuthorDescription>
        <AuthorBio>{bio}{" "}<AuthorLink href="/support">Support me</AuthorLink></AuthorBio>
        
        <AuthorSocials>
          <AuthorSocialsContainer>
            <SupportButtonContainer>
              <Button onClick={() => sendThanks()}>
                {submitted ? "🎉Thank you!🎉" : "Send Virtual Thanks"}
              </Button>
              <ButtonText>{count} Virtual Thanks Sent.</ButtonText>
            </SupportButtonContainer>
          </AuthorSocialsContainer>
        </AuthorSocials>
      </AuthorDescription>
    </>
  )
}
