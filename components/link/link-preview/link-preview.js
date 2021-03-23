import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostTags from "@/components/tags/tags"
import Date from "@/components/date/date"
import HCard from "@/components/microformats/h-card"
import config from "@/lib/data/SiteConfig"
import PostMeta from '@/components/post/post-meta/post-meta'

const LinksContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`


const LinksItem = styled.li`
  background-color: var(--content-bg);
  padding: var(--space-sm);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  list-style: none;
  position: relative;
`

const LinksTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: calc(var(--space-sm)*0.5);
`

const LinksLink = styled.cite`
  font-size: 14px;
  border-bottom: 1px solid var(--link-color);
  cursor: pointer;
  font-family: var(--secondary-font);
  :hover {
    border-bottom: 1px solid transparent;
  }
`

const LinksContent = styled.p`
  margin: calc(var(--space-sm)*0.5) 0;
  max-width: 700px;
  font-family: var(--secondary-font);
  font-size: .875rem;
`

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

export default function LinkPreview({ link }) {

  const slug = `/links/${link.id}`

  return ( 
    <LinksItem title={link.title} className="h-entry">           
      <HCard /> 
      <LinksTitle className="p-name"><a href={link.link} title={link.title}>{link.title}</a></LinksTitle>
      <LinksLink><a className="u-bookmark-of h-cite" href={link.link} title={link.title}>{link.link}</a></LinksLink>
      <LinksContent className="e-content">{link.description}</LinksContent>
      <PostTags tags={link.tags} />
      <PostMeta post={link} slug={slug}/>
    </LinksItem>
  )
}
