import styled from "styled-components"
import media from "styled-media-query"
import { parseISO, format } from "date-fns"
import config from "@/src/data/internal/SiteConfig"

const Meta = styled.div`
  font-family: var(--secondary-font);
  bottom: 1rem;
  left: 0;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  width: 100%;
  margin-top: var(--space-sm);
  background-color: var(--content-bg);
  ${media.lessThan("medium")`

  `}
`

const Date = styled.div`
  :hover {
    text-decoration: underline;
  }
`

const Socials = styled.div``

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
      <Date title={permaUrl} href={permaUrl} className="u-url" rel="bookmark">
        <time className="dt-published" dateTime={date}>
          {format(parseISO(date), config.dateFormat)}
        </time>
      </Date>
    </Meta>
  )
}
