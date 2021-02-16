
import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig"
import { format, subDays, formatDistance} from 'date-fns'
import Image from 'next/image'

const ReactionsIcon = styled.i`
  cursor: pointer;
  color: ${props => (props.incremented ? "var(--thirdy-color)" : "var(--text-color)")};
`

const Icon  = styled.i`
  cursor: pointer;
  color: var(--text-color);
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
  margin-bottom: var(--space-sm);
`

const WebmentionAuthor = styled.div`  
  font-weight: 600;  
  margin-bottom: calc(var(--space-sm)*.5);
`

const WebmentionAuthorImgWrapper = styled.a`
  display: inline-block;
  vertical-align: middle;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: calc(var(--space-sm)*.5);
  :hover {
    display: cursor;
  }
`

const WebmentionAuthorName = styled.span`
  display: inline-block;
`

const WebmentionDate = styled.span`
  font-weight: 200;
  ${media.lessThan('small')`
    display: none;
  `}
`


const WebmentionContent = styled.p`
`


export default function Webmentions({ slug, preview }) {
    const [webmentionsCount, setWebmentionsCount] = useState(0)
    const [webmentions, setWebmentions] = useState([])
      

    useEffect(() => {
      // GET WebmentionCount
      fetch(`https://webmention.io/api/count.json?target=${config.siteUrl}${slug}`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
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
        className="las la-heart"
        title="Reactions"
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
                    height="50"
                    width="50"
                    className="u-photo"
                    alt={`Photo of ${mention.author.name}`}
                    title={mention.author.name}
                  />
                </WebmentionAuthorImgWrapper>
                <WebmentionAuthorName className="p-name">{mention.author.name}</WebmentionAuthorName>
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
