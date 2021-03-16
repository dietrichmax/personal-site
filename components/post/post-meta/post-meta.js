import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostTags from "@/components/tags/tags"
import { parseISO, format } from 'date-fns'
import HCard from "@/components/microformats/h-card"
import config from "@/lib/data/SiteConfig"

const NotesDate = styled.p`
  font-family: var(--secondary-font);
  margin-bottom: 0;
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
  font-size: 12px;
  width: 100%;
  padding: 0.125rem 0.5rem;
  background-color: var(--gray-light);
  mix-blend-mode: luminosity;
  ${media.lessThan('medium')`

  `}
`

export default function LinkPreview({ post }) {

  const date = post.updated_at ? post.updated_at  : post.created_at

  return ( 
    <NotesDate>
    <a title={post.title} href={`${config.siteUrl}/links/${link.id}`} className="u-url" rel="bookmark nofollow">                  
      <time className="dt-published" dateTime={date}>
        {format(parseISO(date), "E',' dd MMMM',' yyy HH:mm aaa")}
      </time>
    </a>
  </NotesDate>
  )
}
