import React from 'react';
import logo from '../../gis-netzwerk_favicon.png';
import * as S from './styled';
import useTranslations from '../useTranslations';


const Logo = () => {
  const { home } = useTranslations();

  return <S.LogoWrapper src={logo} alt={home} title={home}/>;
};

export default Logo;
