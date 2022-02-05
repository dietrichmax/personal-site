import styled from 'styled-components';

const Card = styled.li`    
  position: relative;
  display: flex;
  list-style: outside none none;
  transition: all 0.5s ease 0s;
  border: 1px solid var(--content-bg);
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--content-bg);  
  box-shadow: 0 1.6px 3.6px 0 rgba(0,0,0,0.13),0 .3px .9px 0 rgba(0,0,0,0.11);
`

export { Card }
