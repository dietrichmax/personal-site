import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';


const Container = styled.div`
  width: 20rem;
  margin: var(--space-lg) auto;
  padding: var(--space-sm) var(--space);
  display: flex;
  justify-content: space-around;
  
`

const Title = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`


const Comment = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  border: 1px solid var(--secondary-color);
  padding: var(--space-sm);
`

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: var(--text-color);
  outline: none;

`

const Icon = styled.i`
  font-size: 30px;
  cursor: pointer;
  color: ${props => (props.incremented ? "var(--thirdy-color)" : "var(--text-color)")};
`

const Count = styled.span`
  font-size: 1.5rem;
  margin-top: var(--space-sm);

`

const PreviewLikeCount = styled.span`   
  margin-left: var(--space-sm);
  font-size: inherit;
`
const PreviewIcon = styled.i`
`

export default function PostComments({ postID, preview }) {
    const [reactionId, setCommentID] = useState()
    const [heart, setHeart] = useState(0)
    const [useful, setUseful] = useState(0)
    const [starred, setStarred] = useState(0)
    const [incremented, setIncremented] = useState(false)
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      };
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/comments?post=${postID}`, requestOptions)
          .then(response => response.json())
          .then(function(data) {
            setCommentID(data[0].id)
            setComments(data[0].reaction1_count)
          })
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
            !process.env.NODE_ENV === 'development' ? window._paq.push(['trackEvent', 'Page Comment', 'Page Comment Click']) : null
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
    preview ?
    <PreviewLikeCount aria-label={heart}><PreviewIcon className="las la-heart"/> {heart == undefined ? 0 : heart}</PreviewLikeCount> 
    :
    <Container>
      <Comment>
        <Button onClick={() => handleSubmit()}><Icon incremented={incremented} className="las la-heart" title="Like this article?"/></Button>
        <Count>{heart == undefined ? 0 : heart}</Count>
      </Comment>
    </Container>
  )
}
