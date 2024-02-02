import styled from "styled-components"
import config from "@/src/data/internal/SiteConfig"
import media from "styled-media-query"
import { useState } from "react"
import { FaLink } from "@react-icons/all-files/fa/FaLink";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaReply } from "@react-icons/all-files/fa/FaReply";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
//import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";

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

export default function SocialShare({ slug, id, syndicationLinks, post }) {
  const [copied, setCopied] = useState("")

  let tweetID

  const url = `${config.siteUrl}${slug}`

  function copyToClipboard(e) {
    navigator.clipboard.writeText(`${config.siteUrl}${slug}`)
    setCopied(true)
    setTimeout(function delay() {
      setCopied("Copied permalink")
    }, 2000)
  }

  post
    ? post.syndicationLinks.map((entry) => {
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
      <Actions>
        <a
          className="action share"
          title="Share this post on Twitter"
          target="_blank"
          href={`https://twitter.com/intent/tweet?url=${url}`}
          rel="nofollow noopener"
          d="share"
          with={url}
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
            do="reply"
            with={url}
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
          do="share"
          with={url}
        >
          <FaLinkedin />
        </a>
      </Actions>
      <Actions>
        <a
          className="action mail"
          title="Mail this post"
          href={`mailto:?subject=${
            post ? post.title : null
          }&body=Check%20out%20this%20article%20on%20${config.domain}:%0A%0A${
            post
              ? `${post.excerpt.replace("<p>", "").replace(".</p>", "")}.`
              : null
          }%0A%0A${url}`}
          do="reply"
          with={url}
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
