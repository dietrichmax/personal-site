import React from 'react';
import useMenu from './useMenu';
import useTranslations from '../useTranslations';
import * as S from './styled';

const Navigation = ({ isActive, handleToggleMenu }) => {
  const menuFooterItems = useMenu();

  return (
    <>
      <S.Navigation className={isActive ? 'active' : ''}>
        {menuFooterItems.map(menu => (
          <p style={{margin:'1rem 0 1rem 0'}}>
            <S.NavigationLink
              to={menu.link}
              aria-label={menu.name}
              activeClassName="active"
              onClick={() => handleToggleMenu()}
              >
              {menu.name}
            </S.NavigationLink>
          </p>
        ))}
      </S.Navigation>
    </>
  );
};

export default Navigation;