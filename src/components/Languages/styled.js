import styled from 'styled-components';
import media from 'styled-media-query';
import { Link } from 'gatsby';

export const LanguageWrapper = styled.div`
  text-align: center;
  ${media.greaterThan('medium')`
    position: relative;
    top: 0;
    right: 0;
  `}
`;

export const LanguageItem = styled.a`
margin-right: 1rem;
outline: none;
`;

export const LanguageLink = styled(Link)`
  color:  var(--text-dark);
  font-weight: 500;
  display: inline-block;
  width: 75px;
  margin: 0 auto 10px auto;
  padding: 5px 0 5px 0;
  font-size: 1.4rem;
  :hover {
    color: var(--text-light);
  }  
`;
