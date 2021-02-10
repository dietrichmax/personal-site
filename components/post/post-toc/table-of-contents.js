import React from "react"
//import { useScrollYPosition } from "react-use-scroll-position"
//import AnchorLink from "react-anchor-link-smooth-scroll"
import styled from 'styled-components';
import media from 'styled-media-query';
import markdownToHtml from '@/lib/markdownToHtml'

const TOCWrapper = styled.div`
  top: 0;
  position: sticky;
  margin-top: calc(var(--space-lg)*5);
  padding-top: var(--space-lg);
  ${media.lessThan('large')`
    display: none;
`}
`

const TOCContainer = styled.div`
  background-color: var(--secondary-color);
  padding: var(--space);
`

const TOCTitle = styled.p`
  margin-bottom: var(--space-sm);
  font-weight: 200;
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