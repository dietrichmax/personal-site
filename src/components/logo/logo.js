import styled from "styled-components"
import Link from "next/link"
import media from "styled-media-query"
import React from "react"
import config from "@/src/data/internal/SiteConfig"

const LogoWrapper = styled.div`
  grid-column: span 2 / span 2;
  display: inline-block;
  line-height: 1.25;
  margin: 0;
  display: flex;
  ${media.lessThan("small")`
  font-size: 1rem;
`}
`
const LogoName = styled.span`
  font-weight: 700;
`
const LogoDescription = styled.span``

export default function Logo({}) {
  return (
    <LogoWrapper>
      <Link rel="home" href="/" passHref>
        <a className="u-url" rel="me" title={config.siteTitleAlt}>
          <LogoName className="p-name">{config.siteTitleAlt}</LogoName>
          <br />
          <LogoDescription>{config.siteSubtitle}</LogoDescription>
        </a>
      </Link>
    </LogoWrapper>
  )
}
