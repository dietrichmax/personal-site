import styled from 'styled-components'
import Link from 'next/link'
import Image from "next/image"
import config from "@/lib/data/SiteConfig";
import media from 'styled-media-query';
import ActiveLink from "@/components/navigation/active-link"
import React, { useState, useEffect, useContext } from "react";
//import ThemePicker from "@/components/themes/themePicker";

import { push } from "@socialgouv/matomo-next";

const HeaderWrapper = styled.header`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`

const InnerHeader = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--space);
  padding: var(--space-sm) var(--space);
  height: 80px;
  ${media.lessThan('medium')`
    padding: var(--space-sm);
  `}
`

const Navigation = styled.nav`
  position: relative;
  width: 100%;
  float: left;
  right: 0;
  padding: 0;
  font-size: 18px;
  text-align: right;
  border-bottom-style: none;
  color: ${props => (props.color ? `${props.color}`  : "var(--text-color)")};
`

const MainNav = styled.ul`
  text-align: justify;
  list-style-type: none;
  padding-inline-start: 0;
  display: flex;
  ${media.lessThan('medium')`
    display: block;
  `}
`

const Logo = styled.li`
  flex: 60%;
  display: inline-block;
  :hover {
    color: ${props => (props.color ? `#fff`  : "var(--text-color-hover)")}
  }
  ${media.lessThan('small')`
    font-size: 1rem;
  `}
`

const NavItems = styled.li`
  flex: 50%;
  display: flex;
  justify-content: space-between;
  ${media.lessThan('medium')`
    margin-top: var(--space-sm);
  `}
`


const NavItem = styled.li`
  margin-top: auto;
  margin-left: var(--space-sm);
  :hover { 
    color: ${props => (props.color ? `#fff`  : "var(--text-color-hover)")}
    text-decoration: none;
    background-image: linear-gradient(var(--thirdy-color),var(--thirdy-color));
    background-size: 100% 1px;
    background-position: 0 100%;
    background-repeat: no-repeat;
  }
  .active {
    font-weight: 600;
  }
  ${media.lessThan('medium')`
    margin-left: 0;
  `}
  
  ${media.lessThan('small')`
    font-size: 1rem;
  `}
`


export default function Header( color ) {


  const headerItems = [
    { "name": "Articles", "link":  "/articles" },
    { "name": "Notes", "link":  "/notes" },
    { "name": "Links", "link":  "/links" },
    { "name": "Data", "link":  "/site-stats" },
    { "name": "About", "link":  "/about" },
  ]


  return (
    <HeaderWrapper>
      
      <InnerHeader>
        <Navigation itemtype="https://schema.org/SiteNavigationElement" color={color.color}>

        <MainNav>

          <Logo color={color.color}>
            <a href="/" className="u-url" rel="me" title={config.siteTitle}>
            <strong className="p-name" >{config.siteTitle}</strong>
            <br/>
            GeoData Manager
            </a>
          </Logo>

          <NavItems>
            {headerItems.map((item, i) => (
                <NavItem className={i} color={color.color}>
                  <ActiveLink activeClassName={`active ${i}`} href={item.link}>
                    <a title={item.name}>{item.name}</a>
                  </ActiveLink> 
                </NavItem>
            ))}
          </NavItems>
        
        </MainNav>

        </Navigation>
      </InnerHeader>
    </HeaderWrapper>
  )
}
