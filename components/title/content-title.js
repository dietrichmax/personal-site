import styled from 'styled-components'

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;

`
export default function PostTitle({ children }) {
  return (
    <Title>{children}</Title>
  )
}
