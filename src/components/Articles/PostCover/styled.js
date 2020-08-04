import styled from 'styled-components';
import Img from 'gatsby-image';
import media from 'styled-media-query';

export const PostCoverImg = styled(Img)`
  margin-top: 60px;
  height: 150px;
  ${media.greaterThan('small')`
    display: block;
    height: 350px;
    max-width: 100%;
  `}
`;

