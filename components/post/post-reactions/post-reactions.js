import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig"

const Icon = styled.i`
  cursor: pointer;
  color: ${props => (props.incremented ? "var(--thirdy-color)" : "var(--text-color)")};
`


const PreviewLikeCount = styled.span`   
  margin-left: var(--space-sm);
`


export default function PostReactions({ postId, postSlug, preview }) {
    const [reactionId, setReactionID] = useState(0)
    const [heart, setHeart] = useState(0)
    const [mentions, setMentions] = useState([])
    const [incremented, setIncremented] = useState(false)
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      };
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/reactions?postId=${postId}`, requestOptions)
          .then(response => response.json())
          .then(function(data) {
            setReactionID(data[0].id)
            setHeart(data[0].reaction1_count)
          })
      
      //https://webmention.io/api/mentions.jf2?${config.domain}&token=${process.env.WEBMENTION_KEY}
      fetch(`https://webmention.io/api/mentions.jf2?target=${config.siteUrl}/articles/${postSlug}`)
          .then((response) => response.json())
          .then((result) => {
             setMentions(result.children);
        console.log(mentions)
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
        setHeart(heart+1),
        setIncremented(true),
        !submitted ? sendIncrement(heart+1) : null
      } else {  
        setHeart(heart-1),
        setIncremented(false)
      }
    }

  return (
    <PreviewLikeCount aria-label={heart}>
       <Icon 
          onClick={() => handleSubmit()}
          className="las la-heart"
          incremented={incremented} 
          title="Like this article?"
       /> {heart == undefined ? 0 : heart}</PreviewLikeCount> 
  )
}
