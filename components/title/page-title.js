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

`
const Separator = styled.div`
  border-bottom: 2px solid  ${props =>
    props.color ? props.color : '#798ad0'};
  width: 10%;
  margin: auto;
`
export default function PageTitle({ title, color }) {
  return (
    <TitleWrapper>
        <Title>{title}</Title>
        <Separator color={color}/>
    </TitleWrapper>
  )
}
