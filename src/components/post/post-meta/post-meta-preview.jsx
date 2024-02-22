import styled from "styled-components"
import media from "styled-media-query"
import { config } from "@/src/data/internal/SiteConfig"

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

const DateWrapper = styled.div`
  :hover {
    text-decoration: underline;
  }
`

export default function PostMeta({ post, slug }) {
  const env = process.env.NODE_ENV
  const postDate = new Date(post.updatedAt)
  const permaUrl =
    env == "development"
      ? `http://localhost:3000${slug}`
      : `${config.siteUrl}${slug}`

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  }
  return (
    <Meta>
      <DateWrapper
        title={permaUrl}
        href={permaUrl}
        className="u-url"
        rel="bookmark"
      >
        <time className="dt-published" dateTime={post.updated_at}>
          {postDate.toLocaleDateString("en-US", dateOptions)}
        </time>
      </DateWrapper>
    </Meta>
  )
}
