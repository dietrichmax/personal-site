
import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig"
import { format, subDays, formatDistance} from 'date-fns'
import Image from 'next/image'

const ReactionsIcon = styled.i`
`

const PreviewLikeCount = styled.span`   
  margin-left: var(--space-sm);
`

const WebMentionsWrapper = styled.section`   
  border-top: 0.1rem solid var(--gray-light);
  margin: var(--space) 0;
  padding-top: var(--space);
`

const WebmentionsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: var(--space-sm);
`

const WebmentionsTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`

const WebmentionsInfo = styled.a`
  display: flex;
  align-items: center;
  font-family: var(--secondary-font);
`

const WebmentionsInfoIcon = styled.i`
  margin-right: .125rem;
`

const WebmentionsList = styled.ol`
  list-style: none;
  padding-inline-start: 0;
  margin-bottom: var(--space-sm);
`

const WebmentionComment = styled.li`
  font-size: 1rem;
  margin-bottom: var(--space-sm);
  font-family: var(--secondary-font);
  background-color: var(--content-bg);
  padding: var(--space-sm);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
`

const WebmentionAuthor = styled.div`  
  margin-bottom: calc(var(--space-sm)*.5);
`

const WebmentionAuthorImgWrapper = styled.a`
  display: inline-block;
  vertical-align: middle;
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-right: calc(var(--space-sm)*.5);
  margin-bottom: calc(var(--space-sm)*.5);
  border-radius: var(--border-radius);
  border: 1px solid var(--gray-extra-light);
  background-color: var(--gray-extra-light);
  box-shadow: none;
  :hover {
    display: cursor;
  }
`

const WebmentionAuthorName = styled.span`
  font-weight: 600;  
  display: inline-block;
  margin-right: calc(var(--space-sm)*.5);
`

const WebmentionDate = styled.time`
  font-size: 14px;
  ${media.lessThan('small')`
    display: none;
  `}
`

const WebmentionContent = styled.p`
  font-family: var(--secondary-font);
`


const SendWebmentions = styled.div`
  margin: var(--space-sm) auto;
  font-family: var(--secondary-font);
`

const SendText = styled.p`
`

const Input = styled.input`
  padding: .5rem 1rem; 
  margin: var(--space-sm) auto;
  width: 60%;
  border: 2px solid var(--gray-light);
  background-color: var(--gray-extra-light);
  :invalid {
    border: 1px solid red;
  }
`

const Button = styled.button`
  border: 2px solid var(--primary-color);
  width: auto !important;
  color: var(--gray-extra-light);
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  transition: all .2s ease-in-out;
  text-align: center;
  padding: .75rem 1.5rem;
  width: 20%;
  border-radius: var(--border-radius);
  background: var(--primary-color);
  :hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 8px 16px 0px;
  }       
`

const WebmentionLike = styled.li`
  display: inline-block;
`

export default function Webmentions({ slug }) {
  const [webmentions, setWebmentions] = useState([])
  const [sourceUrl, setSourceUrl] = useState("")
  const [status, setStatus] = useState("")

  const url = config.siteUrl+slug
  const pageLimit = 1000

  const getWebmentionsForUrl = (webmentions, url) => {
    const commentsProperty = ['mention-of', 'in-reply-to']
    const likesProperty = ['like-of']
    const repostsProperty = ['repost-of']

    const hasRequiredFields = entry => {
        const { author, published, content } = entry
        return author.name && published && content
    }
    const sanitize = entry => {
        const { content } = entry
        if (content['content-type'] === 'text/html') {
            content.value = sanitizeHTML(content.value)
        }
        return entry
    }

    const count = webmentions.length
    const comments = webmentions
      .filter(entry => entry['wm-target'] === url)
      .filter(entry => commentsProperty.includes(entry['wm-property']))
      .filter(hasRequiredFields)
      .map(sanitize)
    const likes = webmentions
      .filter(entry => entry['wm-target'] === url)
      .filter(entry => likesProperty.includes(entry['wm-property']))
    const reposts = webmentions
      .filter(entry => entry['wm-target'] === url)
      .filter(entry => repostsProperty.includes(entry['wm-property']))

    return {
      count: count,
      comments: comments,
      likes: likes,
      reposts: reposts
    }
  }

  const sendWebmention = () => {
    const endpoint = "https://webmention.io/mxd.codes/webmention"
    async function sendData() {
      const res = await fetch(endpoint, {
        method: 'post',
        body: `source=${encodeURIComponent(sourceUrl)}&target=${encodeURIComponent(url)}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      const json = await res.json()
      if (json.error) {
        setStatus(json.error)
      }
      setStatus(json.statusText)
    }
    sendData();
  }

  useEffect(() => {
    async function getData() {
      fetch(`https://webmention.io/api/mentions.jf2?target=${url}&per-page=${pageLimit}&page=0`)
        .then((response) => response.json())
        .then((result) => {
          setWebmentions(getWebmentionsForUrl(result.children, url))
        });
      }
      getData()
  }, []);


  const renderAuthorImg = (mention) => {
    return (
      <WebmentionLike>
        <WebmentionAuthorImgWrapper className="u-url" href={mention.author.url}>
          <Image
            src={mention.author.photo}
            height="50"
            width="50"
            className="u-photo"
            alt={`Photo of ${mention.author.name}`}
            title={mention.author.name}
          />
        </WebmentionAuthorImgWrapper>
      </WebmentionLike>
    )
  }

  return (
    <>
      <WebMentionsWrapper> 
        <WebmentionsHeader>
          <WebmentionsTitle>{webmentions.count} Webmentions</WebmentionsTitle>
          <WebmentionsInfo 
            href="/webmention" 
            target="_blank" rel="noopener noreferrer" 
            title="What's this?" 
            onClick={() => {!process.env.NODE_ENV === 'development' ? window._paq.push(['trackEvent', 'WebMentionsInfo', 'Click on Info']) : null}}
          ><WebmentionsInfoIcon className="las la-question-circle" />What’s this?</WebmentionsInfo>
        </WebmentionsHeader>

        
        <SendWebmentions>
          <SendText>Have you published a response to this? Send me a webmention by letting me know the URL.</SendText>
          <Input
            type="webmention-source"
            name="webmention-source"
            id="webmention-source"
            label="webmention-source-input"
            placeholder="URL / permalink of your post"
            onChange={(e) => setSourceUrl(e.target.value)}
          />
          <Button
            type="button"
            aria-label="Send Webmention"
            onClick={() => sendWebmention()}
            style={{ width: "100%" }}
          >
          Send Webmention
          </Button>
          {status ? <span>{status}</span> : null}
        </SendWebmentions>

        {webmentions.count > 0 ? (
        <>
          <WebmentionsList>
          {/* Comments */}
          {webmentions.comments.length > 0 ? (
          webmentions.comments.map((mention) => (
            <WebmentionComment className="u-comment u-mention h-cite">
              <WebmentionAuthor className="h-card p-author" >
                {renderAuthorImg(mention)}
                <WebmentionAuthorName className="p-name">{mention.author.name}</WebmentionAuthorName>
                <a href={mention.url} title={mention.published}>
                  <WebmentionDate className="dt-published">{mention.published ? `${formatDistance(new Date(mention.published), new Date())} ago` : null}</WebmentionDate>
                </a>
                </WebmentionAuthor>
              <WebmentionContent className="p-content u-comment">{mention.content? mention.content.text : null}</WebmentionContent>
            </WebmentionComment>
          ))
          ) : null}
          </WebmentionsList> 
          {/* Likes */}
          
          {webmentions.likes.length > 0 ? (
          <WebmentionsList>
            <WebmentionsTitle style={{marginBottom:'var(--space-sm)'}}>Likes</WebmentionsTitle>
            {webmentions.likes.map((mention) => (
              renderAuthorImg(mention)
            ))}
            </WebmentionsList>
          ) : null }
          {/* Reposts*/}
          {webmentions.reposts.length > 0 ? (
          <WebmentionsList>
            <WebmentionsTitle>Reposts</WebmentionsTitle>
            {webmentions.reposts.map((mention) => (
              renderAuthorImg(mention)
            ))}
            </WebmentionsList>
          ) : null }
        </>
        ) : (
          <WebmentionContent>Found no Webmentions yet. Be the first!</WebmentionContent>
        )}
      
      </WebMentionsWrapper> 
    </>
  )
}
