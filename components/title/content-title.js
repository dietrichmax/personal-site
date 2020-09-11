import styled from 'styled-components'

const Title = styled.h1`
  margin: calc(var(--space-sm)*0.5) auto var(--space) auto;
  font-size: 3rem;
  font-weight: bold;
  font-family: var(--secondary-font);

`
export default function PostTitle({ children }) {
  return (
    <Title>{children}</Title>
  )
}
