import styled from 'styled-components'
import Link from 'next/link'
import config from "../../data/SiteConfig";

const HeaderWrapper = styled.div`
  width: 100%

`

export default function HeaderNav() {

  const headerItems = [
      { "name": config.siteTitle, "link":  config.homePath }
    ]

  return (
    <HeaderWrapper>
      
      {headerItems.map((item, i) => (
        <Link key={i} href={item.link}>
          <a>{item.name}</a>
        </Link>
      ))}
    </HeaderWrapper>
  )
}
