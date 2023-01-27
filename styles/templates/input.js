import styled from "styled-components"

const Input = styled.input`
  height: 100%;
  padding-left: var(--space-sm);
  padding: 0.5rem 1rem;
  border: 2px solid var(--body-bg);
  font-family: var(--primary-font);
  background-color: var(--content-bg);
  color: var(--text-color);
  :invalid {
    border: 1px solid red;
  }
`

export { Input }
