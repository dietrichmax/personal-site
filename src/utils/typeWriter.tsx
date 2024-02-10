import { useState, useEffect } from "react"

interface TypeWriter {
  content: string
  speed: number
}

const TypeWriter = ({ content = "", speed = 100 }) => {
  const [displayedContent, setDisplayedContent] = useState<string>("")
  const [index, setIndex] = useState<number>(0)

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

  return <>{displayedContent}</>
}

export default TypeWriter
