import styled from 'styled-components';
import media from 'styled-media-query';

const GridContainer = styled.ol`
  max-width: var(--width-container);
  padding-left: var(--space);
  padding-right: var(--space);
  grid-template-columns: repeat(1,minmax(0,1fr));
  gap: var(--space);
  display: grid;
  margin-bottom: var(--space-lg);
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

export default function Grid({children}) {

  return (
    <section>
      <GridContainer className="h-feed">{children}</GridContainer>
    </section>
  )
}
