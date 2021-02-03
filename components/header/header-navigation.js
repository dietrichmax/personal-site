import styled from 'styled-components';
import media from 'styled-media-query';
import Link from 'next/link'

const Navigation = styled.nav`
  display: none;
  height: 100vh;
  flex-direction: column;
  &.active {
    display: flex;
  }
  ${media.greaterThan('medium')`
    padding-top: var(--space-sm);
    display: flex;
    height: auto;
    flex-direction: row;
    align-items: center;
  `}
`;

const NavigationLink = styled.a`
  margin-left: var(--space);
  font-size: 1.7rem;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    color: var(--link-color-hover);
  }
`;

const NavigationButton = styled.a`
  background: var(--primary-color);
  border-radius: 2px;
  color: #fff;
  display: inline-block;
  padding: var(--space-sm) var(--space);
  text-decoration: none;
  text-align: center;
  ${media.greaterThan('medium')`
    margin-left: var(--space-lg);
  `}
`;

const HeaderNavigation = ({ isActive, handleToggleMenu }) => {

  const headerItems = [
    { "name": "Articles", "link":  "/articles" },
    { "name": "Statistics", "link":  "/site-stats" }
  ]

  return (
    <>
      <Navigation className={isActive ? 'active' : ''}>
        {headerItems.map((menu, i) => (
            <Link key={i} href={menu.link} >
                <NavigationLink
                    aria-label={menu.name}
                    title={menu.name}
                    activeClassName="active"
                    onClick={() => handleToggleMenu()}>
                    {menu.name}
                </NavigationLink>
          </Link>
        ))}
        
      </Navigation>
    </>
  );
};

export default HeaderNavigation;
