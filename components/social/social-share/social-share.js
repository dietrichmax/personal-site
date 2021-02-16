import styled from 'styled-components';
import config from "@/lib/data/SiteConfig";
import media from 'styled-media-query';
import Link from "next/link"
import React, { useState } from "react"

const Share = styled.div`
  max-width: var(--content-width);
  border-top: 1px solid var(--primary-color);
  padding-top: var(--space);
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
    

    function copyToClipboard(e) {
        navigator.clipboard.writeText(`${config.siteUrl}${slug}`);
        setCopied(true)
        setTimeout(function delay() {
          setCopied(false);
        }, 2000)
      };

    return (
      <Share>
        <PostShareTitle>Share</PostShareTitle>
            <Link href={`https://twitter.com/share?url=${config.siteUrl}${slug}`} passHref><a><Icons className="lab la-twitter" title="Share on Twitter" /></a></Link>
            <Link href={`http://www.reddit.com/submit?url=${config.siteUrl}${slug}`} passHref><a><Icons className="lab la-reddit" title="Share on Reddit" /></a></Link>
            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${config.siteUrl}${slug}`} passHref><a><Icons className="lab la-facebook" title="Share on Facebook" /></a></Link>
            <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${config.siteUrl}${slug}`} passHref><a><Icons className="lab la-linkedin" title="Share on Linkedin" /></a></Link>
            <Link href={`https://wa.me/?text=${config.siteUrl}${slug}`} passHref><a><Icons className="lab la-whatsapp" title="Share on Whatsapp" /></a></Link>
            <a><Icons onClick={copyToClipboard} className="las la-paste" title="Copy to Clipboard" /><Copied>{copied ? `Copied` : null}</Copied></a>
      </Share>
    )
  }
  
