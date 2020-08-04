import React from 'react';
import useMenu from './useMenu';
import useTranslations from '../useTranslations';
import SocialLinks from '../SocialLinks/SocialLinks.js';
import PageLinks from '../FooterNavigation';
import * as S from './styled';

const Navigation = ({ isActive, handleToggleMenu }) => {
  const menuHeaderItems = useMenu();
  const { button } = useTranslations();

  return (
    <>
      <S.Navigation className={isActive ? 'active' : ''}>
        {menuHeaderItems.map(menu => (
            <S.NavigationLink
              to={menu.link}
              aria-label={menu.name}
              activeClassName="active"
              onClick={() => handleToggleMenu()}>
              {menu.name}
            </S.NavigationLink>
        ))}
      </S.Navigation>
    </>
  );
};

export default Navigation;