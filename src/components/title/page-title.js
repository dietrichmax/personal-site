import styled from "styled-components"
import media from "styled-media-query"

const TitleWrapper = styled.div`
  max-width: 1200px;
  margin: calc(var(--space-lg) * 2.5) auto var(--space-lg) auto;
  padding-left: var(--space);
  padding-right: var(--space);
  ${media.lessThan("medium")`
    padding: 0 var(--space-sm);
    margin: calc(var(--space-lg)*2.5) auto var(--space-sm) auto;
  `}
`

const Title = styled.h1`
  font-size: 3rem;
  text-transform: capitalize;
  ${media.lessThan("medium")`
    font-size: 2rem;
`}
`

export default function PageTitle({ children, color }) {
  return (
    <TitleWrapper>
      <Title className="p-name">{children}</Title>
    </TitleWrapper>
  )
}
