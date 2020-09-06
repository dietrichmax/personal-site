import config from "../../data/SiteConfig";
import styled from 'styled-components';
import Logo from '../logo';
import Link from 'next/link'
import React, { useState } from 'react';

// styled components
export const FooterWrapper = styled.div`    
  background-color: #fff;
  border-top: 1px solid var(--gray-light);
  height: 300px;
  }
`;

export const FooterContainer = styled.div`
  padding: 40px 40px;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  display: flex;
`;

export const FooterLogo = styled.div`
  flex: 1 0 60%;
  color: #80868B;
`

export const FooterRow = styled.div`
  width: 750px;
  margin: 20px auto 20px auto;    
`
export const FooterDivider = styled.div`
  width 100%;
  display: block;
  content: '';
  height: 1px;
  background-color: var(--gray-light);
`
export const FooterSocials = styled.div`    
  text-align: center;
  flex: 1 0 auto;
  margin-top: 25px;
`

export const FooterNav = styled.div`     
  flex: 0 1 auto;
  width: 200px;
  margin-bottom: 25px;
  color: #80868B;
  font-size: 1.5rem;
`


export const Copyright = styled.div`
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7); 
`


export default function Footer() {

  const [toggleMenu, setToggleMenu] = useState(false);

  function handleToggleMenu() {
    setToggleMenu(!toggleMenu);
  }

  return (
    <FooterWrapper>
      <FooterContainer>
        <Logo />
        
        <FooterNav>

        </FooterNav>
          
        <FooterDivider>
        </FooterDivider>

        <FooterSocials>
        </FooterSocials>

        </FooterContainer>
      </FooterWrapper>
  )
}
