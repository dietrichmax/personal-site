import styled from 'styled-components'

const Input = styled.input`
  padding-left: 0.25rem;
  margin-right: 0.125rem;
  border: 2px solid var(--gray-light);
  background-color: var(--content-bg);
  :invalid {
      border: 1px solid red;
  }
`

export { Input }
