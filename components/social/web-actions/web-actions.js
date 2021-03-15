import styled from 'styled-components';
import config from "@/lib/data/SiteConfig";
import media from 'styled-media-query';
import Link from "next/link"
import React, { useState } from "react"

const Share = styled.div`
  max-width: var(--content-width);
  margin-top: var(--space-sm);
`

const PostShareTitle = styled.p`
  margin-bottom: var(--space-sm);
  font-size: 1.5em;
  font-weight: 600;
`

const Icons= styled.i`    
  font-size: 1.25rem;
  transition: 0.2s;
  cursor: pointer;
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  margin-right: var(--space-sm);
  color: var(--text-color);
  outline: none;
  padding: var(--space-sm);
  border-radius: 50%;
  :hover {
    background-color: var(--text-color);
    color: #fff;
  }
  ${media.lessThan('small')`
    margin-bottom: var(--space-sm);
  `}
  `

const Copied = styled.span`
  color: green;
  font-size: 0.75rem;
`

export default function SocialShare({ slug }) {
  const [copied, setCopied] = useState(false)
  
  const url = `${config.siteUrl}${slug}`

  function copyToClipboard(e) {
    navigator.clipboard.writeText(`${config.siteUrl}${slug}`); 
    setCopied(true)
    setTimeout(function delay() {
      setCopied(false);
    }, 2000)
  };

    return (
      <Share>
        <div style="line-height:2.6em; font-size:1em;">
          <indie-action do="like" with="//tantek.com/2014/179/b1/indiewebcamp-thoughts-before-gathering">
          <a class="action favorite" target="_blank" href="https://twitter.com/intent/favorite?tweet_id=482954316118896641">♥ Like</a>
          </indie-action>
          <indie-action do="repost" with="//tantek.com/2014/179/b1/indiewebcamp-thoughts-before-gathering">
          <a class="action reply" target="_blank" href="https://twitter.com/intent/retweet?tweet_id=482954316118896641">♺ Repost</a>
          </indie-action>
          <indie-action do="reply" with="//tantek.com/2014/179/b1/indiewebcamp-thoughts-before-gathering">
          <a class="action reply" target="_blank" href="https://twitter.com/intent/tweet?in_reply_to=482954316118896641">↵ Reply</a>
          </indie-action>
        </div>
    </Share>
    )
  }
  
