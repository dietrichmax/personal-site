import styled from 'styled-components'

const Input = styled.input`
  height: 100%;
  padding-left: var(--space-sm);
  margin-right: var(--space-sm);
  border: 2px solid var(--body-bg);
  background-color: var(--content-bg);
  color: var(--text-color);
  :invalid {
      border: 1px solid red;
  }
`

export { Input }
