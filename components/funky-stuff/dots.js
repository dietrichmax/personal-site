
import media from 'styled-media-query';
import styled from 'styled-components';

const DotWrapper = styled.div`
  position: absolute;
  display: block;
  height: auto;
  width: 100px;
  right: calc(var(--space-lg)*2);
  margin-top: 2200px;
  margin-bottom: var(--space);
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(5px, 5px));
  ${media.lessThan('1600px')`
    display: none;
  `}
`
const Dot = styled.div`
  border-radius: 50%;
  height: 5px;
  width: 5px;
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
            <Dot/>
            <Dot title="Hi"/>
        </DotWrapper>

    )
}