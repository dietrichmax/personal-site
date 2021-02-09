import config from "../../lib/data/SiteConfig";
import styled from 'styled-components';
import Link from 'next/link'
import React, { useState, useEffect } from "react"
import { getAllPosts } from '@/lib/data/api/cms'
import { format } from 'date-fns'
import media from 'styled-media-query';
import { push } from "@socialgouv/matomo-next";
// styled components

const FooterContainer = styled.div`
  background-color: var(--secondary-color);
`;

const FooterWrapper = styled.div`    
  color: var(--gray);
`;


const FooterTopContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

`

const FooterPostColumn = styled.div`
  margin: var(--space);
  width: 25%;
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

const FooterBioColumn = styled.div`
  margin: var(--space);
  width: 25%;
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

const FooterLinksColumn = styled.div`
  margin: var(--space);
  width: 15%;
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

const FooterConnectColumn = styled.div`
  margin: var(--space);
  width: 20%;
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

const FooterTitle = styled.p`
  font-size: 1.75rem;
  font-weight: 200;
  margin-bottom: var(--space-sm);
  padding-bottom: calc(var(--space-sm)*0.5);
  border-bottom: 1px solid var(--primary-color);
`

const FooterColumnContent = styled.div`
`

const FooterSocials = styled.div`  
  padding-bottom: var(--space-lg);
`

const FooterNav = styled.ul`  
  list-style: none;
  padding: 0;
`

const FooterNavItem = styled.li`  
  cursor: pointer;
  transition: 0.2s;
  margin-bottom: calc(var(--space-sm)*0.5);
  :hover {
    color: var(--link-color-hover);
  }
`

const FooterSubContainer = styled.div`  
  background-color: var(--secondary-color);
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

const Heart = styled.i`
  color: transparent;  
  text-shadow: 0 0 0 var(--thirdy-color);
`

const FooterIcons= styled.i`    
  cursor: pointer;
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  margin: var(--space-sm);
  color: var(--text-color);
  font-size: 20px;
`

export default function Footer() {
  const [posts, setPosts] = useState("")

  useEffect(() => {
    async function getPosts() {
      const allPosts = await getAllPosts()
      setPosts(allPosts.slice(0,4))  
    }
    getPosts()
  }, []);
  
  
  const newPosts = []
  Object.entries(posts).forEach((post) => (
    newPosts.push({
    title: post[1].title,
    slug: post[1].slug,
    })
  ));
  
  const footerNavItems = [
    { "name": "All Articles", "link":  "/articles" },
    { "name": "Site Stats", "link":  "/site-stats" },
    { "name": "Privacy Policy", "link":  "/disclaimer-and-imprint" },
    { "name": "About me", "link":  "/about-me" },
    { "name": "About this site", "link":  "/about-this-site" }
  ]


  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterContainer>
          <FooterTopContainer>
            <FooterBioColumn>
              <FooterTitle>I am Max Dietrich.</FooterTitle>
              <FooterColumnContent>
                I am currently working as Geodata-Manager at RIWA. <br/> I love to experiment with web-applications which i am documenting on this site.
              </FooterColumnContent>
            </FooterBioColumn>

            <FooterPostColumn>
              <FooterTitle>Recent Articles</FooterTitle>
              <FooterColumnContent>
              <FooterNav>
                {newPosts.map((item, i) => (
                    <Link key={i} href={`/articles/${item.slug}`} passHref>
                      <FooterNavItem title={item.title}>{item.title}</FooterNavItem>
                    </Link>
                ))}
                </FooterNav>
              </FooterColumnContent>
            </FooterPostColumn>

            <FooterLinksColumn>
              <FooterTitle>Good Links</FooterTitle>
              <FooterNav>
                {footerNavItems.map((item, i) => (
                    <Link key={i} href={item.link} passHref>
                      <FooterNavItem title={item.name}>{item.name}</FooterNavItem>
                    </Link>
                ))}
              </FooterNav>
            </FooterLinksColumn>

            <FooterConnectColumn>
              <FooterTitle>Connect</FooterTitle>
              You can connect with me on:
              <FooterSocials>
                <Link href={config.socials.github} passHref><FooterIcons className="lab la-github" title="GitHub"/></Link>
                <Link href={config.socials.twitter} passHref><FooterIcons className="lab la-twitter" title="Twitter"/></Link>
                <Link href={config.socials.instagram} passHref><FooterIcons className="lab la-instagram" title="Instagram"/></Link>
                <Link href="mailto:kontakt@gis-netzwerk.com" passHref><FooterIcons className="las la-envelope" title="Mail"/></Link>
                <Link href={config.siteRss} passHref><FooterIcons className="las la-rss" title="RSS"/></Link>
              </FooterSocials>

            </FooterConnectColumn>
          </FooterTopContainer>
        </FooterContainer>
      </FooterWrapper>
      <FooterSubContainer>
        <FooterSubContainerContent>
          <FooterSubContainerContentLeft>
            © 2018-{format(new Date(), "yyyy")} <Link href={config.siteUrl} title="Max Dietrich"> Max Dietrich</Link>
          </FooterSubContainerContentLeft>
          <FooterSubContainerContentRight>
          Made with <Heart className="lar la-heart"></Heart> by MXD.
          </FooterSubContainerContentRight>
        </FooterSubContainerContent>
      </FooterSubContainer>
    </FooterContainer>
  )
}

