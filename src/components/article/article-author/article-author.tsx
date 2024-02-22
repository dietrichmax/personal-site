import { useState, useEffect } from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import { config } from "@/src/data/internal/SiteConfig"
import { fetchGET } from "@/src/utils/fetcher"
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
  ${media.lessThan("small")`  
    display: block;
    margin-top: var(--space-sm);
    margin-left: 0;
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

interface Author {
  post: {
    username?: string
    picture?: typeof Image
    bio?: string
  }
}

export default function Author({ post }: Author) {
  const [count, setThanks] = useState<number>(0)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const { username, bio } = post
  const picture = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/uploads/thumbnail_cover_IMG_20231229_WA_0005_1925a8f37e_4685ff9911.jpg`

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

  if (post === undefined || !post) {
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
        <AuthorBio>
          {bio} <AuthorLink href="/support">Support me</AuthorLink>
        </AuthorBio>

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
