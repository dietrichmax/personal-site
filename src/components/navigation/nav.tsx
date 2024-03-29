import styled from "styled-components"
import media from "styled-media-query"
import ActiveLink from "@/src/components/navigation/active-link"

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
  margin-left: var(--space);
  &:hover {
    text-decoration: none;
    background-image: linear-gradient(
      var(--primary-color),
      var(--primary-color)
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
    { name: "Home", link: "/" },
    { name: "Articles", link: "/articles" },
    { name: "Photos", link: "/photos" },
    { name: "Links", link: "/links" },
    { name: "About", link: "/about" },
    { name: "Uses", link: "/uses" },
  ]

  return (
    <NavItems itemScope>
      {headerItems.map((item, i) => (
        <NavItem key={i} color={color}>
          <ActiveLink activeClassName="active" href={item.link}>
            <a title={item.name} itemProp="name">
              {item.name}
            </a>
          </ActiveLink>
        </NavItem>
      ))}
    </NavItems>
  )
}
