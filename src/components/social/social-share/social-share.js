import styled from "styled-components"
import config from "src/data/internal/SiteConfig"
import media from "styled-media-query"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { FaLink, FaTwitter, FaLinkedin, FaReply, FaHeart } from "react-icons/fa"
import { createNoSubstitutionTemplateLiteral } from "typescript"

const WebActions = styled.ol`
  padding-inline-start: 0;
  ${media.lessThan("large")`
    margin-top: var(--space);
    display: inline-block;
    padding-inline-start: 0;
    list-style: none;
  `}
`

const Actions = styled.li`
  display: inline-block;
  margin-right: var(--space-sm);
  margin-bottom: var(--space-sm);
  cursor: pointer;
  font-size: 20px;
  :hover {
    color: var(--secondary-color);
  }
`

const ActionsLike = styled.button`
  background: var(--body-bg);
  cursor: pointer;
  padding: 0;
  border: none;
  font-size: 20px;
  :hover {
    color: var(--secondary-color);
  }
`

const Separator = styled.hr`
  margin: 0 auto var(--space-sm) auto;
`

const LikeCount = styled.span`
  font-size: 0.95rem;
`

export default function SocialShare({ slug, syndicationLinks, id }) {
  const [copied, setCopied] = useState("")
  const [postLike, setPostLike] = useState()
  const [postLikeCount, setPostLikeCount] = useState()
  const [sentPostLike, setSentPostLike] = useState(false)
  const [gotPostLike, setGotPostLike] = useState(false)
  const [likeIncremented, setLikeIncremented] = useState(false)

  let tweetID

  async function getPostLike() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
    fetch(`https://api.mxd.codes/likes?postId=${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) =>
        data === undefined ? null || null : setPostLike(data[0])
      )
      .catch(function (error) {
        console.log(error)
      })
    setGotPostLike(true)
  }

  useEffect(() => {
    //!gotPostLike ? getPostLike() : null
  }, [])

  const sendLike = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        count: postLike ? postLike.count++ : 0,
        postId: id,
      }),
    }
    fetch(`https://api.mxd.codes/likes`, requestOptions)
      .then(function (response) {
        if (!response.ok) {
          console.log(response.statusText)
        } else {
          setSentPostLike(true)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const url = `${config.siteUrl}${slug}`

  function copyToClipboard(e) {
    navigator.clipboard.writeText(`${config.siteUrl}${slug}`)
    setCopied(true)
    setTimeout(function delay() {
      setCopied("Copied permalink")
    }, 2000)
  }

  syndicationLinks
    ? syndicationLinks.map((entry) => {
        entry.name === "twitter"
          ? (tweetID = entry.slug.replace(
              "https://twitter.com/mxdietrich/status/",
              ""
            ))
          : null
      })
    : null

  return (
    <WebActions className="indie-actions">
      {/*<Actions do="like" with={url} >
        <ActionsLike>
          <a
              className="action like"
              title="Like this post"
              onClick={() => sendLike()}
            >
              <FaHeart /> <LikeCount>{postLike? postLike.count : "-" }</LikeCount>
            </a>
        </ActionsLike>
  </Actions>*/}
      {/*<Separator />*/}
      <Actions do="share" with={url}>
        <a
          className="action share"
          title="Share this post on Twitter"
          target="_blank"
          href={`https://twitter.com/intent/tweet?url=${url}`}
          rel="nofollow noopener"
        >
          <FaTwitter />
        </a>
      </Actions>
      {tweetID ? (
        <Actions do="reply" with={url}>
          <a
            className="action reply"
            title="Reply to this post"
            target="_blank"
            href={`https://twitter.com/intent/tweet?in_reply_to=${tweetID}`}
            rel="nofollow noopener"
          >
            <FaReply />
          </a>
        </Actions>
      ) : null}
      <Actions do="share" with={url}>
        <a
          className="action share"
          title="Share this post on Linkedin"
          target="_blank"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
          rel="nofollow noopener"
        >
          <FaLinkedin />
        </a>
      </Actions>
      <Actions
        className="action copy"
        title="Copy this post's permalink"
        onClick={() => copyToClipboard()}
      >
        <FaLink />
      </Actions>
    </WebActions>
  )
}
