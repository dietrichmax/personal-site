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
  position: relative;
  width: 100%;
`

const InnerHeader = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--space);
  padding: var(--space-lg) var(--space);;
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
  text-align: right;
  border-bottom-style: none;
`

const MainNav = styled.ul`
  text-align: justify;
  list-style-type: none;
  padding-inline-start: 0;
  display: flex;
  font-size: 0.75em;
  ${media.lessThan('medium')`
    display: block;
  `}
`

const Logo = styled.li`
  flex: 50%;
  display: inline-block;
  line-height: 22px;
  :hover { 
    color: var(--link-color-hover);
  }
  ${media.lessThan('small')`
    font-size: 1em;
    margin-bottom: var(--space-sm);
  `}
`

const NavItems = styled.div`
  flex: 50%;
  display: flex;
  justify-content: space-between;
  ${media.lessThan('medium')`
    margin-top: var(--space-sm);
  `}
`


const NavItem = styled.li`
  margin-top: auto;
  line-height: 22px;
  :hover { 
    color: var(--link-color-hover);;
    text-decoration: none;
    background-image: linear-gradient(var(--thirdy-color),var(--thirdy-color));
    background-size: 100% 1px;
    background-position: 0 100%;
    background-repeat: no-repeat;
  }
  .active {
    font-weight: 600;
  }
  ${media.lessThan('small')`
    font-size: 1em;
  `}
`


export default function Header() {



  const headerItems = [
    { "name": "Articles", "link":  "/articles" },
    { "name": "Notes", "link":  "/notes" },
    { "name": "Links", "link":  "/about" },
    { "name": "Data", "link":  "/site-stats" },
    { "name": "About", "link":  "/about" },
  ]


  return (
    <HeaderWrapper>
      
      <InnerHeader>
        <Navigation itemtype="https://schema.org/SiteNavigationElement">

        <MainNav>

          <Logo>
            <a href="/" className="u-url" rel="me" title={config.siteTitle}>
            <strong className="p-name" >{config.siteTitle}</strong>
            <br/>
            GeoData Manager
            </a>
          </Logo>

          <NavItems>
            {headerItems.map((item, i) => (
                <NavItem className={i}>
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
