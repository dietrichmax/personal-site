
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
  margin-top: var(--space);
  max-width: 700px;
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
  margin-bottom: var(--space-sm);
`

const WebmentionsInfo = styled.a`
  font-size: 1rem;
  display: flex;
  align-items: center;
`

const WebmentionsInfoIcon = styled.i`
  font-size: 1.5rem;
`

const WebMentionsComments = styled.ol`
  list-style: none;
  padding-inline-start: 0;
`

const WebmentionComment = styled.li`
  font-size: 1rem;
  margin-bottom: var(--space);
  font-family: var(--secondary-font);
`

const WebmentionAuthor = styled.div`  
  margin-bottom: calc(var(--space-sm)*.5);
`

const WebmentionAuthorImgWrapper = styled.a`
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: 40px;
  overflow: hidden;
  margin-right: calc(var(--space-sm)*.5);
  :hover {
    display: cursor;
  }
`

const WebmentionAuthorName = styled.span`
  font-weight: 600;  
  display: inline-block;
`

const WebmentionDate = styled.cite`
  ${media.lessThan('small')`
    display: none;
  `}
`

const WebmentionType = styled.cite`
`

const WebmentionContent = styled.p`
`


export default function Webmentions({ slug, preview }) {
  const [webmentionsCount, setWebmentionsCount] = useState(0)
  const [webmentions, setWebmentions] = useState([])

  const GetWebMentionType = (property) => { 
    if (property == "in-reply-to") {
      return "replied"
    } else if (property == "like-of") {
      return "liked"
    } else if (property == "repost-of") {
      return "retweeted"
    } else if (property == "bookmark-of") {
      return "bookmarked"
    } else if(property == "mention-of") {
      return "mentioned"
    } 
  }

    useEffect(() => {
      // GET WebmentionCount
      fetch(`https://webmention.io/api/count.json?target=${config.siteUrl}${slug}`)
        .then((response) => response.json())
        .then((result) => {
          setWebmentionsCount(result) 
        });
      // GET all Webmentions
      fetch(`https://webmention.io/api/mentions.jf2?target=${config.siteUrl}${slug}`)
        .then((response) => response.json())
        .then((result) => {
          setWebmentions(result.children);
        });
    }, []);
    


  return (
    <>
    {preview ? (
    <>
      <PreviewLikeCount aria-label={webmentionsCount.count} >
      <ReactionsIcon 
        title={`${webmentionsCount.count} Reactions`}
        className="las la-heart"
      /> {webmentionsCount.count}</PreviewLikeCount> 
    </>
    ) : (
      <>
      <WebMentionsWrapper> 
        <WebmentionsHeader>
          <WebmentionsTitle>{webmentionsCount.count} WebMentions</WebmentionsTitle>
          <WebmentionsInfo 
            href="https://indieweb.org/Webmention" 
            target="_blank" rel="noopener noreferrer" 
            title="What's this?" 
            onClick={() => {!process.env.NODE_ENV === 'development' ? window._paq.push(['trackEvent', 'WebMentionsInfo', 'Click on Info']) : null}}
          ><WebmentionsInfoIcon className="las la-question-circle" /></WebmentionsInfo>
        </WebmentionsHeader>
        <WebMentionsComments>
          {webmentions.length > 0 ? (
          webmentions.map((mention) => (
            <WebmentionComment>
              <WebmentionAuthor className="h-card" >
              <WebmentionAuthorImgWrapper className="u-url" href={mention.author.url}>
                  <Image
                    src={mention.author.photo}
                    height="40"
                    width="40"
                    className="u-photo"
                    alt={`Photo of ${mention.author.name}`}
                    title={mention.author.name}
                  />
                </WebmentionAuthorImgWrapper>
                <WebmentionAuthorName className="p-name">{mention.author.name}</WebmentionAuthorName>
                <WebmentionType href={mention.url} title={mention.url}> {GetWebMentionType(mention["wm-property"])} </WebmentionType>
                <WebmentionDate className="dt-published">{mention.published ? `${formatDistance(new Date(mention.published), new Date())} ago` : null}</WebmentionDate>

              </WebmentionAuthor>
              <WebmentionContent className="p-content">{mention.content? mention.content.text : null}</WebmentionContent>
            </WebmentionComment>
          ))
          ) : (
          
            <WebmentionComment><WebmentionContent>Found no Webmentions yet. Be the first!</WebmentionContent></WebmentionComment>
          )}
        </WebMentionsComments>
      </WebMentionsWrapper> 
    </>

    ) 
    
    }
    </>
  )
}
