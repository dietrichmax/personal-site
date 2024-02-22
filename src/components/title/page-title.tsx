import styled from "styled-components"
import media from "styled-media-query"

const TitleWrapper = styled.div`
  max-width: var(--width-container);
  margin: calc(var(--space-lg) * 2.5) auto var(--space-lg) auto;
  padding-left: var(--space);
  padding-right: var(--space);
  ${media.lessThan("large")`
    padding: 0 var(--space);
    margin: calc(var(--space-lg)*2.5) auto var(--space-sm) auto;
  `}
  ${media.lessThan("medium")`
    padding: 0 var(--space-sm);
  `}
`

const Title = styled.h1`
  font-size: 3rem;
  text-transform: capitalize;
  ${media.lessThan("large")`
    font-size: 2rem;
  `}
`

interface PageTitle {
  children: React.ReactNode
}

export default function PageTitle({ children }: PageTitle) {
  return (
    <TitleWrapper>
      <Title className="p-name">{children}</Title>
    </TitleWrapper>
  )
}
