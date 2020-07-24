import styled from 'styled-components';
import media from 'styled-media-query';
import LocalizedLink from '../LocalizedLink';
import { Link } from 'gatsby';

export const Navigation = styled.nav`
margin-top: 20px;

  ${media.greaterThan('medium')`
    align-items: center;
    justify-content: center;
  `}
`;

export const NavigationLink = styled(LocalizedLink)`
  color:  var(--text-dark);
  transition: 0.2s;
  font-weight: 500;
  :hover {
    color: var(--text-light);
  }  
`;

export const NavigationButton = styled(Link)`
  background: var(--primary-color);
  border-radius: 2px;
  color: #fff;
  padding: var(--space-sm) var(--space);
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  ${media.greaterThan('medium')`
    margin-left: var(--space-lg);
  `}
`;
