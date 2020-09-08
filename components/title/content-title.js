import styled from 'styled-components'

const Title = styled.h1`
  margin: var(--space-sm) auto var(--space) auto;
  font-size: 3.5rem;
  font-weight: bold;
  font-family: var(--secondary-font);
  line-height: 5rem;

`
export default function PostTitle({ children }) {
  return (
    <Title>{children}</Title>
  )
}
