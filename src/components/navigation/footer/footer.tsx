import { useState, useEffect } from "react"
import { config } from "@/src/data/internal/SiteConfig"
import styled from "styled-components"
import Link from "next/link"
import media from "styled-media-query"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaGithub } from "@react-icons/all-files/fa/FaGithub"
import { SiStrava } from "@react-icons/all-files/si/SiStrava"
import { Input } from "@/styles/templates/input"
import { Button } from "@/styles/templates/button"
import { fetchGET } from "@/src/utils/fetcher"
// styled components

const FooterContainer = styled.footer`
  padding: var(--space-sm) 0;
  margin: 0 auto;
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
  max-width: 1200px;
  border-top: 1px solid var(--content-bg);
  ${media.lessThan("medium")`
    padding: var(--space) 0 0 0;
    display: block;
  `}
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

const FooterNotice = styled.p`
  font-size: 0.75rem;
  grid-column: span 4 / span 4;
  margin-top: var(--space-sm);
`

const FooterLink = styled(Link)`
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
  padding-top: var(--space-sm);
  border-bottom: 1px solid var(--secondary-color);
  cursor: pointer;
  :hover {
    border-bottom: 1px solid transparent;
  }
`

export default function Footer() {
  const [search, setSearch] = useState<string>("")
  const [data, setData] = useState<any>({
    recentPosts: [],
    about: {},
  })

  async function getRecentPosts() {
    const data = await fetchGET("/api/cms")
    setData({
      recentPosts: data.recentPosts,
      about: data.about,
    })
  }

  useEffect(() => {
    getRecentPosts()
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
        </FooterBar>

        <FooterColumnWrapper>
          <FooterColumn>
            {data.about ? (
              <>
                <FooterColumnTitle>{data.about.intro}</FooterColumnTitle>
                <FooterColumnDescription>
                  <div children={data.about.bioShort} />
                  <Link href="/about" passHref legacyBehavior>
                    <AboutMeLink title="About me">Read more.</AboutMeLink>
                  </Link>
                </FooterColumnDescription>
              </>
            ) : null}
          </FooterColumn>

          <FooterColumn>
            <FooterColumnTitle>Elsewhere</FooterColumnTitle>
            <List>
              <FooterItem>
                <a
                  href={config.socials.linkedin}
                  title="Max Dietrich on Linkedin"
                >
                  <FaLinkedin /> Linkedin
                </a>
              </FooterItem>
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
            </List>
          </FooterColumn>

          <FooterColumnPosts>
            <FooterColumnTitle>Recent Articles</FooterColumnTitle>
            <List>
              {data.recentPosts
                ? data.recentPosts.map((post, i) => (
                    <FooterItem key={i}>
                      <Link href={post.slug} title={post.title}>
                        {post.title}
                      </Link>
                    </FooterItem>
                  ))
                : null}
            </List>
          </FooterColumnPosts>

          <FooterColumn>
            <List>
              {footerItems.map((item, i) => (
                <FooterItem key={i}>
                  <Link href={item.link} title={item.name}>
                    {item.name}
                  </Link>
                </FooterItem>
              ))}
            </List>
          </FooterColumn>
        </FooterColumnWrapper>

        <FooterNotice>
          Copyright © 2018 – {new Date().getFullYear()}
          <span> • </span>
          <Link href="/" title={config.siteTitleAlt}>
            {config.siteTitleAlt}
          </Link>
          <span> • </span>
          <FooterLink href="/privacy-policy" title="Privacy Policy">
            Privacy Policy
          </FooterLink>
          <span> • </span>
          <FooterLink href="/site-notice" title="Site Notice">
            Site Notice
          </FooterLink>
        </FooterNotice>
      </FooterInnerContainer>
    </FooterContainer>
  )
}
