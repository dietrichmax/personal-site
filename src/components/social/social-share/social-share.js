import styled from "styled-components"
import config from "src/data/internal/SiteConfig"
import media from "styled-media-query"
import Link from "next/link"
import React, { useState } from "react"
import { FaRegCopy, FaRetweet, FaRegComment } from "react-icons/fa"
import { BsStar } from "react-icons/bs"

const WebActions = styled.ol`
  padding-inline-start: 0;
  list-style: none;
  margin-top: var(--space);
`

const Actions = styled.li`
  display: inline-block;
  margin-right: var(--space-sm);
  cursor: pointer;
  :hover {
    color: var(--thirdy-color);
  }
`

export default function SocialShare({ slug, syndicationLinks }) {
  const [copied, setCopied] = useState("")
  const [tweetID, setTweetID] = useState("")

  const url = `${config.siteUrl}${slug}`

  function copyToClipboard(e) {
    navigator.clipboard.writeText(`${config.siteUrl}${slug}`)
    setCopied(true)
    setTimeout(function delay() {
      setCopied("Copied permalink")
    }, 2000)
  }

  const getTweetID = (syndicationLinks) => {
    syndicationLinks
      ? syndicationLinks.map((entry) => {
          entry.name == "twitter"
            ? setTweetID(
                entry.slug.replace("https://twitter.com/mxdietrich/status/", "")
              )
            : null
        })
      : null
  }
  getTweetID(syndicationLinks)

  return (
    <WebActions className="indie-actions">
      <Actions do="share" with={url}>
        <a
          className="action share"
          title="Share this post"
          target="_blank"
          href={`https://twitter.com/intent/tweet?url=${url}`}
          rel="nofollow noopener"
        >
          <FaRetweet /> Share
        </a>
      </Actions>
      {tweetID ? (
        <Actions do="like" with={url}>
          <div
            className="action like"
            title="Like this post"
            onClick={sendLike()}
          >
            <BsStar /> Like
          </div>
        </Actions>
      ) : null}
      {tweetID ? (
        <Actions do="reply" with={url}>
          <a
            className="action reply"
            title="Reply to this post"
            target="_blank"
            href={`https://twitter.com/intent/tweet?in_reply_to=${tweetID}`}
            rel="nofollow noopener"
          >
            <FaRegComment /> Reply
          </a>
        </Actions>
      ) : null}
      <Actions
        className="action copy"
        title="Copy this post's permalink"
        onClick={() => copyToClipboard()}
      >
        <FaRegCopy /> Copy
      </Actions>
    </WebActions>
  )
}
