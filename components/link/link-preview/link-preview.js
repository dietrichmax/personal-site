import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostTags from "@/components/tags/tags"
import Date from '@/components/date/date'
import PreviewImage from "@/components/post/post-image/post-image"
import HCard from "@/components/microformats/h-card"

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
`

const LinksContent = styled.p`
  margin: calc(var(--space-sm)*0.5) 0;
  max-width: 700px;
  font-family: var(--secondary-font);
  font-size: .875rem;
`


export default function LinkPreview({ link }) {
  
  return (
    <LinksItem className="h-entry">           
        <HCard /> 
        <LinksTitle className="p-name"><a href={link.link} title={link.title}>{link.title}</a></LinksTitle>
        <LinksLink><a className="u-bookmark-of h-cite" href={link.link} title={link.title}>{link.link}</a></LinksLink>
        <LinksContent className="e-content">{link.description}</LinksContent>
        <PostTags tags={link.tags} />
    </LinksItem>
  )
}
