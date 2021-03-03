import styled from 'styled-components';
import media from 'styled-media-query';

const GridContainer = styled.ol`
  max-width: 1200px;
  padding-left: var(--space);
  padding-right: var(--space);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space);
  display: grid;
  list-style: none;
  ${media.lessThan('medium')`
    padding: 0;
    display: block;
`}
`;

export default function Grid({children}) {

  return (
    <section>
      <GridContainer className="h-feed">{children}</GridContainer>
    </section>
  )
}
