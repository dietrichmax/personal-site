import React, { useState } from 'react';
import * as S from './styled';
import useTranslations from '../useTranslations';
import Languages from '../Languages';
import Navigation from '../FooterNavigation';
import SocialLinks from '../SocialLinks/SocialLinks.js';
import Logo from '../Logo';


const Footer = () => {

  const { home } = useTranslations();
  const [toggleMenu, setToggleMenu] = useState(false);

  function handleToggleMenu() {
    setToggleMenu(!toggleMenu);
  }

  return (
    <>
    <S.FooterWrapper>
      <S.FooterContainer>
        <S.LogoLink to="/" title={home} aria-label={home}>
          <Logo />
        </S.LogoLink>
        <S.FooterNav>      
          <Navigation isActive={toggleMenu} handleToggleMenu={handleToggleMenu} />
        </S.FooterNav>
          
        <S.FooterDivider>
        </S.FooterDivider>
        <S.FooterSocials>
          <SocialLinks/>
        </S.FooterSocials>
        
        <S.NavLanguages>
          <Languages />
        </S.NavLanguages>
        </S.FooterContainer>
      </S.FooterWrapper>
    </>
  );
};

export default Footer;
