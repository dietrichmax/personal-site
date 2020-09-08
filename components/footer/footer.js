import config from "../../data/SiteConfig";
import styled from 'styled-components';
import Logo from '../logo';
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons';

// styled components
const FooterWrapper = styled.div`    
  background-color: #fff;
  border-top: 1px solid var(--gray-light);
  }
`;

const FooterContainer = styled.div`
  padding: var(--space-lg);
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  display: flex;
  border-bottom: 1px solid var(--gray-light);
`;

const FooterLogo = styled.div`
  flex: 1 0 auto;
  color: #80868B;
`


const NavTitle = styled.div`
display: flex;
  padding: var(--space-sm);
  margin-top: auto;
  margin-bottom: auto;
  color: var(--gray);
  font-size: 2rem;
  font-weight: 500;
`

const FooterSocials = styled.div`    
  text-align: center;
  flex: 1 0 auto;
  padding-top: var(--space);
  padding-bottom: var(--space-lg);
`

const FooterNav = styled.div`     
  flex: 0 1 auto;
  }
`

const FooterNavItem = styled.p`     
  color: var(--gray);
  font-size: 1.5rem;
  padding-right: var(--space);
  margin-bottom: calc(var(--space-sm)*0.5);
  :hover {
    color: var(--primary-color);
  }
`

const FooterSubNav = styled.div`
  margin: var(--space) auto 0 auto; 
  text-align: center;
`

const FooterSubNavItem = styled.a`     
  color: var(--gray);
  font-size: 1.5rem;
  padding: var(--space);
  margin: var(--space-sm);
  :hover {
    color: var(--primary-color);
  }
`

export default function Footer() {

  const footerItems = [
    { "name": "Startseite", "link":  config.homePath },
    { "name": "Blog", "link":  "/blog" },
    { "name": "Jobbörse", "link":  "/jobs" },
    { "name": "Über GIS-Netzwerk", "link":  "/ueber-gis-netzwerk" }
  ]

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterLogo >
          <Logo />
        </FooterLogo>
        <FooterNav>
          {footerItems.map((item, i) => (
            <Link key={i} href={item.link}>
              <a><FooterNavItem>{item.name}</FooterNavItem></a>
            </Link>
          ))}
        </FooterNav>

      </FooterContainer>

      <FooterSubNav>
        <FooterSubNavItem><Link href="/datenschutz"><a>Datenschutz</a></Link></FooterSubNavItem>
        <FooterSubNavItem><Link href="/impressum"><a>Impressum</a></Link></FooterSubNavItem>
        <FooterSubNavItem><Link href="mailto:kontakt@gis-netzwerk.com"><a>Kontakt</a></Link></FooterSubNavItem>

      </FooterSubNav>

      <FooterSocials>
        <SocialIcon url={config.socials.twitter} bgColor="var(--gray-light)" fgColor="var(--gray)" title="Twitter" style={{ height: 27, width: 27, margin: 'var(--space-sm)' }}/>
        <SocialIcon url={config.socials.github} bgColor="var(--gray-light)" fgColor="var(--gray)" title="GitHub" style={{ height: 27, width: 27, margin: 'var(--space-sm)' }}/>
        <SocialIcon url={config.socials.linkedin} bgColor="var(--gray-light)" fgColor="var(--gray)" title="Linkedin" style={{ height: 27, width: 27, margin: 'var(--space-sm)' }}/>
        <SocialIcon url={config.socials.instagram} bgColor="var(--gray-light)" fgColor="var(--gray)" title="Instagram" style={{ height: 27, width: 27, margin: 'var(--space-sm)' }}/>
      </FooterSocials>
    </FooterWrapper>
  )
}
