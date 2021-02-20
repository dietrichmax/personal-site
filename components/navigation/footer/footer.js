import React, { useState, useEffect } from "react"
import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import Link from 'next/link'
import media from 'styled-media-query';
import { getAllPosts } from "@/lib/data/api/cms"
import { format } from 'date-fns'
// styled components

const FooterContainer = styled.footer`
  padding: var(--space-sm) var(--space);
  border-top: 1px solid var(--gray-light);
  margin: 0 auto;
  max-width: 1200px;

  ${media.lessThan('medium')`  
    flex-wrap: wrap;
    padding: var(--space-sm);
  `}
`;

const FooterInnerContainer = styled.nav`    
  grid-template-columns: repeat(4,minmax(0px,1fr));
  display: grid;
  ${media.lessThan('medium')`
    padding: 0;
    display: block;
  `}
`

const FooterMainNav = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  grid-column: span 4/span 4;
  font-size: 1rem;
  ${media.lessThan('medium')` 
    display: flex;
    justify-content: space-between;
  `}
`

const FooterMainNavItem = styled.li`
  margin-right: var(--space);
  display: inline-block;
  ${media.lessThan('medium')` 
    margin: 0;
  `}
`

const FooterMainNavLink = styled.a`
  padding: var(--space-sm) 0;
`

const FooterColumnWrapper = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  grid-column: span 4/span 4;
  max-width: 1200px;
  margin-top: var(--space);
  font-size: .875rem;
  grid-template-columns: repeat(4,minmax(0px,1fr));
  display: grid;
  ${media.lessThan('medium')`  
    display: block;
  `}
`
const FooterColumn = styled.li`
  width: auto;
  ${media.lessThan('medium')`  
    margin-bottom: var(--space);
  `}
`

const FooterColumnTitle = styled.p`
  font-weight: 600;
  margin-bottom: .5rem;
`

const FooterColumnDescription = styled.p`
  margin-bottom: var(--space);
`

const FooterSocials = styled.div`
margin-top: .75rem;
margin-bottom: .5rem;
`

const FooterItemSocials = styled.a`
  display: inline-block;
  cursor: pointer;
  margin-right: var(--space-sm);
  ${media.lessThan('medium')` 
  `}
`

const FooterItem = styled.p`
  margin-bottom: .5rem;
  ${media.lessThan('medium')` 
  `}
`
const FooterItemLink = styled(Link)`
  :hover { 
    color: var(--gray-extra-light);
  }
`

const FooterIcons = styled.i`  
  font-size: 1rem;
`

const FooterNotice = styled.p`
  font-size:.75rem;
  grid-column: span 4/span 4;
  margin-top: var(--space-sm);
`

const FooterLink = styled.a`
  color: var(--text-color);
  border-bottom: 1px solid var(--link-color);
  cursor: pointer;
`

export default function Footer() {

  const footerItems = [
    { 
      name: "Mailing",
      link: "/mailinglist" 
    },
    { 
      name: "Blogroll",
      link: "/blogroll" 
    },
    { 
      name: "Data",
      link: "/site-stats" 
    },
    { 
      name: "Webmention Endpoint",
      link: "/webmention" 
    },
  ]

  const headerItems = [
    { 
      name: "Home",
      link: "/" 

    },
    { 
      name: "Articles",
      link: "/articles" 
    },
    { 
      name: "Notes",
      link: "/notes" 
    },
    { 
      name: "Links",
      link: "/links" 
    },
    { 
      name: "About",
      link: "/about" 
    },
  ]
  
  return (
    <FooterContainer>

      <FooterInnerContainer>

        <FooterMainNav>
          {headerItems.map((item, i) => (
            <FooterMainNavItem>
              <FooterMainNavLink href={item.link} passHref><a title={item.name}>{item.name}</a></FooterMainNavLink >
            </FooterMainNavItem>
          ))}
        </FooterMainNav>

        <FooterColumnWrapper> 


        <FooterColumn>
            <FooterColumnTitle>Good Stuff</FooterColumnTitle>
            {footerItems.map((item, i) => (
              <FooterItem key={i}>
                <FooterItemLink href={item.link} passHref><a title={item.name}>{item.name}</a></FooterItemLink>
              </FooterItem>
              ))}
          </FooterColumn>


          <FooterColumn style={{gridColumn: 'span 3/span 3'}}>      
            <FooterColumnTitle>Subscribe</FooterColumnTitle>
            <FooterColumnDescription>
              You can subscribe to the RSS feeds for all <FooterLink href="/feed.xml" passHref><a title="Feed">content</a></FooterLink> or to individual feeds for <FooterLink href="/articles/feed.xml" passHref><a title="Articles-Feed">articles</a></FooterLink>, <FooterLink href="/notes/feed.xml" passHref><a title="Notes-Feed">notes</a></FooterLink>, and <FooterLink href="/links/feed.xml" passHref><a title="Links-Feed">links</a></FooterLink>.
            </FooterColumnDescription>
            
            <FooterSocials className="h-card">
            <FooterColumnTitle>Connect</FooterColumnTitle>
            <FooterItemSocials  rel="me" href={config.socials.twitter} title="@mxdietrich on Twitter">
              <FooterIcons className="lab la-twitter"/>
            </FooterItemSocials>
            <FooterItemSocials  rel="me" href={config.socials.github} title={config.socials.github} >
              <FooterIcons className="lab la-github" />
            </FooterItemSocials >
            <FooterItemSocials  rel="me" href={config.socials.mail} title="Write me a Mail" >
              <FooterIcons className="las la-envelope" />
            </FooterItemSocials >
            <FooterItemSocials  href={config.siteRss} title="Subscribe via RSS/Atom">
              <FooterIcons className="las la-rss" />
            </FooterItemSocials >  

            </FooterSocials>
          </FooterColumn>


        </FooterColumnWrapper> 

        <FooterNotice>
          2018–{format(new Date(), "yyyy")} <Link href="/">
            <a title={config.siteTitle}>{config.siteTitle}</a>
          </Link>
          <span> • </span>
          <Link href="/privacy-policy"> 
            <FooterLink title="Privacy Policy">Privacy Policy</FooterLink>
          </Link>
          <span> • </span>
          <Link href="/site-notice">
            <FooterLink title="Site Notice">Site Notice</FooterLink>
          </Link>
          <span> • </span>
          Made with <a href="https://nextjs.org/" title="Next.js">Next.js</a> and <a href="https://strapi.io/" title="Strapi">Strapi</a>.</FooterNotice>
      </FooterInnerContainer>
    </FooterContainer>
  )
}

