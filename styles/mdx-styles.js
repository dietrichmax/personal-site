import styled from "styled-components"

export const P = styled.p`
  margin-bottom: var(--space-sm);
`

export const A = styled.a`
  text-decoration: none;
  box-shadow: 0px -3px 0px 0px var(--secondary-color) inset;
  transition: box-shadow 150ms ease-in-out;
  color: var(--text-color);
  cursor: pointer;
  &:hover {
    box-shadow: 0px -18px 0px 0px var(--secondary-color) inset;
  }
`

export const IMG = styled.img`
  margin: var(--space) auto;
`

export const OL = styled.ol`
  padding-inline-start: 0;
  counter-reset: ol;
  li {
    display: flex;
    align-items: flex-start;
    margin: 1rem 0;
    width: 100%;
    counter-increment: ol;
  }
  li::before {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 3rem !important;
    min-height: 3rem !important;
    content: counter(ol);
    color: var(--text-color);
    background-color: var(--content-bg);
    font-weight: 600;
    border-radius: 50%;
    margin-right: var(--space-sm);
  `

export const UL = styled.ul`
  margin-bottom: var(--space);
  padding-inline-start: var(--space-sm);
  li {
    margin: 0.5rem 0;
  }
`

export const H2 = styled.h2`
  color: var(--text-color);
  font-size: 2rem;
  margin-top: var(--space);
  margin-bottom: 1.5rem;
  font-family: var(--primary-font);
  a {
    text-decoration: none;
    box-shadow: 0px -3px 0px 0px var(--secondary-color) inset;
    transition: box-shadow 150ms ease-in-out;
    color: var(--text-color);
  }
  a:hover {
    box-shadow: 0px -18px 0px 0px var(--secondary-color) inset;
  }
`

export const H3 = styled.h3`
  font-size: 1.75rem;
  margin-top: 1.75rem;
  margin-bottom: 1.25rem;
  font-family: var(--primary-font);
`

export const CODE = styled.code``

export const PRE = styled.pre`
  overflow: auto;
  margin: var(--space) auto;
  code {
    font-size: 1rem;
  }
`

export const Blockquote = styled.blockquote`
  border-left: 2px solid var(--secondary-color);
  padding: var(--space-sm) var(--space);
  margin-bottom: var(--space);
  background: var(--content-bg);
  font-style: italic;
  p {
    margin-bottom: 0;
  }
`
