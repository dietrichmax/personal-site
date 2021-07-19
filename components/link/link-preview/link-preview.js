import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostTags from "@/components/tags/tags"
import Date from "@/components/date/date"
import HCard from "@/components/microformats/h-card"
import config from "@/lib/data/internal/SiteConfig"
import PostMeta from '@/components/post/post-meta/post-meta'
import { Card } from "@/styles/templates/card"

const LinkContainer = styled.div`
`

const LinksTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: calc(var(--space-sm)*0.5);
`

const LinksContent = styled.p`
  margin: calc(var(--space-sm)*0.5) 0;
  max-width: 700px;
  font-family: var(--secondary-font);
  font-size: .875rem;
`

const LinkLink = styled.a`
  font-size: 14px;
  border-bottom: 1px solid var(--secondary-color);
  cursor: pointer;
  font-family: var(--secondary-font);
  font-style: italic;
`

export default function LinkPreview({ link }) {

  const slug = `/links/${link.id}`

  return ( 
    <Card title={link.title} className="h-entry">    
      <LinkContainer> 
        <HCard /> 
        <LinksTitle className="p-name"><Link href={slug} title={link.title}>{link.title}</Link></LinksTitle>
        <LinkLink className="u-bookmark-of bookmark-of bookmark h-cite" href={link.link} title={link.title}>{link.link}</LinkLink>
        <LinksContent className="e-content">{link.description}</LinksContent>
        <PostTags tags={link.tags} />
        <PostMeta post={link} slug={slug}/>
      </LinkContainer>   
    </Card>
  )
}
