import React from 'react';
import useTranslations from '../useTranslations';

import * as S from './styled';

const Languages = () => {

  const { german, english} = useTranslations();

  return (
    <S.LanguageWrapper>
      <S.LanguageItem>
        <S.LanguageLink to="/">
          {german}
        </S.LanguageLink>
      </S.LanguageItem>
      <S.LanguageItem>
        <S.LanguageLink to="/en">
          {english}
        </S.LanguageLink>
      </S.LanguageItem>
    </S.LanguageWrapper>
  );
};

export default Languages;
