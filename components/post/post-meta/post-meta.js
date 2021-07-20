import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostTags from "@/components/tags/tags"
import { parseISO, format } from 'date-fns'
import HCard from "@/components/microformats/h-card"
import config from "@/lib/data/internal/SiteConfig"
import Webmentions from "@/components/social/webmentions/webmentions"

const Meta = styled.div`
  font-family: var(--secondary-font);
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: end;
  font-size: 11px;
  width: 100%;
  margin-top: var(--space-sm);
  background-color: var(--body-bg);
  ${media.lessThan('medium')`

  `}
`


const Date = styled.a`
  margin-left: auto;
  margin-right: var(--space-sm);
  :hover {
    text-decoration: underline;
  }
`

const Socials = styled.div`
`

const Breadcrumb = styled.div``

export default function PostMeta({ post, slug }) {

  const env = process.env.NODE_ENV
  const date = post.updated_at ? post.updated_at  : post.published_at ? post.published_at :post.created_at
  const permaUrl = env == "development" ? `http://localhost:3000${slug}` : `${config.siteUrl}${slug}`
  
  
  return ( 
    <Meta>
      <Breadcrumb>
      </Breadcrumb>
      <Socials>
        <Webmentions slug={slug} preview/>
      </Socials>

      <Date title={permaUrl} href={permaUrl} className="u-url" rel="bookmark nofollow">                  
        <time className="dt-published" dateTime={date}>
          {format(parseISO(date), config.dateFormat)}
        </time>
      </Date>
  </Meta>
  )
}
