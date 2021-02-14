import styled from 'styled-components'
import media from 'styled-media-query';

const TitleWrapper = styled.div`
  max-width: 1200px;
  margin: calc(var(--space-lg)*2.5) auto var(--space-lg) auto;
  padding-left: var(--space);
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
  `}
`

const Title = styled.h1`
  font-size: 2em;
  text-transform: capitalize;
  ${media.lessThan('medium')`
    font-size: 1.3em;
`}
`

export default function PageTitle({ children, color }) {
  return (
    <TitleWrapper>
        <Title>{children}</Title>
    </TitleWrapper>
  )
}
