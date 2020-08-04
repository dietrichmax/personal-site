import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import * as S from './styled';
import { Parallax } from 'react-scroll-parallax';

const PostCover = ({
  title,
  image,
  color
}) => {


  return (
      <div>
        <S.PostCoverImg
          fluid={image.childImageSharp.fluid}
          alt={title}
          title={title}
          fadeIn={false} 
          loading="eager"
          style={{objectFit:'cover'}}
          />
    </div>
  );
};


export default PostCover;
