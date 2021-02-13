import styled from 'styled-components'
import Link from 'next/link'
import Image from "next/image"
import config from "../../lib/data/SiteConfig";
import media from 'styled-media-query';
import React, { useState, useEffect, useContext } from "react";
import ButtonMenu from './button';
//import ThemePicker from "@/components/themes/themePicker";

import { push } from "@socialgouv/matomo-next";

const HeaderWrapper = styled.header`
  display: flex;
  max-width: 1200px;
  margin: auto;
  padding: var(--space-sm) var(--space);
  ${media.greaterThan('medium')`
    margin: var(--space-lg) auto;
  `}
`


const NavMenu = styled.nav`
  position: relative;
  top: 60px;
  ${media.greaterThan('medium')`
    margin: 0 var(--space) 0 auto;
    width: auto;
    top: 0;
  `}
`;

const Navigation = styled.nav`
  display: none;
  height: 100vh;
  flex-direction: column;
  &.active {
    display: flex;
  }
  ${media.greaterThan('medium')`
    padding-top: var(--space-sm);
    display: flex;
    height: auto;
    flex-direction: row;
    align-items: center;
  `}
`;

const NavigationLink = styled.a`
  margin-left: var(--space);
  font-size: 1.7rem;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    color: var(--link-color-hover);
  }
`;

const NavigationButton = styled.a`
  background: var(--primary-color);
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  padding: var(--space-sm) var(--space);
  text-decoration: none;
  text-align: center;
  ${media.greaterThan('medium')`
    margin-left: var(--space-lg);
  `}
`;


const HeaderBrand = styled.a`
  display: flex;
  align-items: center;
  color: inherit;
  :hover {
    display: cursor;
  }
`

const HeaderBrandImg = styled(Image)`
  border-radius: 50%;
`

const HeaderBrandText = styled.span`
  margin-left: var(--space-sm);
  font-weight: 700;
`
export default function HeaderNav() {

  const [toggleMenu, setToggleMenu] = useState(false);


  function handleToggleMenu() {
    setToggleMenu(!toggleMenu);
  }

  const headerItems = [
    
    { "name": "Home", "link":  "/" },
    { "name": "Articles", "link":  "/articles" },
    { "name": "Notes", "link":  "/notes" },
    { "name": "Statistics", "link":  "/site-stats" },
    { "name": "About", "link":  "/about" },
  ]


  return (
    <HeaderWrapper>

     {/*} <HeaderLogo >
        <Logo />
  </HeaderLogo>*/}
          
          <Link href={config.homePath} passHref>
            <HeaderBrand 
              title="mxd.codes"
              aria-label="Go To Homepage"
            >
              <HeaderBrandImg
                src="https://api.mxd.codes/uploads/13248880_1549733958655108_1942312651_a_a25f8b8c84.jpg?469206" 
                alt="" 
                width="48" 
                height="48" 
              />
            <HeaderBrandText>Max Dietrich</HeaderBrandText>
           </HeaderBrand>
          </Link>



        <ButtonMenu
          handleClick={handleToggleMenu}
          isActive={toggleMenu}
        />
        <NavMenu>

          <Navigation className={toggleMenu ? 'active' : ''}>
            {headerItems.map((menu, i) => (
              <Link key={i} href={menu.link} passHref>
                <NavigationLink
                  aria-label={menu.name}
                  title={menu.name}
                  activeClassName="active"
                  onClick={() => handleToggleMenu()}
                >
                {menu.name}
                </NavigationLink>
              </Link>
            ))}
          </Navigation>
          
        </NavMenu>
       

    </HeaderWrapper>
  )
}
