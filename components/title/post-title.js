import styled from 'styled-components'
import media from 'styled-media-query';

const Title = styled.h1`
  margin: 0 auto var(--space-sm) auto;
  font-size: 2em;
  font-weight: 700;
  ${media.lessThan('medium')`
    font-size: 1.3em;
`}
`
export default function PostTitle({ children }) {
  return (
    <Title>{children}</Title>
  )
}
