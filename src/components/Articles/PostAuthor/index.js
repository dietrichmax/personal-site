import React from 'react';
import * as S from './styled';
import useTranslations from '../..//useTranslations';

const AuthorBox = ({
    authorMeta,
  }) => {

  const { WrittenBy } = useTranslations();

  return (
    <S.AuthorWrapper>
        <S.AuthorImg 
            fluid={authorMeta.profilepicture.childImageSharp.fluid}
            alt={authorMeta.id}
            title={authorMeta.id}
            fadeIn={false} 
            loading="eager"
            style={{objectFit:'cover'}}
        />
        <S.AuthorMeta>
          {WrittenBy} <a href={authorMeta.socials.website}>{authorMeta.id}</a>. 
            <br/>
            <S.AuthorBio>
              {authorMeta.bio}.
            </S.AuthorBio> 
        </S.AuthorMeta>
    </S.AuthorWrapper>
  );
};
    
export default AuthorBox