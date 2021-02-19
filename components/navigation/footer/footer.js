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
    padding: var(--space-sm);
  `}
`;

const FooterInnerContainer = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  font-size: 1rem;
  justify-content: space-between;
  align-items: center;
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
    margin: var(--space-sm);
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
  height: 18px;
  width: 18px;
  vertical-align: middle;
  line-height: 12px;
  margin: var(--space-sm);
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
        

        <FooterSocials className="h-card">
          <Link rel="me" href={config.socials.twitter} passHref>
            <a title="@mxdietrich on Twitter">
              <FooterIcons>
                <svg width="15" height="15" viewBox="0 0 48 44" xmlns="http://www.w3.org/2000/svg">
                  <path d="M48 4.7c-1.8.8-3.7 1.4-5.7 1.6C44.3 5 46 3 46.7.7c-2 1.2-4 2-6.3 2.5C38.6 1.2 36 0 33.2 0c-5.4 0-9.8 4.5-9.8 10 0 1 0 1.7.2 2.4C15.6 12 8.2 8 3.3 1.8 2.5 3.3 2 5 2 6.8c0 3.6 1.7 6.7 4.4 8.5-1.6 0-3-.5-4.5-1.2v.2c0 5 3.3 9 7.8 10-.8 0-1.7.3-2.6.3-.6 0-1.2 0-1.8-.2 1.2 4 5 7 9.2 7C11.2 34 7 35.6 2.3 35.6H0C4.4 38.2 9.5 40 15 40c18.2 0 28-15.4 28-28.7V10c2-1.5 3.7-3.2 5-5.3" fill="#333333" fill-rule="evenodd"></path>
                </svg>
              </FooterIcons>
            </a>
          </Link>
          <Link rel="me" href={config.socials.github} passHref>
            <a title={config.socials.github} >
              <FooterIcons>
                <svg width="15" height="15" viewBox="0 0 48 46" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 0C10.7 0 0 10.7 0 24c0 10.6 7 19.6 16.4 22.8 1.2.2 1.7-.5 1.7-1.2v-4c-6.7 1.4-8-3.3-8-3.3-1.2-2.8-2.7-3.5-2.7-3.5-2.2-1.5 0-1.5 0-1.5 2.5.2 3.8 2.5 3.8 2.5 2.3 3.7 5.7 2.6 7 2 .3-1.5 1-2.6 1.6-3.2-5.3-.6-11-2.7-11-12 0-2.5 1-4.6 2.6-6.3-.3-.6-1-3 .2-6.3 0 0 2-.7 6.6 2.4 2-.5 4-.8 6-.8s4 .3 6 .8c4.6-3 6.6-2.4 6.6-2.4 1.3 3.3.5 5.7.2 6.3 1.6 1.7 2.5 3.8 2.5 6.4 0 9.3-5.6 11.3-11 12 1 .6 1.7 2 1.7 4.3v6.6c0 .7.4 1.4 1.6 1.2C41 43.6 48 34.6 48 24 48 10.7 37.3 0 24 0" fill="#333333" fill-rule="evenodd"></path>
                </svg>
              </FooterIcons>
            </a>
          </Link>
          <Link rel="me" href="mail@mxd.codes" passHref>
            <a title="Mail" >
              <FooterIcons>
                <svg width="15" height="15" viewBox="0 0 48 40" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44.5 30.3L32 18 44.6 5.7v24.6zm-39 2.4l12.6-12.3.6.5c3 2.7 7.7 2.7 10.5 0l.6-.6L42 32.7H5.7zm-2-27L15.7 18 3.4 30.3V5.7zM42 3.4L27 18.4c-1.6 1.6-4.3 1.6-6 0L5.7 3.4H42zM0 0v36h48V0H0z" fill="#333333" fill-rule="evenodd"></path>
                </svg>
              </FooterIcons>
            </a>
            </Link>
          <Link href={config.siteRss} passHref>
            <a title="Subscribe via RSS/Atom">
              <FooterIcons>
                <svg width="15" height="15" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M38.4 48C38.4 27 21 9.6 0 9.6V0c26.3 0 48 21.7 48 48h-9.6zM6.6 34.8c3.6 0 6.6 3 6.6 6.6 0 3.6-3 6.6-6.6 6.6C3 48 0 45 0 41.4c0-3.6 3-6.6 6.6-6.6zM31.8 48h-9.3c0-12.3-10.2-22.5-22.5-22.5v-9.3c17.5 0 31.8 14.3 31.8 31.8z" fill="#333333" fill-rule="evenodd"></path>
                </svg>
              </FooterIcons>
            </a>
          </Link>
        </FooterSocials>
      </FooterInnerContainer>
    </FooterContainer>
  )
}

