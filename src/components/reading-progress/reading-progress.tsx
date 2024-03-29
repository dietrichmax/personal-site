import { useEffect, useState, Fragment } from "react"
import styled from "styled-components"

export const ReadingProgressBar = styled.div`
  top: 0;
  position: fixed;
  height: 3px;
`

interface ReadingProgress {
  target: any
  color?: string
}

export default function ReadingProgress({ target, color }: ReadingProgress) {
  const [readingProgress, setReadingProgress] = useState<number>(0)
  const [show, setShow] = useState<boolean>(false)
  const scrollListener = () => {
    if (!target.current) {
      return
    }

    const element = target.current
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight
    const windowScrollTop =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    const toShow = windowScrollTop >= 455
    if (toShow != show) {
      setShow(toShow)
    }
    if (windowScrollTop === 0) {
      return setReadingProgress(0)
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100)
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100)
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollListener)
    return () => window.removeEventListener("scroll", scrollListener)
  })
  if (!show) {
    return <Fragment />
  }
  return (
    <ReadingProgressBar
      style={{
        width: `${readingProgress}%`,
        backgroundColor: color ? color : `var(--secondary-color)`,
        zIndex: "20000",
      }}
    />
  )
}
