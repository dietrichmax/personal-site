import styled from 'styled-components'
import Link from 'next/link'
import config from "../../data/SiteConfig";
import React, { Component } from 'react';
import media from 'styled-media-query';
import Logo from '../logo';

const HeaderWrapper = styled.div`
  background-color: #fff;
  display: flex;
  font-family:  open sans,sans-serif;
`

const NavTitle = styled.div`
  width: auto;
  padding: var(--space-sm);
  margin-top: auto;
  margin-bottom: auto;
  color: var(--gray);
  font-size: 2rem;
  font-weight: 500;

`

export const HeaderLogo = styled.div`
  padding: var(--space-sm) 0 var(--space-sm) var(--space-lg);
  ${media.lessThan('large')`
    padding: var(--space-sm) 0 var(--space-sm) var(--space-sm);
  `}
`




export default function HeaderNav() {



    
  const headerItems = [
    { "name": "Blog", "link":  "/" }
  ]

  return (
    <HeaderWrapper>

      <HeaderLogo >
        <Logo />
      </HeaderLogo>
      <NavTitle title={config.siteTitle} ><Link href="/"><a>GIS-Netzwerk</a></Link></NavTitle>
    </HeaderWrapper>
  )
}
