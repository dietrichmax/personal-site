import React from 'react';
import * as S from './styled';
import TitlePage from '../../TitlePage';

const CategoryHero = ({
  category
  
}) => {

  return (
      <div>
      <S.CategoryHeroContainer categoryColor={category.color}>
        <S.CategoryHeroTitle>
            <TitlePage text={category.id} />
        </S.CategoryHeroTitle>
        <S.CategoryHeroDescription>
            {category.description}
        </S.CategoryHeroDescription>
      </S.CategoryHeroContainer>
    </div>
  );
};

export default CategoryHero;
