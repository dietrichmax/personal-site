
import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig"
import { format, subDays, formatDistance} from 'date-fns'
import Image from 'next/image'
const webmention = require('send-webmention'),
    concat = require('concat-stream');



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

const WebmentionsList = styled.div`
  list-style: none;
  padding-inline-start: 0;
  margin-bottom: var(--space-sm);
`

const WebmentionComment = styled.div`
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
`

const WebmentionDate = styled.cite`
  ${media.lessThan('small')`
    display: none;
  `}
`

const WebmentionContent = styled.p`
`


const SendWebmentions = styled.div`
  margin: var(--space-sm) auto var(--space) auto;
`

const SendText = styled.p`
`

const Input = styled.input`
  padding: .5rem 1rem; 
  margin: var(--space-sm) auto .25rem auto;
  width: 100%;
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
  background: var(--primary-color);
  :hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 8px 16px 0px;
  }       
`
export default function Webmentions({ slug, preview }) {
  const [webmentionsCount, setWebmentionsCount] = useState(0)
  const [webmentions, setWebmentions] = useState([])
  const [webmentionComments, setWebmentionComments] = useState([])
  const [webmentionReposts, setWebmentionReposts] = useState([])
  const [webmentionLikes, setWebmentionLikes] = useState([])
  const [sourceUrl, setSourceUrl] = useState("")



  const sendWebmention = () => {
    webmention(sourceUrl, `${config.siteUrl}${slug}`, function(err, obj) {
      if (err) throw err;

      if (obj.success) {
          obj.res.pipe(function(buf) {
              console.log('Success! Got back response:', buf.toString());
          });
      } else {
          console.log('Failure :(');
      }
    });
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
    
  webmentions.length > 0 ?
    webmentions.map((mention) => (
      mention["wm-property"] == "like-of" ?
        webmentionLikes.push(mention) : 
      mention["wm-property"] == "in-reply-to" ? webmentionComments.push(mention) : null
    ))
  : null

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
          <WebmentionsTitle>{webmentionsCount.count} Webmentions</WebmentionsTitle>
          <WebmentionsInfo 
            href="https://indieweb.org/Webmention" 
            target="_blank" rel="noopener noreferrer" 
            title="What's this?" 
            onClick={() => {!process.env.NODE_ENV === 'development' ? window._paq.push(['trackEvent', 'WebMentionsInfo', 'Click on Info']) : null}}
          ><WebmentionsInfoIcon className="las la-question-circle" /></WebmentionsInfo>
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
        </SendWebmentions>

        {webmentionsCount.count > 0 ? (
        <>
          <WebmentionsList>
          {/* Comments */}
          {webmentionComments.length > 0 ? (
          webmentionComments.map((mention) => (
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
                <WebmentionDate className="dt-published">{mention.published ? `${formatDistance(new Date(mention.published), new Date())} ago` : null}</WebmentionDate>
              </WebmentionAuthor>
              <WebmentionContent className="p-content">{mention.content? mention.content.text : null}</WebmentionContent>
            </WebmentionComment>
          ))
          ) : null}
          </WebmentionsList> 
          {/* Likes */}
          
          {webmentionLikes.length > 0 ? (
          <WebmentionsList>
            <WebmentionsTitle>Likes</WebmentionsTitle>
            {webmentionLikes.map((mention) => (
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
    </>
  )
}
