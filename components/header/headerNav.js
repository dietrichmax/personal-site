import styled from 'styled-components'
import Link from 'next/link'
import config from "../../data/SiteConfig";
import React, { Component } from 'react';
import media from 'styled-media-query';
import Logo from '../logo';

const HeaderWrapper = styled.div`
  background-color: #fff;
  display: flex;
  font-family: var(--secondary-font);
  border-bottom: 1px solid var(--gray-light);
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

const NavSection = styled.a`
  width: auto;
  padding-left: calc(var(--space-sm)*0.5);
  color: var(--gray);
  font-size: 2rem;
`


export const HeaderLogo = styled.div`
  padding: var(--space-sm) 0 var(--space-sm) var(--space-lg);
  ${media.lessThan('large')`
    padding: var(--space-sm) 0 var(--space-sm) var(--space-sm);
  `}
`




export default function HeaderNav( { section, link } ) {



    
  const headerItems = [
    { "name": "Blog", "link":  "/" }
  ]

  return (
    <HeaderWrapper>

      <HeaderLogo >
        <Logo />
      </HeaderLogo>
        {section? 
          <NavTitle title={config.siteTitle}>
            <Link href={link} passHref>
              <a title={`${section} | ${config.siteTitle}`}>
                {section}
                <NavSection>| {config.siteTitle}</NavSection>
              </a>
            </Link>
          </NavTitle> :
          <NavTitle title={config.siteTitle}>
            <Link href={config.homePath}>
              <a>{config.siteTitle}</a>
            </Link>
          </NavTitle>
        }
    </HeaderWrapper>
  )
}
