import React from 'react';
import * as S from './styled';
import { useStaticQuery, graphql } from 'gatsby';
import useTranslations from '../useTranslations';


const Logo = () => {

  const { home } = useTranslations();

  const data = useStaticQuery(graphql`
  {
    imageSharp(fixed: {originalName: {eq: "logo_square.png"}}) {
      fluid (maxWidth: 200, maxHeight: 200)  {
        src
        ...GatsbyImageSharpFluid_withWebp_noBase64
      }
    }
  }
`)

  return <S.LogoWrapper 
    fluid={data.imageSharp.fluid} 
    alt={home} 
    title={home}
    loading="eager"
    style={{objectFit:'cover'}}
  />;
};

export default Logo;

