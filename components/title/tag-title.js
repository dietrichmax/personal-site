import styled from 'styled-components'

const TitleWrapper = styled.div`
  max-width: 1200px;
  margin: calc(var(--space-lg)*2) auto var(--space-lg) auto;
  padding-left: var(--space);
`

const Title = styled.h1`
  font-size: 2em;
  text-transform: capitalize;
  color: ${props =>
    props.color ? props.color : 'var(--text-color'};
`

export default function TagTitle({ children, color }) {
  return (
    <TitleWrapper>
        <Title color={color}>{children}</Title>
    </TitleWrapper>
  )
}
