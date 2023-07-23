import styled from "styled-components"

const Button = styled.button`
  border: none;
  width: auto !important;
  outline: none;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  text-align: center;
  padding: 0.5rem 1.25rem;
  width: 20%;
  border-radius: var(--border-radius);
  color: #fff;
  background: ${(props) =>
    props.backgroundColor
      ? `${props.backgroundColor}`
      : "var(--secondary-color)"};
  cursor: pointer;
  font-family: var(--primary-font);
  :hover {
    background-color: ${(props) =>
      props.backgroundColor
        ? `${props.backgroundColor}`
        : "var(--primary-color)"};
  }
  :disabled {
    cursor: not-allowed;
    opacity: 0.75;
  }
`

export { Button }
