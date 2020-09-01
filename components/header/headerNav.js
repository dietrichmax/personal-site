import styled from 'styled-components'
import Link from 'next/link'
import config from "../../data/SiteConfig";

const HeaderWrapper = styled.div`
  width: 100%

`
const HeaderItem = styled(Link)`

`

export default function Alert({ preview }) {

  const headerItems = [
      { "name": config.siteTitle, "link":  config.homePath },
      { "name": "Blog", "link":"/blog" },
      { "name": "Jobbörse", "link":"/jobs" }
    ]

  return (
    <HeaderWrapper>
      
      {headerItems.map((item) => (
        <HeaderItem href={item.link}>
          <a>{item.name}</a>
        </HeaderItem>
      ))}
    </HeaderWrapper>
  )
}
