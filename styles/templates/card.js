import styled from 'styled-components';

const Card = styled.li`    
  position: relative;
  background-color: var(--content-bg);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  list-style: outside none none;
  transition: all 0.5s ease 0s;
  :hover {
    transform: translate3d(0,-2%,0);
  }
`

export { Card }
