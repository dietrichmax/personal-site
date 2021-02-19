import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import Link from 'next/link'
import media from 'styled-media-query';
import Nav from "@/components/navigation/nav"
// styled components

const FooterContainer = styled.footer`
  padding: var(--space-sm) var(--space);
  border-top: 1px solid var(--secondary-color);
  margin: 0 auto;
  max-width: 1200px;

  ${media.lessThan('medium')`  
    flex-wrap: wrap;
    padding: var(--space-sm);
  `}
`;

const FooterInnerContainer = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  font-size: .875rem;
  justify-content: space-between;
  align-items: center;
  ${media.lessThan('medium')`  
    display: block;
  `}
`

const FooterItem = styled.div`
  flex: 0 0 auto;
  padding-right: calc(var(--space-lg)*2);
  margin: 0;

  ${media.lessThan('medium')` 
    padding: 0;
    margin: 1.5rem 0;
  `}
`

const FooterItemLink = styled(Link)`
  font-weight: regular;
  :hover { 
    color: var(--gray-extra-light);
  }
`

const FooterSocials = styled.div`  
  ${media.lessThan('medium')` 
  margin: var(--space-sm) auto;
`}
`

const FooterIcons = styled.i`    
  display: inline-block;
  font-size: 1rem;
  vertical-align: middle;
  margin: var(--space-sm);
`

export default function Footer() {

  const footerItems = [
    { "name": "Mailing", "link":  "/mailinglist" },
    { "name": "Blogroll", "link":  "/blogroll" },
    { "name": "Data", "link":  "/site-stats" },
    { "name": "Privacy Policy", "link":  "/privacy" },
    { "name": "Site Notice", "link":  "/site-notice" },
  ]



  return (
    <FooterContainer>

      {/*<Nav />*/}

      <FooterInnerContainer>

        {footerItems.map((item, i) => (
          <FooterItem>
            <FooterItemLink href={item.link} passHref><a title={item.name}>{item.name}</a></FooterItemLink>
          </FooterItem>
          ))}
        

        <FooterSocials className="h-card">
          <Link rel="me" href={config.socials.twitter} passHref>
            <a title="@mxdietrich on Twitter">
              <FooterIcons className="lab la-twitter" title="Follow me on Twitter" />
            </a>
          </Link>
          <Link rel="me" href={config.socials.github} passHref>
            <a title={config.socials.github} >
              <FooterIcons className="lab la-github" />
            </a>
          </Link>
          <Link rel="me" href={config.socials.mail} passHref>
            <a title="Write me a Mail" >
              <FooterIcons className="las la-envelope" />
            </a>
            </Link>
          <Link href={config.siteRss} passHref>
            <a title="Subscribe via RSS/Atom">
              <FooterIcons className="las la-rss" />
            </a>
          </Link>
        </FooterSocials>
      </FooterInnerContainer>
    </FooterContainer>
  )
}

