import React from "react"
//import { useScrollYPosition } from "react-use-scroll-position"
//import AnchorLink from "react-anchor-link-smooth-scroll"
import styled from 'styled-components';
import media from 'styled-media-query';
import markdownToHtml from '@/lib/markdownToHtml'

const TOCWrapper = styled.div`
  margin: var(--space-sm) auto;
`

const TOCContainer = styled.div`
  background-color: var(--secondary-color);
  padding: var(--space);
  border-radius: var(--space-sm);
`

const TOCTitle = styled.p`
  margin-bottom: var(--space-sm);
  text-transform: uppercase;
`

export default function TOC ( content ) {
  //const size = useWindowSize()
  //const scrollY = useScrollYPosition()
  const toc = content.content


  return (
    !toc ? null :
    <TOCWrapper>
      <TOCContainer> 
      <TOCTitle>Table of contents</TOCTitle> 
        <div dangerouslySetInnerHTML={{ __html: toc }} />
      </TOCContainer> 
    </TOCWrapper>
  )
}
