import styled from 'styled-components'

const TitleWrapper = styled.div`
  margin: var(--space) auto var(--space) auto;
`

const Title = styled.h1`
  max-width: auto;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: var(--space-sm);
  color: var(--gray);
  text-transform: capitalize;

`

export default function PageTitle({ children, color }) {
  return (
    <TitleWrapper>
        <Title>{children}</Title>
    </TitleWrapper>
  )
}
