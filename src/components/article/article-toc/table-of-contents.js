import styled from "styled-components"
import React, { useEffect } from "react"

const ToCWrapper = styled.div`
  position: sticky;
  top: var(--space-sm);
  margin-bottom: var(--space-sm);
  background-color: var(--content-bg);
  padding: var(--space);
  border-radius: var(--border-radius);
`

const ToCTitle = styled.p`
  font-weight: bold;
  margin-bottom: var(--space-sm);
`

const ToCList = styled.ol`
  padding-inline-start: 0;
`
const ToCListItem = styled.li`
  list-style-type: none;
  margin-bottom: 1rem;
  padding-left: calc(var(--space-sm) * 0.5);
  border-left: 3px solid var(--secondary-color);
  margin-left: ${(props) => (props.level > 1 ? `${props.level * 10}px` : "0")};
`

const ToCItemTitle = styled.a`
  transition: 0.2s;
  :hover {
    color: var(--secondary-color);
  }
`

export default function TableOfContents({ toc }) {
  function TOC() {
    return (
      <ToCList className="table-of-contents">
        {toc.map(({ level, id, title, anchor }) => (
          //console.log(title) &&
          <ToCListItem key={id} level={level}>
            <ToCItemTitle href={anchor}>{title}</ToCItemTitle>
          </ToCListItem>
        ))}
      </ToCList>
    )
  }

  return (
    <>
      <ToCTitle>Table of contents</ToCTitle>
      <ToCWrapper>
        <TOC />
      </ToCWrapper>
    </>
  )
}
