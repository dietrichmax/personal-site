import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import useTranslations from '../../useTranslations';
import * as S from './styled';
import ViewCounter from "../ViewCounter/ViewCounter.js"



const PostItem = ({
  slug,
  category,
  date,
  timeToRead,
  title,
  image,
  layout,
  locale,
}) => {
  const { toRead } = useTranslations();


  return (
    <S.PostItemLink to={slug} alt={title} title={title}>
      <S.PostItemWrapper>
        <S.PostImageItemWrapper>
          <S.PostItemLayoutInfo>{layout}</ S.PostItemLayoutInfo>
            <S.PostItemImg
              fluid={image.childImageSharp.fluid}
              alt={title}
              title={title}
              fadeIn={false} 
              loading="eager"
              style={{objectFit:'cover'}}
            />
        </S.PostImageItemWrapper>
        <S.PostItemInfo>
          <S.PostItemTag background={category.color}>
            {category.id}
          </S.PostItemTag>
          <S.PostItemDate>
            {date} • {/*<ViewCounter id={slug} /> •*/} {timeToRead} min {toRead}
          </S.PostItemDate>
          <S.PostItemTitle>{title}</S.PostItemTitle>
          {/*<S.PostItemDescription>{description}</S.PostItemDescription>*/}
        </S.PostItemInfo>
      </S.PostItemWrapper>
    </S.PostItemLink>
    
  );
};

PostItem.propTypes = {
  slug: PropTypes.string.isRequired,
  background: PropTypes.string,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
};

export default PostItem;
