
import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';
import config from "@/lib/data/internal/SiteConfig"
import { format, subDays, formatDistance} from 'date-fns'
import Image from 'next/image'
import { FaRegQuestionCircle, FaRetweet, FaRegComment } from 'react-icons/fa';
import { BsStar } from 'react-icons/bs';
import Comments from "@/components/comments/comments"

const WebMentionsWrapper = styled.section`   
  border-top: 0.1rem solid var(--content-bg);
  margin: var(--space) 0;
  padding-top: var(--space-sm);
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
  margin-bottom: var(--space-sm);
  font-family: var(--secondary-font);
  background-color: var(--content-bg);
  padding: var(--space-sm);
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
  background-color: var(--gray-extra-light);
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
  background-color: var(--content-bg);
  color: var(--text-color);
  :invalid {
    border: 1px solid red;
  }
`

const Button = styled.button`
  border: none;
  width: auto !important;
  color: var(--primary-color);
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  transition: all .2s ease-in-out;
  text-align: center;
  padding: .75rem 1.5rem;
  width: 20%;
  border-radius: var(--border-radius);
  background: var(--secondary-color);
  cursor: pointer; 
  :hover {
      color: var(--content-bg);
  }
`

const WebmentionLike = styled.li`
  display: inline-block;
`

const Status = styled.div`
  font-size: 14px;
  color: ${props => props.color ? props.color : 'var(--text-color)'};
`

const WebmentionsCount = styled.ol`
  display: inline-block;
  padding-inline-start: 0;
  list-style: none;
`

const WebmentionsPreview = styled.ol`
  display: inline-block;
  padding-inline-start: 0;
  list-style: none;
`

const WebmentionPreviewCount = styled.li`
  display: inline-block;
  margin-right: 0.5rem;
`

const WebmentionPreviewLabel = styled.span`
  ${media.lessThan('medium')`
  display: none;
  `}
`

export default function Webmentions({ slug, preview }) {
  const [webmentions, setWebmentions] = useState([])
  const [sourceUrl, setSourceUrl] = useState("")
  const [views, setViews] = useState(0)
  const [status, setStatus] = useState({})

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
      commentsCount: comments.length,
      likes: likes,
      likesCount: likes.length,
      reposts: reposts,
      repostsCount: reposts.length
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
        setStatus({
          text: json.error_description,
          color: "red"
        })
      } else {
        setStatus({
          text: json.summary + ". Refresh in a minute to see your Webmention",
          color: "green"
        })
      }
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
    /*async function getViews() {
      fetch(`${process.env.NEXT_PUBLIC_MATOMO_URL}/?module=API&method=Actions.getPageUrl&pageUrl=${url}&idSite=1&period=range&date=2011-01-01,${new Date().toISOString().slice(0,10)}&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`)
      .then((response) => response.json())
      .then((result) => {
        setViews(result[0].nb_visits)
      });
    }
    getViews()*/
  }, []);


  const renderAuthorImg = (mention) => {
    return (
      <WebmentionLike>
        <WebmentionAuthorImgWrapper className="u-url" href={mention.author.url} rel="nofollow">
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
    {preview ? (
      <WebmentionsPreview>
        {webmentions.likesCount > 0 ? <WebmentionPreviewCount><BsStar/> {webmentions.likesCount} <WebmentionPreviewLabel>{webmentions.likesCount == 1 ? "like" : "likes"}</WebmentionPreviewLabel></WebmentionPreviewCount> : null }
        {webmentions.repostsCount > 0 ? <WebmentionPreviewCount><FaRetweet/> {webmentions.repostsCount} <WebmentionPreviewLabel>{webmentions.repostsCount == 1 ? "repost" : "reposts"}</WebmentionPreviewLabel></WebmentionPreviewCount>  : null }
        {webmentions.commentsCount > 0 ? <WebmentionPreviewCount><FaRegComment/> {webmentions.commentsCount} <WebmentionPreviewLabel>{webmentions.commentsCount == 1 ? "reply" : "replies"}</WebmentionPreviewLabel></WebmentionPreviewCount>  : null }
      </WebmentionsPreview>
    ):( 
      <WebMentionsWrapper> 
        <WebmentionsHeader>
          <WebmentionsTitle>{webmentions.count ? webmentions.count : "0"} Webmentions</WebmentionsTitle>
          <WebmentionsInfo 
            href="/webmention" 
            target="_blank" rel="noopener noreferrer" 
            title="What's this?" 
            onClick={() => {!process.env.NODE_ENV === 'development' ? window._paq.push(['trackEvent', 'WebMentionsInfo', 'Click on Info']) : null}}
            >
            <FaRegQuestionCircle />{/* What’s this?*/}</WebmentionsInfo>
        </WebmentionsHeader>
        
        <SendWebmentions>
          <SendText for="webmention">Have you published a response to this? Send me a webmention by letting me know the URL.</SendText>
          <Input
            type="webmention"
            name="webmention"
            id="webmention"
            label="webmention-input"
            placeholder="URL / permalink of your response"
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
          <Status color={status.color}>{status.text}</Status>
        </SendWebmentions>

        {webmentions.count > 0 ? (
        <>
        {/* Comments */}
          {webmentions.comments.length > 0 ? (
          <WebmentionsList>
            <WebmentionsTitle style={{marginBottom:'var(--space-sm)'}}>{webmentions.comments.length} {webmentions.comments.length == 1 ? "Reply" : "Replies"}</WebmentionsTitle>
          {webmentions.comments.map((mention) => (
            <WebmentionComment className="u-comment u-mention h-cite">
              <WebmentionAuthor className="h-card p-author" >
                {renderAuthorImg(mention)}
                <WebmentionAuthorName className="p-name">{mention.author.name}</WebmentionAuthorName>
                <a href={mention.url} rel="nofollow" title={mention.published}>
                  <WebmentionDate className="dt-published">{mention.published ? `${formatDistance(new Date(mention.published), new Date())} ago` : null}</WebmentionDate>
                </a>
                </WebmentionAuthor>
              <WebmentionContent className="p-content u-comment">{mention.content? mention.content.text : null}</WebmentionContent>
            </WebmentionComment>
          ))}
          </WebmentionsList> 
          ) : null}
          {/* Likes */}
          
          {webmentions.likes.length > 0 ? (
          <WebmentionsList>
            <WebmentionsTitle style={{marginBottom:'var(--space-sm)'}}>{webmentions.likes.length} {webmentions.likes.length == 1 ? "Like" : "Likes"}</WebmentionsTitle>
            {webmentions.likes.map((mention) => (
              renderAuthorImg(mention)
            ))}
            </WebmentionsList>
          ) : null }
          {/* Reposts*/}
          {webmentions.reposts.length > 0 ? (
          <WebmentionsList>
            <WebmentionsTitle style={{marginBottom:'var(--space-sm)'}}>{webmentions.reposts.length} {webmentions.reposts.length == 1 ? "Repost" : "Reposts"}</WebmentionsTitle>
            {webmentions.reposts.map((mention) => (
              renderAuthorImg(mention)
            ))}
            </WebmentionsList>
          ) : null }
        </>
        ) : (
          <WebmentionContent>Found no Webmentions yet. Be the first!</WebmentionContent>
        )}
        <Comments slug={slug} />
      </WebMentionsWrapper> 
      )}
    </>
  )
}
