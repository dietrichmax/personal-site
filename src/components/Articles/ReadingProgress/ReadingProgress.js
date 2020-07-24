import React, { useEffect, useState, Fragment } from "react"
import styled from 'styled-components';

export const ReadingProgressBar = styled.div`
  top: 60px;
  position: fixed;
  height: 3px
`

export default ({ target, color }) => {
  const [readingProgress, setReadingProgress] = useState(0)
  const [show, setShow] = useState(false)
  const scrollListener = () => {
    if (!target.current) {
      return
    }

    const element = target.current
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    const toShow = windowScrollTop >= 0
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
        backgroundColor: color ? color : `hsla(0,0%,90.2%,.95)`,
        zIndex: "20000",
      }}
    />
  )
}