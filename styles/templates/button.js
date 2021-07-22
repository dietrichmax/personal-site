import styled from 'styled-components'

const Button = styled.button`
  border: none;
  width: auto !important;
  color: var(--text-color);
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  transition: all .2s ease-in-out;
  text-align: center;
  padding: .5rem 1.25rem;
  width: 20%;
  border-radius: var(--border-radius);
  background: var(--secondary-color);
  cursor: pointer; 
  :hover {
      color: var(--text-color);
  }
`

export { Button }
