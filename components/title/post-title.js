import styled from 'styled-components'

const Title = styled.h2`
  margin: 0 auto var(--space-sm) auto;
  font-size: 2em;
  font-weight: 700;
`
export default function PostTitle({ children }) {
  return (
    <Title>{children}</Title>
  )
}
