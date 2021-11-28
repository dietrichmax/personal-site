import React from "react"
//import { useScrollYPosition } from "react-use-scroll-position"
//import AnchorLink from "react-anchor-link-smooth-scroll"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import markdownStyles from "@/styles/markdown-styles.module.css"

const TOCWrapper = styled.div`
  position: sticky;
  top: 0;
  font-family: var(--secondary-font);
  margin-left: var(--space);
`

const TOCContainer = styled.div``

const TOCTitle = styled.p``
/*
export default function MarkdownPage<
  T extends { title: string } = { title: string }
>({ children, meta }: MarkdownProps<T>) {
  const anchors = React.Children.toArray(children)
    .filter(
      (child: any) =>
        child.props?.mdxType && ['h2', 'h3'].includes(child.props.mdxType)
    )
    .map((child: any) => ({
      url: '#' + child.props.id,
      depth:
        (child.props?.mdxType &&
          parseInt(child.props.mdxType.replace('h', ''), 0)) ??
        0,
      text: child.props.children
    }));

  return (
    <>
      <MDXProvider components={MDXComponents}>{children}</MDXProvider>
      <Toc anchors={anchors} />
    </>
  );
}*/

export default function TableOfContents(content) {
  //const size = useWindowSize()
  //const scrollY = useScrollYPosition()
  //const test = toc(content.content).content
  //console.log(test)
  return {
    /*}
    <TOCWrapper>
      <TOCContainer> 
      <TOCTitle>Table of contents</TOCTitle> 
      </TOCContainer> 
  </TOCWrapper>*/
  }
}
