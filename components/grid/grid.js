import styled from 'styled-components';
import media from 'styled-media-query';
import image from "next/image"

const GridContainer = styled.ul`
  max-width: var(--width-container);
  display: grid;
  padding-left: var(--space);
  padding-right: var(--space);
  margin-bottom: var(--space-lg);
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: var(--space-lg);
  list-style: none;
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  `}
`

export default function Grid({children}) {

  return (
    <section>
      <GridContainer className="h-feed">{children}</GridContainer>
    </section>
  )
}
