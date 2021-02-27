import styled from 'styled-components'
import Link from 'next/link'
import config from "@/lib/data/SiteConfig";
import media from 'styled-media-query';
import React, { useEffect }  from "react";
//import ThemePicker from "@/components/themes/themePicker";
import Nav from "@/components/navigation/nav"

const HeaderWrapper = styled.header`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`

const InnerHeader = styled.div`
  max-width: 1200px;
  margin: calc(var(--space-sm)*0.5) auto var(--space) auto;
  padding: var(--space-sm) var(--space);
  height: 80px;
  ${media.lessThan('medium')`
    padding: var(--space-sm);
    margin: calc(var(--space-sm)*0.5) auto var(--space) auto;
  `}
`

const Navigation = styled.nav`
  position: relative;
  width: 100%;
  float: left;
  right: 0;
  padding: 0;
  font-size: 1rem;
  text-align: right;
  border-bottom-style: none;
  color: ${props => (props.color ? `${props.color}`  : "var(--text-color)")};
`

const MainNav = styled.ul`
  text-align: justify;
  list-style-type: none;
  padding-inline-start: 0;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  gap: var(--space-sm);
  display: grid;
  ${media.lessThan('medium')`
    display: block;
  `}
`

const Logo = styled.li`
  grid-column: span 2 / span 2;
  display: inline-block;
  :hover {
    color: ${props => (props.color ? `#fff`  : "var(--text-color-hover)")}
  }
  ${media.lessThan('small')`
    font-size: 1rem;
  `}
`
const LogoName = styled.span`
  font-weight: 700;
`
const LogoDescription = styled.span`

`


export default function Header( color ) {

  
  return (
    <HeaderWrapper>
      
      <InnerHeader>
        <Navigation itemtype="https://schema.org/SiteNavigationElement" color={color.color}>

        <MainNav>

          <Logo color={color.color}>
            <Link href="/" passHref>
              <a className="u-url" rel="me" title={config.siteTitle}>
                <LogoName className="p-name" >{config.siteTitle}</LogoName>
                <br/>
                <LogoDescription>{config.siteSubtitle}</LogoDescription>
              </a>
            </Link>
          </Logo>

          <Nav color={color.color} />
        
        </MainNav>

        </Navigation>
      </InnerHeader>
    </HeaderWrapper>
  )
}
