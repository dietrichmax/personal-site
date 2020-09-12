import styled from 'styled-components'
import Link from 'next/link'
import config from "../../data/SiteConfig";
import media from 'styled-media-query';
import Logo from '../logo';
import React, { Component, useState } from 'react';
import ButtonMenu from './button';
import Navigation from './header-navigation';

const HeaderWrapper = styled.div`
  background-color: #fff;
  display: flex;
  font-family: var(--secondary-font);
  border-bottom: 1px solid var(--gray-light);

  ${media.lessThan('large')`
  top: 0;
  left: 0;
    position: sticky;
    width: 100%;
    z-index: 9999;
  `}
`

const NavTitle = styled.div`
  width: auto;
  padding: var(--space-sm);
  margin-top: calc(var(--space-sm)*0.4);
  margin-bottom: auto;
  color: var(--gray);
  font-size: 2rem;
`

const NavSection = styled.span`
  width: auto;
  padding-left: calc(var(--space-sm)*0.5);
  color: var(--gray);
  font-size: 2rem;
`


const HeaderLogo = styled.div`
  padding: var(--space-sm) 0 var(--space-sm) var(--space-lg);
  ${media.lessThan('large')`
    padding: var(--space-sm) 0 var(--space-sm) var(--space-sm);
  `}
`

const NavMenu = styled.div`
  margin: calc(var(--space-lg)*1.5) calc(var(--space-lg)*3) auto auto;
  ${media.greaterThan('medium')`
    margin: 0 var(--space) 0 auto;
    width: auto;
  `}
`;


export default function HeaderNav() {

  const [toggleMenu, setToggleMenu] = useState(false);

  function handleToggleMenu() {
    setToggleMenu(!toggleMenu);
  }


  return (
    <HeaderWrapper>

      <HeaderLogo >
        <Logo />
      </HeaderLogo>
          
        <NavTitle>
          <Link href={config.homePath}>
            <a title={config.siteTitle}>{config.siteTitle}</a>
          </Link>
        </NavTitle>

        <ButtonMenu
          handleClick={handleToggleMenu}
          isActive={toggleMenu}
        />
        <NavMenu>
          <Navigation isActive={toggleMenu} handleToggleMenu={handleToggleMenu} />
        </NavMenu>

    </HeaderWrapper>
  )
}
