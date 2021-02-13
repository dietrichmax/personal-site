
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

const WebMentionsWrapper = styled.div`
  margin-top: var(--space);
  padding-bottom: var(--space);
  border-bottom: 1px solid var(--secondary-color);
`

const WebmentionsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`

const WebmentionsTitle = styled.p`
  margin-bottom: var(--space-sm);
  letter-spacing: 3px;
  font-size: 1.5rem;
  color: var(--gray);
  text-transform: uppercase;
`

const WebmentionsInfo = styled.a`
  display: flex;
  align-items: center;
  color: var(--gray);
  :hover {
    color: var(--text-color);
  }
`

const WebmentionsInfoIcon = styled.i`
  font-size: 2rem;
`

const WebMentionsComments = styled.div`
`

const WebmentionComment = styled.div`
  border-radius: var(--space-sm);
  background-color: var(--secondary-color);
  padding: calc(var(--space-sm)*0.5);
  margin-top: var(--space-sm);
`

const WebmentionAuthor = styled.div`    
`

const WebmentionAuthorImg = styled.img`
  display: inline-block;
  vertical-align: middle;
  width: 25px;
  height: 25px;
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
  color: var(--gray);
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
        return "reposted"
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
        title="Like this article?"
      /> {webmentionCount.count+reactionsCount}</PreviewLikeCount> 
      <PreviewLikeCount aria-label={webmentionCount+reactionsCount}>
      <Icon onClick={() => handleSubmit()}
        className="las la-comment"
        incremented={incremented} 
        title="Webmentions"
      /> {webmentionCount.mention + webmentionCount.reply || 0}</PreviewLikeCount> 
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
              <WebmentionAuthor>
                <WebmentionAuthorImg
                  src={mention.author.photo}
                  alt={mention.author.name}
                  title={mention.author.name}
                  href={mention.author.url}
                />
                <WebmentionAuthorName>{mention.author.name}</WebmentionAuthorName>
                <WebmentionType href={mention.url} title={mention.url}> {GetWebMentionType(mention["wm-property"])} </WebmentionType>
                <WebmentionDate>{formatDistance(new Date(mention["wm-received"]), new Date())} ago</WebmentionDate>


              </WebmentionAuthor>
              <WebmentionContent>{mention.content? mention.content.text : null}</WebmentionContent>
            </WebmentionComment>
          ))
          ) : (
          
            <WebmentionComment><WebmentionContent>Found no Webmentions yet 😭</WebmentionContent></WebmentionComment>
          )}
        </WebMentionsComments>
      </WebMentionsWrapper> 
    </>

    ) 
    
    }
    </>
  )
}
