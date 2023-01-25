import styled from "styled-components"
import media from "styled-media-query"
import ActiveLink from "src/components/navigation/active-link"

const NavItems = styled.ul`
  grid-column: span 1 / span 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-inline-start: 0;
  list-style: none;
  ${media.lessThan("medium")`
    margin-top: var(--space-sm);
  `}
`

const NavItem = styled.li`
  color: ${(props) => (props.color ? `${props.color}` : "color: var(--gray);")};
  padding-left: 0;
  :hover {
    text-decoration: none;
    background-image: linear-gradient(
      var(--secondary-color),
      var(--secondary-color)
    );
    background-size: 100% 1px;
    background-position: 0 100%;
    background-repeat: no-repeat;
  }
  .active {
    font-weight: 600;
  }
  ${media.lessThan("medium")`
    margin-left: 0;
  `}

  ${media.lessThan("small")`
    font-size: 1rem;
  `}
`

export default function Nav({ color }) {
  const headerItems = [
    { name: "Articles", link: "/articles" },
    { name: "Photos", link: "/photos" },
    { name: "Notes", link: "/notes" },
    { name: "Maps", link: "https://maps.mxd.codes" },
  ]

  return (
    <NavItems itemScope itemType="https://schema.org/SiteNavigationElement">
      {headerItems.map((item, i) => (
        <NavItem key={i} color={color}>
          <ActiveLink
            activeClassName={`active`}
            itemProp="url"
            href={item.link}
            passHref
          >
            <a title={item.name} itemProp="name">
              {item.name}
            </a>
          </ActiveLink>
        </NavItem>
      ))}
    </NavItems>
  )
}
