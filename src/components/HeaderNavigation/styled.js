import styled from 'styled-components';
import media from 'styled-media-query';
import LocalizedLink from '../LocalizedLink';
import { Link } from 'gatsby';

export const Navigation = styled.nav`
  display: none;
  height: auto;
  flex-direction: column;
  margin-top: 2rem;
  &.active {
    display: flex;
  }
`;

export const NavigationLink = styled(LocalizedLink)`
  color:  var(--text-dark);
  text-decoration: none;
  position: relative;
  padding: 0 var(--space-sm);
  margin-bottom: var(--space-sm);
  font-weight: 500;
  
  :hover {
    color: var(--text-light);
  
  }
`;

export const NavigationButton = styled(Link)`
  background: var(--primary-color);
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  padding: var(--space-sm) var(--space);
  text-decoration: none;
  font-weight: bold;
  text-align: center;
`;