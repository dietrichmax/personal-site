import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import Image from "next/image"
import NoteBody from "@/components/note/note-body/note-body"
import config from "@/lib/data/SiteConfig"
import PostMeta from '@/components/post/post-meta/post-meta'
import HCard from "@/components/microformats/h-card"
const slugify = require('slugify')

const NotesItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  height: 100%;
  box-shadow: var(--box-shadow);
  background-color: var(--content-bg);
  border-radius: var(--border-radius);
`

const NoteBodyWrapper = styled.div`
  height: 100%;
  font-size: .875rem;
`

const NotesContent = styled.div`
  height: 100%;
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

const NoteImage= styled(Image)`
  object-fit: cover;
  object-position: bottom;
`

const Hidden = styled.a`
  display: none;
`

const NoteImageWrapper = styled.div`
  width: 552px;
  height: 300px;
`

const NoteBodyContainer = styled.div`
  padding: var(--space-sm);
`
export default function NotePreview({ note }) {

  const slug= `/notes/${note.id}`

  return (
    <NotesItem className="h-entry" >
      <Link
        href={slug}
        className="u-url"
        rel="bookmark"
        passHref
      >
        <a title={note.title}>
        <Hidden className="webmention meta">
          <HCard /> 
          <span className="webmention type">
            {note.ofUrl && note.category == "Like" ? <a class="u-like-of" href={note.ofUrl} /> : null }
            {note.ofUrl && note.category == "Reply" ? <a class="u-in-reply-to" href={note.ofUrl} /> : null }
            {note.ofUrl && note.category == "Repost" ? <a class="u-repost-of" href={note.ofUrl} /> : null }
          </span>
        </Hidden>

          <NotesContent className="e-content">
            {note.coverMedium[0] ? (
                  
              <NoteBodyWrapper>
                <NoteImageWrapper>
                  <NoteImage
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.coverMedium[0].url}`}
                    alt={`Cover medium of note ${note.date}`}
                    layout="fill"
                    className="u-photo" 
                  /> 
                </NoteImageWrapper>
                <PostMeta post={note} slug={slug}/>
              </NoteBodyWrapper>
            ): 
              <NoteBodyWrapper>
                <NoteBodyContainer><NoteBody content={note.content} /></NoteBodyContainer>
                <PostMeta post={note} slug={slug}/>
              </NoteBodyWrapper> 
            }
            

          </NotesContent>
          </a>
        </Link>
      </NotesItem>
  )
}
