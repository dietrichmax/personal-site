import styled from 'styled-components';

const Card = styled.li`
  position: relative;
  transition: 0.2s;
  box-shadow: var(--box-shadow);
  background-color: var(--content-bg);
  border-radius: var(--border-radius);
  transition: .5s;
  :hover {
    transform: var(--transform);
  }
`

export { Card }
