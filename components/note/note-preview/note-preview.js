import Link from 'next/link'
import styled from 'styled-components';
import NoteBody from "@/components/note/note-body/note-body"
import PostMeta from '@/components/post/post-meta/post-meta-preview'
import HCard from "@/components/microformats/h-card"
import { Card } from "@/styles/templates/card"

const NoteBodyWrapper = styled.div`
  height: 100%;
  font-size: .875rem;
  padding: 6px 6px 0 6px;
`

const NotesContent = styled.div`
  height: 100%;
`

const Hidden = styled.div`
  display: none;
`

const NoteBodyContainer = styled.div`
`
export default function NotePreview({ note }) {

  const slug = `/notes/${note.slug}`
  return (
    <Card className="h-entry" >
      <Link
        href={slug}
        passHref
      >
        <a className="u-url" rel="bookmark"title={note.title}>
        <Hidden className="webmention meta">
          <HCard /> 
          <span className="webmention type">
            {note.ofUrl && note.category == "Like" ? <a className="u-like-of" href={note.ofUrl} /> : null }
            {note.ofUrl && note.category == "Reply" ? <a className="u-in-reply-to" href={note.ofUrl} /> : null }
            {note.ofUrl && note.category == "Repost" ? <a className="u-repost-of" href={note.ofUrl} /> : null }
          </span>
        </Hidden>

          <NotesContent className="e-content">
            <NoteBodyWrapper>
              <NoteBodyContainer><NoteBody content={note.content} /></NoteBodyContainer>
              <PostMeta post={note} slug={slug}/>
            </NoteBodyWrapper> 
          </NotesContent>
          </a>
        </Link>
      </Card>
  )
}
