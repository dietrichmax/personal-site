import config from "../../data/SiteConfig";
import styled from 'styled-components';
import Logo from '../logo';
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons';
import React, { useState, useEffect } from "react"

// styled components
const FooterWrapper = styled.div`    
  background-color: #fff;
  border-top: 1px solid var(--gray-light);
  }
`;

const FooterContainer = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  display: flex;
  margin: var(--space);
  padding-bottom: var(--space);
  border-bottom: 1px solid var(--gray-light);
`;

const FooterLogo = styled.div`
  flex: 1 0 auto;
  color: #80868B;
`


const NavTitle = styled.div`
  display: flex;
  padding: var(--space-sm);
  margin-top: auto;
  margin-bottom: auto;
  color: var(--gray);
  font-size: 2rem;
  font-weight: 500;
`

const FooterSocials = styled.div`    
  text-align: center;
  flex: 1 0 auto;
  padding-top: var(--space);
  padding-bottom: var(--space-lg);
`

const FooterNav = styled.div`  
  flex: 0 1 auto;
  text-align: right;
  }
`

const FooterNavItem = styled.a`  
  display: block; 
  color: var(--gray);
  font-size: 1.5rem;
  padding-right: var(--space);
  margin-top: calc(var(--space-sm)*0.5);
  margin-bottom: calc(var(--space-sm)*0.5);
  :hover {
    color: var(--primary-color);
  }
`

const FooterSubNav = styled.div`  
  margin: var(--space) auto 0 auto; 
  text-align: center;
  letter-spacing: 0.5px;
  width: 100%;
  font-weight: 200;
`

const FooterSubNavItem = styled.a`  
  color: var(--gray);
  font-size: 1.5rem;
  padding: var(--space);
  :hover {
    color: var(--primary-color);
  }
`

export default function Footer() {

  const footerNavItems = [
    { "name": "Startseite", "link":  config.homePath },
    { "name": "Blog", "link":  "/blog" },
    { "name": "Jobbörse", "link":  "/jobs" },
    { "name": "Werben", "link":  "/werben" },
    { "name": "Über GIS-Netzwerk", "link":  "/ueber-gis-netzwerk" }
  ]

  const footerSubNavItems = [
    { "name": "Datenschutz", "link":  "/datenschutz" },
    { "name": "Impressum", "link":  "/impressum" },
    { "name": "Kontakt", "link":  "mailto:kontakt@gis-netzwerk.com" }
  ]


  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterLogo >
          <Logo />
        </FooterLogo>
        <FooterNav>
          {footerNavItems.map((item, i) => (
            <Link key={i} href={item.link} passHref>
              <FooterNavItem title={item.name}>{item.name}</FooterNavItem>
            </Link>
          ))}
        </FooterNav>

      </FooterContainer>

      <FooterSubNav>
        {footerSubNavItems.map((item, i) => (
          <Link key={i} href={item.link} passHref>
            <FooterSubNavItem title={item.name}>{item.name}</FooterSubNavItem>
          </Link>
      ))}

      </FooterSubNav>

      <FooterSocials>
        <SocialIcon url={config.socials.twitter} bgColor="var(--gray-light)" fgColor="var(--gray)" title="Twitter" style={{ height: 27, width: 27, margin: 'var(--space-sm)' }}/>
        <SocialIcon url={config.socials.github} bgColor="var(--gray-light)" fgColor="var(--gray)" title="GitHub" style={{ height: 27, width: 27, margin: 'var(--space-sm)' }}/>
        <SocialIcon url={config.socials.linkedin} bgColor="var(--gray-light)" fgColor="var(--gray)" title="Linkedin" style={{ height: 27, width: 27, margin: 'var(--space-sm)' }}/>
        <SocialIcon url={config.socials.instagram} bgColor="var(--gray-light)" fgColor="var(--gray)" title="Instagram" style={{ height: 27, width: 27, margin: 'var(--space-sm)' }}/>
      </FooterSocials>
    </FooterWrapper>
  )
}
