import styled from 'styled-components'
import media from "styled-media-query"

const Title = styled.p`
  max-width: 1200px;
  margin: auto;
  padding-left: var(--space);
  padding-right: var(--space);
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.4;
  color: var(--gray);
  ${media.lessThan('1200px')`
    margin: var(--space-sm);
    padding: 0;
  `}
`

export default function SubTitle({ children }) {
  return (
      <Title>{children}</Title>
  )
}
