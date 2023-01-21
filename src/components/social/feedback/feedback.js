import React, { useState, useEffect } from "react"
import styled from "styled-components"
import media from "styled-media-query"
import config from "src/data/internal/SiteConfig"
import { format, subDays, formatDistance } from "date-fns"
import Image from "next/legacy/image"

const Container = styled.div`
  margin: var(--space-sm) 0;
  font-size: 16px;
`

const Count = styled.data`
  font-size: 18px;
  padding: var(--space-sm) var(--space-sm) var(--space-sm) 0;
  cursor: pointer;
`
export default function PostReactions() {
  const [likes, setLikes] = useState(0)
  const [incremented, setIncremented] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // get CMS Reactions
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/likes`, requestOptions)
      .then((response) => response.json())
      .then(function (data) {
        setLikes(data.count)
      })
  }, [])

  const sendIncrement = (value) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        count: value,
      }),
    }
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/likes`, requestOptions)
      .then(function (response) {
        if (!response.ok) {
          console.log(response.statusText)
        } else {
          setSubmitted(true)
          !process.env.NODE_ENV === "development"
            ? window._paq.push([
                "trackEvent",
                "Like Reaction",
                "Like Reaction Click",
              ])
            : null
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const sendLike = () => {
    if (!incremented) {
      setLikes(likes + 1),
        setIncremented(true),
        !submitted ? sendIncrement(likes + 1) : null
    } else {
      setLikes(likes - 1), setIncremented(false)
    }
  }
  return (
    <Container>
      <Count
        onClick={() => sendLike()}
        value={likes}
        title={`${likes} Favorites overall`}
      >
        🌟 {likes}
      </Count>
    </Container>
  )
}
