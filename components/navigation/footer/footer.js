import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import Link from 'next/link'
import media from 'styled-media-query';
import Nav from "@/components/navigation/nav"
// styled components

const FooterContainer = styled.footer`
  padding: var(--space);
  border-top: 1px solid var(--secondary-color);
  margin: 0 auto;
  font-size: 1rem;
  max-width: 1200px;

  ${media.lessThan('medium')`  
    flex-wrap: wrap;
    padding: var(--space) var(--space-sm);
  `}
`;

const FooterInnerContainer = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  font-size: 1rem;

  ${media.lessThan('medium')`  
    flex-wrap: wrap;
  `}
`

const FooterItem = styled.div`
  flex: 0 0 auto;
  padding-right: calc(var(--space-lg)*2);
  margin: 0;

  ${media.lessThan('medium')` 
  padding: 0;
  margin-bottom: var(--space-sm);
  flex-basis: 50%;
  `}
`

const FooterItemTitle = styled.a`
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
    padding: 0;
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
  font-size: 1.25rem;
`

export default function Footer() {

  const footerItems = [
    { "name": "Mailing", "link":  "/mailinglist" },
    { "name": "Privacy Policy", "link":  "/privacy" },
    { "name": "Blogroll", "link":  "/blogroll" },
    { "name": "Data", "link":  "/site-stats" },
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


        <FooterDetail>
          <Link className="p-name u-url" href="/about" passHref><FooterItemTitle title="Feed">Made with <Heart className="lar la-heart"/></FooterItemTitle></Link>
        </FooterDetail>
        

        <FooterSocials className="h-card">
          <Link rel="me" href={config.socials.twitter} passHref><a title="Twitter"><FooterIcons className="lab la-twitter" /></a></Link>
          <Link rel="me" href={config.socials.github} passHref><a title="GitHub" ><FooterIcons className="lab la-github"/></a></Link>
          <Link rel="me" href={config.socials.instagram} passHref><a title="Instagram" ><FooterIcons className="lab la-instagram"/></a></Link>
          <Link rel="me" href={config.socials.mail} passHref><a title="Mail" ><FooterIcons className="las la-envelope"/></a></Link>
          <Link href={config.siteRss} passHref><a title="Feed"><FooterIcons className="las la-rss"/></a></Link>
        </FooterSocials>
      </FooterInnerContainer>
    </FooterContainer>
  )
}

