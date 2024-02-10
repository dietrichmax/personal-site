import styled from "styled-components"
import media from "styled-media-query"

const Title = styled.p`
  max-width: var(--width-container);
  margin: var(--space-lg) auto;
  padding-left: var(--space);
  padding-right: var(--space);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-color);
  ${media.lessThan("medium")`
    margin: var(--space) var(--space-sm);
    padding: 0;
  `}
`

interface SubTitle {
  children: React.ReactNode
}

export default function SubTitle({ children }: SubTitle) {
  return <Title>{children}</Title>
}
