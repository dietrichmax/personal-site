import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import Link from 'next/link'
import React, { useState, useEffect } from "react"
import { format } from 'date-fns'
import media from 'styled-media-query';
import { push } from "@socialgouv/matomo-next";
// styled components

const FooterContainer = styled.footer`
  padding: var(--space-lg) var(--space) var(--space-lg) var(--space);
  border-top: 1px solid var(--secondary-color);
  margin: 0 auto;
  font-size: 0.75em;
  max-width: 1200px;
`;

const FooterInnerContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;

  ${media.lessThan('medium')`  
    flex-wrap: wrap;
  `}
`

const FooterItem = styled.div`
  flex: 0 0 auto;
  padding-right: calc(var(--space-lg)*2);
  margin: 0;

  ${media.lessThan('medium')` 
  padding: 0 var(--space);
  margin-bottom: var(--space-sm);
  flex-basis: 50%;
  `}
`

const FooterItemTitle = styled.p`
  font-weight: bold;
`

const FooterItemLink = styled(Link)`
  font-weight: regular;
  :hover { 
    color: var(--gray-extra-light);
  }
`

const FooterDetail = styled.div`
  margin-left: auto;
  padding-right: 0;
  text-transform: lowercase;
  
  ${media.lessThan('medium')` 
    padding: 0 var(--space);
    margin-bottom: var(--space-sm);
    flex-basis: 50%;
  `}
`
const Heart = styled.i`
  color: transparent;  
  text-shadow: 0 0 0 var(--thirdy-color);
`

const FooterSocials = styled.div`  
  margin-left: auto;
  padding-right: 0 !important;
  ${media.lessThan('medium')` 
    margin: var(--space-sm) auto;
`}
`

const FooterIcons= styled.i`    
  cursor: pointer;
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  margin-right: var(--space);
  color: var(--text-color);
  font-size: 20px;
`

export default function Footer() {





  return (
    <FooterContainer>
      <FooterInnerContainer>

        <FooterItem>
          <FooterItemLink href="/mailinglist" title="Max Dietrich">Mailing</FooterItemLink>
        </FooterItem>

        
        <FooterItem>
          <FooterItemLink href="/privacy" title="Privacy Policy">Privacy Policy</FooterItemLink>
        </FooterItem>

        <FooterItem>
          <FooterItemLink href="/blogroll" title="Privacy Policy">Blogroll</FooterItemLink>
        </FooterItem>

        <FooterItem>
          <FooterItemLink href="/site-stats" title="Privacy Policy">Stats</FooterItemLink>
        </FooterItem>

        <FooterDetail>
          <Link className="p-name u-url" href="/about" title="About"><FooterItemTitle>Made with <Heart className="lar la-heart"></Heart></FooterItemTitle></Link>
        </FooterDetail>
        

        <FooterSocials className="h-card">
          <Link rel="me" href={config.socials.twitter} passHref><FooterIcons className="lab la-twitter" title="Twitter" /></Link>
          <Link rel="me" href={config.socials.github} passHref><FooterIcons className="lab la-github" title="GitHub" /></Link>
          <Link rel="me" href={config.socials.instagram} passHref><FooterIcons className="lab la-instagram" title="Instagram" /></Link>
          <Link rel="me" href={config.socials.mail} passHref><FooterIcons className="las la-envelope" title="Mail" /></Link>
          <a href={config.siteRss} title="Feed"><FooterIcons className="las la-rss"/></a>
        </FooterSocials>
      </FooterInnerContainer>
    </FooterContainer>
  )
}

