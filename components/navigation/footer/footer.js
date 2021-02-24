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
  transition: 0.2s;
  :hover {
    color: var(--thirdy-color);
    cursor: pointer;
  }
  ${media.lessThan('medium')` 
    margin: 0;
  `}
`

const FooterMainNavLink = styled.a`
  padding: var(--space-sm) 0;
`

const FooterColumnWrapper = styled.ul`
  grid-column: span 4/span 4;
  list-style: none;
  padding-inline-start: 0;
  max-width: 1200px;
  margin-top: var(--space);
  font-size: .875rem;
  display: flex;
  justify-content: space-between;
  ${media.lessThan('medium')`  
    display: block;
  `}
`
const FooterColumn = styled.li`
  max-width: 25%;
  line-height: 1.25rem;
  ${media.lessThan('medium')`  
    margin-bottom: var(--space);
    max-width: 100%;
  `}
`

const FooterColumnPosts = styled.li`
  max-width: 30%;
  line-height: 1.25rem;
  ${media.lessThan('medium')`  
    margin-bottom: var(--space);
    max-width: 100%;
  `}
`

const FooterColumnTitle = styled.p`
  font-weight: 600;
  margin-bottom: .5rem;
`

const FooterColumnDescription = styled.p`
  margin-bottom: var(--space);
`

const FooterSocials = styled.ol`
  list-style: none;
  padding-inline-start: 0;

`

const FooterItemSocials = styled.li`
  margin-bottom: .5rem;
  :hover {
    color: var(--thirdy-color);
    cursor: pointer;
  }
`

const FooterItem = styled.p`
  margin-bottom: .5rem;
  transition: 0.2s;
  :hover {
    color: var(--thirdy-color);
    cursor: pointer;
  }
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
  const [recentPosts, setRecentPosts] = useState([])

  useEffect(() => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch('https://api.mxd.codes/posts', requestOptions)
        .then(response => response.json())
        .then(data => setRecentPosts(data.slice(0,4)));
  }, []);

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
            <FooterColumnTitle>I'm Max Dietrich.</FooterColumnTitle>
            <FooterColumnDescription>
            I currently work as a Geo-Data Manager at RIWA. I ride my mountain bike in the alps, code and design my website and publish new content whenever i can..
            </FooterColumnDescription>
          </FooterColumn>

          <FooterColumn>
            <FooterColumnTitle>Elswhere</FooterColumnTitle>
            <FooterSocials>
              <FooterItemSocials>
                <a href={config.socials.twitter} title="@mxdietrich on Twitter"><FooterIcons className="lab la-twitter"/> Twitter</a>
              </FooterItemSocials>
              <FooterItemSocials>
                <a href={config.socials.instagram} title="_maxdietrich on Instagram"><FooterIcons className="lab la-instagram"/> Instagram</a>
              </FooterItemSocials>
              <FooterItemSocials>
                <a href={config.socials.github} title="DaTurboD on GitHub"><FooterIcons className="lab la-github"/> Github</a>
              </FooterItemSocials>
              <FooterItemSocials>
                <a href={config.socials.linkedin} title="Max Dietrich on Linkedin"><FooterIcons className="lab la-linkedin"/> Linkedin</a>
              </FooterItemSocials>
              <FooterItemSocials>
                <a href={config.socials.mail} title="Write me a Email"><FooterIcons className="las la-envelope"/> Mail</a>
              </FooterItemSocials>
            </FooterSocials>
          </FooterColumn>
        
          <FooterColumnPosts>
            <FooterColumnTitle>Recent Articles</FooterColumnTitle>
            {recentPosts.map((post, i) => (
              <FooterItem key={i}>
                <FooterItemLink href={`articles/${post.slug}`} passHref><a title={post.title}>{post.title}</a></FooterItemLink>
              </FooterItem>
              ))}
          </FooterColumnPosts>

          <FooterColumn>
            <FooterColumnTitle>RSS Feeds</FooterColumnTitle>
              <FooterItem>
                <FooterItemLink href="/feed.xml" passHref><a title="All content Feed"><FooterIcons className="las la-rss"/> All content</a></FooterItemLink>
              </FooterItem>
              <FooterItem>
                <FooterItemLink href="/articles/feed.xml" passHref><a title="Articles Feed"><FooterIcons className="las la-rss"/> Articles</a></FooterItemLink>
              </FooterItem>
              <FooterItem>
                <FooterItemLink href="/notes/feed.xml" passHref><a title="Notes Feed"><FooterIcons className="las la-rss"/> Notes</a></FooterItemLink>
              </FooterItem>
              <FooterItem>
                <FooterItemLink href="/links/feed.xml" passHref><a title="Links Feed"><FooterIcons className="las la-rss"/> Links</a></FooterItemLink>
              </FooterItem>
          </FooterColumn>

          <FooterColumn>
            <FooterColumnTitle>Good Stuff</FooterColumnTitle>
            {footerItems.map((item, i) => (
              <FooterItem key={i}>
                <FooterItemLink href={item.link} passHref><a title={item.name}>{item.name}</a></FooterItemLink>
              </FooterItem>
              ))}
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

