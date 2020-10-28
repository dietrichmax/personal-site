import config from "../../lib/data/SiteConfig";
import styled from 'styled-components';
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons';
import React, { useState, useEffect } from "react"
import { getAllPosts } from '@/lib/data/api/cms'
import { format } from 'date-fns'
import media from 'styled-media-query';
import { darken } from 'polished';
// styled components

const FooterContainer = styled.div`
background-color: var(--primary-color);

`;

const FooterWrapper = styled.div`    
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
  color: var(--gray-light);
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

const FooterBioColumn = styled.div`
  margin: var(--space);
  width: 25%;
  color: var(--gray-light);
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

const FooterLinksColumn = styled.div`
  margin: var(--space);
  width: 15%;
  color: var(--gray-light);
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

const FooterConnectColumn = styled.div`
  margin: var(--space);
  width: 20%;
  color: var(--gray-light);
  ${media.lessThan('medium')`
    width: 100%;
  `}
`

const FooterTitle = styled.p`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: var(--space-sm);
  padding-bottom: calc(var(--space-sm)*0.5);
  border-bottom: 1px solid var(--secondary-color);
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
    color: var(--secondary-color);
  }
`

const FooterSubContainer = styled.div`  
  background-color: #040a0f;
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
    { "name": "About this site", "link":  "/about-this-site" },
    { "name": "About me", "link":  "/about-me" },
    { "name": "Disclaimer & Imprint", "link":  "/disclaimer-and-imprint" }
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
                    <Link key={i} href={`/articles/${item.slug}`}>
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
                <SocialIcon url={config.socials.github} fgColor="#fff"  title="GitHub" style={{ height: 25, width: 25, margin: 'var(--space-sm)' }}/>
                <SocialIcon url={config.socials.twitter} fgColor="#fff"  title="Twitter" style={{ height: 25, width: 25, margin: 'var(--space-sm)' }}/>
                <SocialIcon url={config.socials.linkedin} fgColor="#fff"  title="Linkedin" style={{ height: 25, width: 25, margin: 'var(--space-sm)' }}/>
                <SocialIcon url={config.socials.instagram} fgColor="#fff"  title="Instagram" style={{ height: 25, width: 25, margin: 'var(--space-sm)' }}/>
                <SocialIcon url="mailto:kontakt@gis-netzwerk.com" fgColor="#fff"  title="E-Mail" style={{ height: 25, width: 25, margin: 'var(--space-sm)' }}/>
              </FooterSocials>

            </FooterConnectColumn>
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

export async function getStaticProps() {
  const allPosts = (await getAllPosts()) || []
  
  return {
    revalidate:  86400,
    props: { allPosts },
  }
}

