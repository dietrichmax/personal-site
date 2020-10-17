import config from "../../data/SiteConfig";
import styled from 'styled-components';
import Logo from '../logo';
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons';
import React, { useState, useEffect } from "react"
import { getAllPosts } from '@/lib/api/cms'
import { format } from 'date-fns'
import { Emojione } from "react-emoji-render"
import media from 'styled-media-query';
// styled components

const FooterContainer = styled.div`

`;

const FooterWrapper = styled.div`    
  background-color: var(--primary-color);
`;


const FooterTopContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

`


const FooterColumn = styled.div`
  margin: var(--space);
  width: 20%;
  color: var(--gray-light);
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

const FooterTitle = styled.h4`
  font-size: 1.75rem;
  margin-bottom: var(--space-sm);
  padding-bottom: calc(var(--space-sm)*0.5);
  border-bottom: 1px solid var(--gray);
`

const FooterColumnContent = styled.p`
`

const FooterSocials = styled.div`  
  padding-bottom: var(--space-lg);
`

const FooterNav = styled.ul`  
  list-style: none;
  padding: 0;
`

const FooterNavItem = styled.li`  
  transition: 0.2s;
  margin-bottom: calc(var(--space-sm)*0.4);
  :hover {
    color: var(--gray-extra-light);
  }
`

const FooterSubContainer = styled.div`  
  background-color: var(--gray-dark);
  color: var(--gray-light);
`

const FooterSubContainerContent = styled.div` 
  max-width: 1200px;  
  padding: var(--space-sm);
  margin: auto;
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  ${media.lessThan('medium')`
    display: block;
  `}
`

const FooterSubContainerContentLeft = styled.div`
  text-align: left;
  ${media.lessThan('medium')`
    text-align: center;
    margin-bottom: calc(var(--space-sm)*0.5);
  `}
`

const FooterSubContainerContentRight = styled.div`
  text-align: right;
  ${media.lessThan('medium')`
    text-align: center;
  `}
`

export default function Footer(newPosts) {

  //const posts = newPosts.slice(0, 5)

  const footerNavItems = [
    { "name": "About me", "link":  "/about-me" },
    { "name": "About this site", "link":  "/about-this-site" },
    { "name": "All Articles", "link":  "/articles" },
    { "name": "Site Stats", "link":  "/stats" },
    { "name": "Disclaimer", "link":  "/disclaimer" }
  ]


  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterContainer>
          <FooterTopContainer>
            <FooterColumn>
              <FooterTitle>I am Max Dietrich.</FooterTitle>
              <FooterColumnContent>
                I am currently working as Geodata-Manager at RIWA. I love to figure out how things work and documenting it on this site.
              </FooterColumnContent>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Recent Posts</FooterTitle>
              <FooterColumnContent>
                Posts

              </FooterColumnContent>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Good Stuff</FooterTitle>
              <FooterNav>
                {footerNavItems.map((item, i) => (
                  <FooterNavItem key={i} >
                    <Link href={item.link} passHref>
                      <a title={item.name}>{item.name}</a>
                    </Link>
                  </FooterNavItem>
                ))}
              </FooterNav>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Connect</FooterTitle>
              You can connect with me on:
              <FooterSocials>
                <SocialIcon url={config.socials.github} fgColor="#fff"  title="GitHub" style={{ height: 25, width: 25, margin: 'var(--space-sm)' }}/>
                <SocialIcon url={config.socials.linkedin} fgColor="#fff"  title="Linkedin" style={{ height: 25, width: 25, margin: 'var(--space-sm)' }}/>
                <SocialIcon url={config.socials.instagram} fgColor="#fff"  title="Instagram" style={{ height: 25, width: 25, margin: 'var(--space-sm)' }}/>
                <SocialIcon url="mailto:kontakt@gis-netzwerk.com" fgColor="#fff"  title="E-Mail" style={{ height: 25, width: 25, margin: 'var(--space-sm)' }}/>
              </FooterSocials>

            </FooterColumn>
          </FooterTopContainer>
        </FooterContainer>
      </FooterWrapper>
      <FooterSubContainer>
        <FooterSubContainerContent>
          <FooterSubContainerContentLeft>
            Copyright © {format(new Date(), "yyyy")} Max Dietrich. All Rights Reserved.
          </FooterSubContainerContentLeft>
          <FooterSubContainerContentRight>
          Made with ❤️ by MXD.
          </FooterSubContainerContentRight>
        </FooterSubContainerContent>
      </FooterSubContainer>
    </FooterContainer>
  )
}

export async function getInitialProps() {
  const newPosts = (await getAllPosts()) || []
  console.log(newPosts)
  return {
    revalidate: 86400,
    props: { newPosts },
  }
}

