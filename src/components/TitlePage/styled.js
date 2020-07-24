import styled from 'styled-components';
import media from 'styled-media-query';

export const TitleElement = styled.h1`
max-width: 800px;
margin: 2rem auto 2rem;
text-align: center;
font-weight: 600;
padding: .5rem;
line-height: 1.2;
font-size: 3rem;
  ${media.greaterThan('medium')`
    line-height: 1.1;
    font-size: 3.5rem;
  `}

  ${media.greaterThan('large')`
    line-height: 1.1;
    font-size: 4rem;
  `}
`;
