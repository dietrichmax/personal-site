import styled from 'styled-components'

const Title = styled.h1`
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 3.5rem;
  font-weight: bold;

`
export default function PostTitle({ children }) {
  return (
    <Title>{children}</Title>
  )
}
