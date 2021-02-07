import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';


const Container = styled.div`
  width: 20rem;
  margin: var(--space-lg) auto;
  padding: var(--space-sm) var(--space);
  display: flex;
  justify-content: space-around;
  background-color: var(--secondary-color);
`

const Title = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`


const Reaction = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
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

const Count = styled.a`
  font-size: 1.5rem;
  margin-top: var(--space-sm);

`

export default function PostReactions({ post }) {
    const [heart, setHeart] = useState(post.heart)
    const [useful, setUseful] = useState(0)
    const [starred, setStarred] = useState(0)
    const [incremented, setIncremented] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const postID = post.id

    const sendIncrement = (value) => {
        
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heart: value })
      };
      fetch(`https://api.mxd.codes/posts/${postID}`, requestOptions)
        .then(function(response) {
          if (!response.ok) {
            console.log(response.statusText);
          } else {
            setSubmitted(true)
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
    <Container>
      <Reaction>
        <Button onClick={() => handleSubmit()}><Icon incremented={incremented} className="las la-heart"/></Button>
        <Count>{heart}</Count>
      </Reaction>
    </Container>
  )
}
