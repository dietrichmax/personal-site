
import media from 'styled-media-query';
import styled from 'styled-components';

const DotWrapper = styled.div`
  position: absolute;
  display: block;
  height: auto;
  width: 120px;
  right: calc(var(--space-lg)*2);
  margin-top: 2200px;
  margin-bottom: var(--space);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(10px, 10px));
  ${media.lessThan('1600px')`
    display: none;
  `}
`
const Dot = styled.div`
  border-radius: 50%;
  height: 10px;
  width: 10px;
  background-color: var(--primary-color);
`



export default function Dots() {
    
    return (
        <DotWrapper>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
            <Dot/>
        </DotWrapper>

    )
}