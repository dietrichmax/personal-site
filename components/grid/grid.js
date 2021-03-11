import styled from 'styled-components';
import media from 'styled-media-query';

const GridContainer = styled.div`
  max-width: var(--width-container);
  padding-left: var(--space);
  padding-right: var(--space);
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: var(--space);
  display: grid;
  margin-bottom: var(--space-lg);
  ${media.lessThan('large')`
    grid-template-columns: repeat(2,minmax(0,1fr));
  `}
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    grid-template-columns: repeat(1,minmax(0,1fr));
  `}
`

export default function Grid({children}) {

  return (
    <section>
      <GridContainer className="h-feed">{children}</GridContainer>
    </section>
  )
}
