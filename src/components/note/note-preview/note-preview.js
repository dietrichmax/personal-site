import Link from "next/link"
import styled from "styled-components"
import NoteBody from "src/components/note/note-body/note-body"
import PostMeta from "src/components/post/post-meta/post-meta-preview"
import HCard from "src/components/microformats/h-card"
import { Card } from "@/styles/templates/card"
import renderers from "src/utils/renderers"

const NoteBodyWrapper = styled.div`
  height: 100%;
  font-size: 0.875rem;
  padding: 0.5rem 1rem 0 1rem;
`

const NotesContent = styled.div`
  height: 100%;
`

const Hidden = styled.div`
  display: none;
`

const NoteBodyContainer = styled.div``
export default function NotePreview({ note }) {
  const slug = `/notes/${note.slug}`
  return (
    <Card className="h-entry">
      <Link
        href={slug}
        passHref
        className="u-url"
        rel="bookmark"
        title={note.title}
      >
        <Hidden className="webmention meta">
          <HCard />
          <div className="webmention type">
            {note.ofUrl && note.category == "Like" ? (
              <a className="u-like-of" href={note.ofUrl} />
            ) : null}
            {note.ofUrl && note.category == "Reply" ? (
              <a className="u-in-reply-to" href={note.ofUrl} />
            ) : null}
            {note.ofUrl && note.category == "Repost" ? (
              <a className="u-repost-of" href={note.ofUrl} />
            ) : null}
          </div>
        </Hidden>
        <NotesContent className="e-content">
          <NoteBodyWrapper>
            <NoteBodyContainer>
              <NoteBody content={note.content} components={renderers} />
            </NoteBodyContainer>
            <PostMeta post={note} slug={slug} />
          </NoteBodyWrapper>
        </NotesContent>
      </Link>
    </Card>
  )
}
