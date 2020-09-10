import styled from 'styled-components'

const Title = styled.h1`
  margin: var(--space-sm) auto var(--space) auto;
  font-size: 4rem;
  font-weight: bold;
  font-family: var(--secondary-font);
  font-size: 2.5rem;

`
export default function PostTitle({ children }) {
  return (
    <Title>{children}</Title>
  )
}
