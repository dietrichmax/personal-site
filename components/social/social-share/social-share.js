import styled from 'styled-components';
import config from "@/lib/data/SiteConfig";
import media from 'styled-media-query';
import Link from "next/link"

const Share = styled.div`
  max-width: var(--content-width);
  border-top: 1px solid var(--primary-color);
  padding-top: var(--space);
  margin-top: var(--space-sm);
  font-size: 1.25rem;
`

const PostShareTitle = styled.p`
  margin-bottom: var(--space-sm);
  font-size: 1.25rem;
  font-weight: 600;
`

const Icons= styled.i`    
  font-size: 1rem;
  transition: 0.2s;
  border: 1px solid;
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
  `


export default function SocialShare({ slug }) {
    

    function copyToClipboard(e) {
        navigator.clipboard.writeText(`${config.siteUrl}${slug}`);
      };

    return (
      <Share>
        <PostShareTitle>Share</PostShareTitle>
            <Link href={`https://twitter.com/share?url=${config.siteUrl}${slug}`} passHref><a><Icons className="lab la-twitter" title="Share on Twitter" /></a></Link>
            <Link href={`http://www.reddit.com/submit?url=${config.siteUrl}${slug}`} passHref><a><Icons className="lab la-reddit" title="Share on Reddit" /></a></Link>
            <Link href={`https://www.facebook.com/sharer/sharer.php?u=${config.siteUrl}${slug}`} passHref><a><Icons className="lab la-facebook" title="Share on Facebook" /></a></Link>
            <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${config.siteUrl}${slug}`} passHref><a><Icons className="lab la-linkedin" title="Share on Linkedin" /></a></Link>
            <Link href={`https://wa.me/?text=${config.siteUrl}${slug}`} passHref><a><Icons className="lab la-whatsapp" title="Share on Whatsapp" /></a></Link>
            <a><Icons onClick={copyToClipboard} className="las la-paste" title="Copy to Clipboard" /></a>
      </Share>
    )
  }
  
