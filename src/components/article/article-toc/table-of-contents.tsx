import styled from "styled-components"

const ToCWrapper = styled.div`
  position: sticky;
  top: var(--space-sm);
  margin-bottom: var(--space-sm);
  background-color: var(--content-bg);
  padding: var(--space-sm) var(--space) var(--space-sm)
    calc(var(--space-sm) * 1.5);
  border-radius: var(--border-radius);
  font-size: 15px;
`

const ToCTitle = styled.p`
  font-size: 1rem;
  margin-bottom: var(--space-sm);
`

const ToCList = styled.ul`
  padding-inline-start: 0;
`
const ToCListItem = styled.li`
  list-style-type: none;
  margin-bottom: 1rem;
  padding-left: calc(var(--space-sm) * 1.25);
  border-left: 1px solid var(--secondary-color);
`

const ToCItemTitle = styled.a`
  transition: 0.2s;
  :hover {
    color: var(--secondary-color);
  }
`

interface TableOfContents {
  toc: {
    level: number
    id: number
    title: string
    anchor: string
  }
}

export default function TableOfContents({ toc }) {
  function TOC() {
    return (
      <ToCList className="table-of-contents">
        {toc.map(({ id, title, anchor }) => (
          <ToCListItem key={id}>
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
