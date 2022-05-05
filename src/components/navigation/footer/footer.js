import React, { useState, useEffect } from "react"
import config from "src/data/internal/SiteConfig"
import styled from "styled-components"
import Link from "next/link"
import media from "styled-media-query"
import ReactMarkdown from "react-markdown"
import {
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaXing,
} from "react-icons/fa"
import { SiStrava } from "react-icons/si"
import { Input } from "@/styles/templates/input"
import { Button } from "@/styles/templates/button"
// styled components

const FooterContainer = styled.footer`
  padding: var(--space-sm) 0;
  ${media.lessThan("medium")`  
    flex-wrap: wrap;
    padding: var(--space-sm);
  `}
`

const FooterInnerContainer = styled.div`
  grid-template-columns: repeat(4, minmax(0px, 1fr));
  display: grid;
  margin: 0px auto;
  padding: var(--space) var(--space) 0 var(--space);
  max-width: var(--width-container);
  border-top: 1px solid var(--content-bg);
  ${media.lessThan("medium")`
    padding: var(--space) 0 0 0;
    display: block;
  `}
`

const FooterMainNav = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  font-size: 1rem;
  text-align: right;
  grid-column: span 1 / span 1;
  display: flex;
  justify-content: space-around;
  ${media.lessThan("medium")` 
    display: flex;
    justify-content: space-between;
    margin-top: var(--space-sm);
  `}
`

const FooterMainNavItem = styled.li`
  display: inline-block;
  transition: 0.2s;
  :hover {
    color: var(--thirdy-color);
    cursor: pointer;
  }
  ${media.lessThan("medium")` 
    margin: 0;
  `}
`

const FooterMainNavLink = styled.a`
  padding: var(--space-sm) 0;
`

const FooterColumnWrapper = styled.div`
  grid-column: span 4 / span 4;
  list-style: none;
  padding-inline-start: 0;
  max-width: 1200px;
  margin-top: var(--space);
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  ${media.lessThan("medium")`  
    display: block;
  `}
`
const FooterColumn = styled.nav`
  max-width: 25%;
  line-height: 1.25rem;
  ${media.lessThan("medium")`  
    margin-bottom: var(--space);
    max-width: 100%;
    border-bottom: 1px solid var(--content-bg);
    padding-bottom: var(--space-sm);
  `}
`

const FooterColumnPosts = styled.nav`
  max-width: 30%;
  line-height: 1.25rem;
  ${media.lessThan("medium")`  
    margin-bottom: var(--space);
    max-width: 100%;
    border-bottom: 1px solid var(--content-bg);
    padding-bottom: var(--space-sm);
  `}
`

const FooterColumnTitle = styled.p`
  font-weight: 600;
  margin-bottom: var(--space-sm);
`

const FooterColumnDescription = styled.div`
  margin-bottom: var(--space);
  line-height: 1.75;
`

const List = styled.ol`
  list-style: none;
  padding-inline-start: 0;
`

const FooterItem = styled.li`
  margin-bottom: var(--space-sm);
  transition: 0.2s;
  :hover {
    color: var(--secondary-color);
    cursor: pointer;
  }
`

const FooterItemLink = styled(Link)``

const FooterNotice = styled.p`
  font-size: 0.75rem;
  grid-column: span 4 / span 4;
  margin-top: var(--space-sm);
`

const FooterLink = styled.a`
  color: var(--text-color);
  border-bottom: 1px solid var(--secondary-color);
  cursor: pointer;
  :hover {
    border-bottom: 1px solid transparent;
  }
`

const FooterBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  gap: var(--space-sm);
  grid-column: span 4 / span 4;
  ${media.lessThan("medium")`  
    display: block;
  `}
`

const SearchWrapper = styled.div`
  font-family: var(--primary-font);
  grid-column: span 2 / span 2;
  height: var(--space);
`

const AboutMeLink = styled.a`
  border-bottom: 1px solid var(--secondary-color);
  cursor: pointer;
  :hover {
    border-bottom: 1px solid transparent;
  }
`

export default function Footer() {
  const [recentPosts, setRecentPosts] = useState([])
  const [about, setAbout] = useState([])
  const [search, setSearch] = useState("")

  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }

  useEffect(() => {
    let isSubscribed = true
    fetch("https://api.mxd.codes/posts?_sort=date:DESC", requestOptions)
      .then((response) => response.json())
      .then((data) => (isSubscribed ? setRecentPosts(data.slice(0, 4)) : null))
    fetch("https://api.mxd.codes/about", requestOptions)
      .then((response) => response.json())
      .then((data) => (isSubscribed ? setAbout(data) : null))
    return () => (isSubscribed = false)
  }, [])

  const footerItems = [
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "About this site",
      link: "/about-this-site",
    },
    {
      name: "Site Stats",
      link: "/stats",
    },
    {
      name: "Feeds",
      link: "/feeds",
    },
    {
      name: "Now",
      link: "/now",
    },
    {
      name: "Webmention Endpoint",
      link: "/webmention",
    },
    /*{ 
      name: "Blogroll",
      link: "/blogroll" 
    },*/
    {
      name: "Newsletter",
      link: "/newsletter",
    },
  ]

  return (
    <FooterContainer>
      <FooterInnerContainer>
        <FooterBar>
          <SearchWrapper>
            <Input
              type="text"
              name="search-website"
              id="search-website"
              aria-label="Search"
              value={search}
              label="search-input"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              type="button"
              name="search"
              id="search"
              aria-label="Search"
              onClick={() =>
                window.open(
                  `https://www.ecosia.org/search?q=site:${config.domain}+${search}`
                )
              }
              title="search"
            >
              Search
            </Button>
          </SearchWrapper>

          {/*<FooterMainNav>
            {headerItems.map((item, i) => (
              <FooterMainNavLink key={i}href={item.link} passHref><a title={item.name}>{item.name}</a></FooterMainNavLink >
            ))}
            </FooterMainNav>*/}
        </FooterBar>

        <FooterColumnWrapper>
          <FooterColumn>
            <FooterColumnTitle>{about.intro}</FooterColumnTitle>
            <FooterColumnDescription>
              <ReactMarkdown children={about.bioShort} />
              <Link href="/about" passHref>
                <AboutMeLink title="About me">Read more.</AboutMeLink>
              </Link>
            </FooterColumnDescription>
          </FooterColumn>

          <FooterColumn>
            <FooterColumnTitle>Elsewhere</FooterColumnTitle>
            <List>
              <FooterItem>
                <a href={config.socials.twitter} title="@mxdietrich on Twitter">
                  <FaTwitter /> Twitter
                </a>
              </FooterItem>
              <FooterItem>
                <a
                  href={config.socials.instagram}
                  title="_maxdietrich on Instagram"
                >
                  <FaInstagram /> Instagram
                </a>
              </FooterItem>
              <FooterItem>
                <a href={config.socials.github} title="DaTurboD on GitHub">
                  <FaGithub /> Github
                </a>
              </FooterItem>
              <FooterItem>
                <a href={config.socials.strava} title="Max Dietrich on Strava">
                  <SiStrava /> Strava
                </a>
              </FooterItem>
              {/*<FooterItem>
                <a href={config.socials.steam} title="Max Dietrich on Steam"><FaSteam/> Steam/</a>
              </FooterItem>*/}
              <FooterItem>
                <a href={config.socials.xing} title="Max Dietrich on Xing">
                  <FaXing /> Xing
                </a>
              </FooterItem>
              <FooterItem>
                <a
                  href={config.socials.linkedin}
                  title="Max Dietrich on Linkedin"
                >
                  <FaLinkedin /> Linkedin
                </a>
              </FooterItem>
            </List>
          </FooterColumn>

          <FooterColumnPosts>
            <FooterColumnTitle>Recent Articles</FooterColumnTitle>
            <List>
              {recentPosts.map((post, i) => (
                <FooterItem key={i}>
                  <FooterItemLink href={`/articles/${post.slug}`} passHref>
                    <a title={post.title}>{post.title}</a>
                  </FooterItemLink>
                </FooterItem>
              ))}
            </List>
          </FooterColumnPosts>

          <FooterColumn>
            <List>
              {footerItems.map((item, i) => (
                <FooterItem key={i}>
                  <FooterItemLink href={item.link} passHref>
                    <a title={item.name}>{item.name}</a>
                  </FooterItemLink>
                </FooterItem>
              ))}
            </List>
          </FooterColumn>
        </FooterColumnWrapper>

        <FooterNotice>
          © 2018 – {new Date().getFullYear()}
          <span> • </span>
          <Link href="/">
            <a title={config.siteTitleAlt}> {config.siteTitleAlt}</a>
          </Link>
          <span> • </span>
          <Link href="/privacy-policy" passHref>
            <FooterLink title="Privacy Policy">Privacy Policy</FooterLink>
          </Link>
          <span> • </span>
          <Link href="/site-notice" passHref>
            <FooterLink title="Site Notice">Site Notice</FooterLink>
          </Link>
        </FooterNotice>
      </FooterInnerContainer>
    </FooterContainer>
  )
}
