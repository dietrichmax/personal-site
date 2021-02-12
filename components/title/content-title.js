import styled from 'styled-components'

const Title = styled.h1`
  margin: calc(var(--space-sm)*0.5) auto var(--space) auto;
  font-size: 3rem;
  line-height: 4.5rem;
  font-family: var(--secondary-font);
  font-weight: 500;
`
export default function PostTitle({ children }) {
  return (
    <Title>{children}</Title>
  )
}
