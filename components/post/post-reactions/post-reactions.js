
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
  max-width: 800px;
`

const WebmentionsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: var(--space-sm);
`

const WebmentionsTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
`

const WebmentionsInfo = styled.a`
  font-size: 1rem;
  display: flex;
  align-items: center;
`

const WebmentionsInfoIcon = styled.i`
  font-size: 1.5rem;
`

const WebMentionsComments = styled.div`
  font-size: .75rem;
`

const WebmentionComment = styled.div`
  border-radius: var(--space-sm);
  border: 1px solid;
  padding: var(--space-sm);
  margin-top: var(--space-sm);
  font-size: 1rem;
`

const WebmentionAuthor = styled.div`    
`

const WebmentionAuthorImgWrapper = styled.a`
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
  margin: var(--space-sm);
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

const WebmentionType = styled.a`
  font-weight: bold;
`

const WebmentionContent = styled.p`
  margin-left: var(--space-sm);
`

const WebmentionDivider = styled.span`
  display: inline-block;
  padding: 0 .25rem;
`


export default function PostReactions({ postId, postSlug, preview }) {
    const [reactionId, setReactionID] = useState()
    const [reactionsCount, setReactionsCount] = useState(0)
    const [webmentionCount, setWebmentionCount] = useState(0)
    const [mentions, setMentions] = useState([])
    const [incremented, setIncremented] = useState(false)
    const [submitted, setSubmitted] = useState(false)

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
      } }
      

    useEffect(() => {

      // get CMS Reactions
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      };
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/reactions?postId=${postId}`, requestOptions)
          .then(response => response.json())
          .then(function(data) {
            setReactionID(data[0].id)
            setReactionsCount(data[0].reaction1_count)
          })
      
      // GET WebmentionCount
      fetch(`https://webmention.io/api/count.json?target=${config.siteUrl}/articles/${postSlug}`)
          .then((response) => response.json())
          .then((result) => {
            setWebmentionCount(result) 
        });

        // GET all Webmentions
        fetch(`https://webmention.io/api/mentions.jf2?target=${config.siteUrl}/articles/${postSlug}`)
          .then((response) => response.json())
          .then((result) => {
              setMentions(result.children);
          });
    }, []);
    
    const sendIncrement = (value) => {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          reaction1_count: value,
        })
      };
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/reactions/${reactionId}`, requestOptions)
        .then(function(response) {
          if (!response.ok) {
            console.log(response.statusText);
          } else {
            setSubmitted(true)
            !process.env.NODE_ENV === 'development' ? window._paq.push(['trackEvent', 'Page Reaction', 'Page Reaction Click']) : null
          }
          }).catch(function(error) {
              console.log(error);
          });
    }

    const handleSubmit = () => {
      if (!incremented) {
        setReactionsCount(reactionsCount+1),
        setIncremented(true),
        !submitted ? sendIncrement(reactionsCount+1) : null
      } else {  
        setReactionsCount(reactionsCount-1),
        setIncremented(false)
      }
    }
  return (
    <>
    {preview ? (
    <>
      <PreviewLikeCount aria-label={webmentionCount+reactionsCount} >
      <ReactionsIcon onClick={() => handleSubmit()}
        className="las la-heart"
        incremented={incremented} 
        title="Reactions"
      /> {webmentionCount.count+reactionsCount}</PreviewLikeCount> 
    </>
    ) : (
      <>
      <WebMentionsWrapper> 
        <WebmentionsHeader>
          <WebmentionsTitle>WebMentions</WebmentionsTitle>
          <WebmentionsInfo 
            href="https://indieweb.org/Webmention" 
            target="_blank" rel="noopener noreferrer" 
            title="What's this?" 
            onClick={() => {!process.env.NODE_ENV === 'development' ? window._paq.push(['trackEvent', 'WebMentionsInfo', 'Click on Info']) : null}}
          ><WebmentionsInfoIcon className="las la-question-circle" /></WebmentionsInfo>
        </WebmentionsHeader>
        <WebMentionsComments>
          {mentions.length > 0 ? (
          mentions.map((mention) => (
            <WebmentionComment>
              <WebmentionAuthor className="h-card" >
              <WebmentionAuthorImgWrapper className="u-url" href={mention.author.url}>
                  <Image
                    src={mention.author.photo}
                    height="30"
                    width="30"
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
