import React from "react"
//import { useScrollYPosition } from "react-use-scroll-position"
//import AnchorLink from "react-anchor-link-smooth-scroll"
import styled from 'styled-components';
import ReactMarkdown from "react-markdown"
import markdownStyles from '@/styles/markdown-styles.module.css'

const TOCWrapper = styled.div`
  position: sticky;
  top: 0;
  font-family: var(--secondary-font);
  margin-left: var(--space);
`

const TOCContainer = styled.div`
`

const TOCTitle = styled.p`
`

export default function TableOfContents ( content ) {
  //const size = useWindowSize()
  //const scrollY = useScrollYPosition()
  //const test = toc(content.content).content
  //console.log(test)
  return (
    {/*}
    <TOCWrapper>
      <TOCContainer> 
      <TOCTitle>Table of contents</TOCTitle> 
      </TOCContainer> 
  </TOCWrapper>*/}
  )
}
