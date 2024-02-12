import styled from "styled-components"
import media from "styled-media-query"
import React from "react"
import Nav from "@/components/navigation/nav"
import Logo from "@/components/logo/logo"

const HeaderWrapper = styled.header`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  color: ${(props) => (props.color ? `${props.color}` : "var(--text-color)")};
  z-index: 3;
`

const InnerHeader = styled.nav`
  max-width: var(--width-container);
  margin: calc(var(--space-sm) * 0.5) auto var(--space) auto;
  padding: var(--space-sm) var(--space);
  height: 80px;
  ${media.lessThan("large")`
    padding: var(--space-sm);
  `}
`

const MainNav = styled.div`
  text-align: justify;
  list-style-type: none;
  padding-inline-start: 0;
  gap: var(--space-sm);
  display: flex;
  justify-content: space-between;
  ${media.lessThan("medium")`
    display: block;
  `}
`

export default function Header({ color }) {
  return (
    <HeaderWrapper color={color}>
      <InnerHeader>
        <MainNav>
          <Logo />

          <Nav color={color} />
        </MainNav>
      </InnerHeader>
    </HeaderWrapper>
  )
}
