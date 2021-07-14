import styled from 'styled-components'

const Button = styled.button`
  font-size: 1rem;
  line-height: 1;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 0;
  cursor: pointer;
`

const ButtonPrimary = styled(Button)`
  background-color: ${(props) => props.theme.buttonPrimary};
  color: ${(props) => props.theme.textSecondary};
`

const ButtonGhost = styled(Button)`
  background-color: ${(props) => props.theme.buttonGhost};
  color: ${(props) => props.theme.textPrimary};
  font-size: 1.8rem;
`

export { ButtonPrimary, ButtonGhost }
