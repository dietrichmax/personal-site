import { useState, useEffect } from "react"
import styled from "styled-components"
import media from "styled-media-query"

const HeroSubTitle = styled.div`
  font-weight: normal;
  font-size: 60px;
  color: #f2f2f2;
  ${media.lessThan("large")`
    padding: 0 var(--space-sm);
  `}
`

const TypeWriter = ({ content = "", speed = 100 }) => {
  const [displayedContent, setDisplayedContent] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const animKey = setInterval(() => {
      setIndex((index) => {
        if (index >= content.length - 1) {
          clearInterval(animKey)
          return index
        }
        return index + 1
      })
    }, speed)
  }, [])

  useEffect(() => {
    setDisplayedContent((displayedContent) => displayedContent + content[index])
  }, [index])

  return <HeroSubTitle>{displayedContent}</HeroSubTitle>
}

export default TypeWriter
