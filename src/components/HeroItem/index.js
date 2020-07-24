import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import useTranslations from '../useTranslations';
import * as S from './styled';
import { Link } from 'gatsby';
import ViewCounter from "../Articles/ViewCounter/ViewCounter.js"

const HeroItem = ({
  slug,
  category,
  date,
  timeToRead,
  title,
  description,
  image,
  locale,
  layout,
  
}) => {
  const { toRead } = useTranslations();

  return (
      <div>
      <S.HeroItemImgContainer>
          <S.HeroItemImg
            fluid={image.childImageSharp.fluid}
            alt={title}
            title={title}
            fadeIn={false} 
            loading="eager"
            style={{objectFit:'cover'}}
            categoryColor={category.color}
          />
        <S.HeroItemInfoContainer>
          <S.HeroItemInfo>
            <S.HeroItemCategoryLink to={`/${category.id.toLowerCase()}`}>
              <S.HeroItemTag background={category.color}>{category.id}</S.HeroItemTag>
            </S.HeroItemCategoryLink>
            <S.HeroLayoutTag layout={layout}>/ {layout}</S.HeroLayoutTag>
            <S.HeroItemDate>
              {date} {/*• <ViewCounter id={slug} /> */}• {timeToRead} min {toRead}
            </S.HeroItemDate>
            <S.HeroItemLink to={`/${slug}`}> <S.HeroItemTitle>{title}</S.HeroItemTitle></S.HeroItemLink>
            <S.HeroItemDescription>{description}</S.HeroItemDescription>
          </S.HeroItemInfo>
        </S.HeroItemInfoContainer>
      </S.HeroItemImgContainer>
    </div>
  );
};

export default HeroItem;
