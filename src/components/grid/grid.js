import styled from "styled-components"
import media from "styled-media-query"
import image from "next/legacy/image"

const GridContainer = styled.div`
  display: grid;
  margin: auto;
  margin-left: 0;
  padding-left: var(--space);
  padding-right: var(--space);
  margin-bottom: var(--space-lg);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: masonry;
  gap: var(--space);
  list-style: none;
  ${media.lessThan("medium")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  `}
`

export default function Grid({ children }) {
  return (
    <section>
      <GridContainer className="h-feed">{children}</GridContainer>
    </section>
  )
}
