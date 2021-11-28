import Link from "next/link"
import styled from "styled-components"
import media from "styled-media-query"
import PostTags from "src/components/tags/tags"
import { parseISO, format } from "date-fns"
import HCard from "src/components/microformats/h-card"
import config from "src/data/internal/SiteConfig"
import Webmentions from "src/components/social/webmentions/webmentions"

const Meta = styled.div`
  font-family: var(--secondary-font);
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  width: 100%;
  margin-top: var(--space-sm);
  padding-top: calc(var(--space-sm) * 0.25);
  background-color: var(--body-bg);
  padding-left: var(--space-sm);
  padding-right: var(--space-sm);
  ${media.lessThan("medium")`

  `}
`

const Date = styled.a`
  margin-left: auto;
  :hover {
    text-decoration: underline;
  }
`

const Socials = styled.div``

const Breadcrumb = styled.div``

export default function PostMeta({ post, slug }) {
  const env = process.env.NODE_ENV
  const date = post.updated_at
    ? post.updated_at
    : post.published_at
    ? post.published_at
    : post.created_at
  const permaUrl =
    env == "development"
      ? `http://localhost:3000${slug}`
      : `${config.siteUrl}${slug}`

  return (
    <Meta>
      <Breadcrumb></Breadcrumb>
      <Socials>
        <Webmentions slug={slug} preview />
      </Socials>

      <Date title={permaUrl} href={permaUrl} className="u-url" rel="bookmark">
        <time className="dt-published" dateTime={date}>
          {format(parseISO(date), config.dateFormat)}
        </time>
      </Date>
    </Meta>
  )
}
