import Link from "next/link"
import dynamic from 'next/dynamic'
import styled from "styled-components"
import media from "styled-media-query"
import PostTags from "src/components/tags/tags"
import Date from "src/components/date/date"
import HCard from "src/components/microformats/h-card"
import config from "src/data/internal/SiteConfig"
import { Card } from "@/styles/templates/card"

const LinkContainer = styled.div`
  padding: var(--space-sm) var(--space);
`

const LinksTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: calc(var(--space-sm) * 0.5);
  :hover {
    text-decoration: underline;
  }
`

const LinksContent = styled.p`
  margin: calc(var(--space-sm) * 0.5) 0;
  max-width: 700px;
  font-family: var(--secondary-font);
  font-size: 0.875rem;
  line-height: 1.5;
  font-family: var(--secondary-font);
`

const LinkLink = styled.a`
  font-size: 14px;
  cursor: pointer;
  font-family: var(--secondary-font);
  text-decoration: none;
  box-shadow: 0px -3px 0px 0px var(--secondary-color) inset;
  transition: box-shadow 150ms ease-in-out;
  :hover {
    box-shadow: 0px -16px 0px 0px var(--secondary-color) inset;
  }
`

const DynamicPostMeta = dynamic(() => import("src/components/post/post-meta/post-meta-preview"), {
  loading: () => <p>Loading...</p>,
})

export default function LinkPreview({ link }) {
  const slug = `/links/${link.slug}`

  return (
    <Card title={link.title} className="h-entry">
      <LinkContainer>
        <HCard />
        <LinksTitle className="p-name">
          <Link href={slug} title={link.title} legacyBehavior>
            {link.title}
          </Link>
        </LinksTitle>
        <LinkLink
          className="u-bookmark-of bookmark-of bookmark h-cite"
          href={link.link}
          title={link.title}
        >
          {link.link}
        </LinkLink>
        <LinksContent className="e-content">{link.description}</LinksContent>
        {/*<PostTags tags={link.tags} />*/}
        <DynamicPostMeta post={link} slug={slug} />
      </LinkContainer>
    </Card>
  )
}
