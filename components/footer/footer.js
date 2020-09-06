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
  flex: 1 0 60%;
  color: #80868B;
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
  :hover {
    color: var(--primary-color);
  }
`


export default function Footer() {

  const footerItems = [
    { "name": "Jobbörse", "link":  "/jobs" },
    { "name": "Über GIS-Netzwerk", "link":  "/ueber-gis-netzwerk" },
    { "name": "Datenschutz", "link":  "/datenschutz" },
    { "name": "Impressum", "link":  "/impressum" },
    { "name": "Kontakt", "link":  "mailto:kontakt@gis-netzwerk.com" }
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
      <FooterSocials>
        <SocialIcon url={config.socials.twitter} bgColor="var(--gray-light)" fgColor="var(--gray)" title="Twitter" style={{ height: 27, width: 27, marginRight: 'var(--space)' }}/>
        <SocialIcon url={config.socials.github} bgColor="var(--gray-light)" fgColor="var(--gray)" title="GitHub" style={{ height: 27, width: 27, marginRight: 'var(--space)' }}/>
        <SocialIcon url={config.socials.linkedin} bgColor="var(--gray-light)" fgColor="var(--gray)" title="Linkedin" style={{ height: 27, width: 27, marginRight: 'var(--space)' }}/>
        <SocialIcon url={config.socials.instagram} bgColor="var(--gray-light)" fgColor="var(--gray)" title="Instagram" style={{ height: 27, width: 27, marginRight: 'var(--space)' }}/>
      </FooterSocials>
    </FooterWrapper>
  )
}
