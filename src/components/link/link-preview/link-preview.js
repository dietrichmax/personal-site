import Link from "next/link"
import styled from "styled-components"
import media from "styled-media-query"
import PostTags from "src/components/tags/tags"
import Date from "src/components/date/date"
import HCard from "src/components/microformats/h-card"
import config from "src/data/internal/SiteConfig"
import PostMeta from "src/components/post/post-meta/post-meta-preview"
import { Card } from "@/styles/templates/card"

const LinkContainer = styled.div`
  padding: 0.5rem 1rem 0 1rem;
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
  border-bottom: 1px solid var(--secondary-color);
  cursor: pointer;
  font-family: var(--secondary-font);
  font-style: italic;
  :hover {
    border-bottom: none;
  }
`

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
        <PostTags tags={link.tags} />
        <PostMeta post={link} slug={slug} />
      </LinkContainer>
    </Card>
  )
}
