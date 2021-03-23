import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostTags from "@/components/tags/tags"
import { parseISO, format } from 'date-fns'
import HCard from "@/components/microformats/h-card"
import config from "@/lib/data/SiteConfig"
import Webmentions from "@/components/social/webmentions/webmentions"

const Meta = styled.div`
  font-family: var(--secondary-font);
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: end;
  font-size: 12px;
  font-size: 12px;
  width: 100%;
  padding: 0.125rem 0.5rem;
  background-color: var(--gray-extra-light);
  mix-blend-mode: luminosity;
  ${media.lessThan('medium')`

  `}
`


const Date = styled.a`
  margin-left: auto;
  margin-right: var(--space-sm);
  text-decoration: underline;
  :hover {
    text-decoration: none;
  }
`

const Socials = styled.div`
  margin-left: var(--space-sm);
`

const Breadcrumb = styled.div``

export default function PostMeta({ post, slug }) {

  const date = post.updated_at ? post.updated_at  : post.published_at ? post.published_at :post.created_at
  const permaUrl = `${config.siteUrl}${slug}`

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
