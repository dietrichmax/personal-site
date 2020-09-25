import styled from 'styled-components'

const Container = styled.div`
  background-color: var(--primary-color);
  text-align: center;
`

const Title = styled.h1`
  margin: 0 auto var(--space) auto;
  max-width: 1200px;
  color: #fff;
  padding: var(--space);
  font-size: 4rem;
  font-family: var(--secondary-font);
  font-weight: 200;
  letter-spacing: -1px;

`


export default function TeaserTitle({ children }) {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  )
}
