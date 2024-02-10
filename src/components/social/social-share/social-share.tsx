import styled from "styled-components"
import { config } from "@/src/data/internal/SiteConfig"
import media from "styled-media-query"
import { useState } from "react"
import { FaLink } from "@react-icons/all-files/fa/FaLink"
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin"
import { FaReply } from "@react-icons/all-files/fa/FaReply"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
//import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope"

const WebActions = styled.ol`
  margin-top: var(--space-sm);
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

interface SocialShare {
  slug: string
  syndicationLinks: Array<string>
  title: string
  excerpt: string
}

export default function SocialShare({
  slug,
  syndicationLinks,
  title,
  excerpt,
}) {
  const [copied, setCopied] = useState<string>("")

  let tweetID: string

  const url = `${config.siteUrl}${slug}`

  function copyToClipboard() {
    navigator.clipboard.writeText(`${config.siteUrl}${slug}`)
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
      <Actions>
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
        <Actions>
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
      <Actions>
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
      <Actions>
        <a
          className="action mail"
          title="Mail this post"
          href={`mailto:?subject=${title}&body=Check%20out%20this%20article%20on%20${config.domain}:%0A%0A${`${excerpt.replace("<p>", "").replace(".</p>", "")}.`}%0A%0A${url}`}
        >
          <FaEnvelope />
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
