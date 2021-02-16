import styled from 'styled-components'
import media from 'styled-media-query';


const TitleWrapper = styled.div`
  max-width: 1200px;
  margin: calc(var(--space-lg)*2.5) auto var(--space-lg) auto;
  padding-left: var(--space);
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    margin: calc(var(--space-lg)*2.5) auto var(--space-sm) auto;
  `}

`

const Title = styled.h1`
  text-transform: capitalize;
  color: ${props =>
    props.color ? props.color : 'var(--text-color'};
    
  font-size: 3rem;
  text-transform: capitalize;
  ${media.lessThan('medium')`
    font-size: 2rem;
`}
`

export default function TagTitle({ children, color }) {
  return (
    <TitleWrapper>
        <Title color={color}>{children}</Title>
    </TitleWrapper>
  )
}
