import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import Image from "next/image"
import NoteBody from "@/components/note/note-body/note-body"
import config from "@/lib/data/SiteConfig"
import { parseISO, format } from 'date-fns'
const slugify = require('slugify')

const NotesItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  min-height: 250px;
  box-shadow: var(--box-shadow);
  background-color: var(--content-bg);
  border-radius: var(--border-radius);
  ${media.lessThan('medium')`
    margin-bottom: var(--space-sm);
  `}
`

const NoteBodyWrapper = styled.div`
  height: 100%;
  font-size: .875rem;
`

const NotesContent = styled.div`
  padding: var(--space-sm);
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
  padding: 0.125rem;
  font-size: 12px;
  width: 100%;
  background-color: var(--gray-light);
  mix-blend-mode: luminosity;
  ${media.lessThan('medium')`

  `}
`

const Hidden = styled.a`
  display: none;
`
export default function NotePreview({ note }) {

  return (
    <NotesItem className="h-entry" >
      <Link
        href={`/notes/${note.id}`}
        className="p-name"
        passHref
      >
        <a title={note.title}>
        <Hidden className="webmention meta">

          <span className="note__author__link">
            <img className="u-photo" src={config.siteLogo} alt={config.siteTitle} /> 
            <strong className="p-name">{config.siteTitle}</strong>
          </span>
          <span className="webmention type">
            {note.ofUrl && note.category == "Like" ? <a class="u-like-of" href={note.ofUrl} /> : null }
            {note.ofUrl && note.category == "Reply" ? <a class="u-in-reply-to" href={note.ofUrl} /> : null }
            {note.ofUrl && note.category == "Repost" ? <a class="u-repost-of" href={note.ofUrl} /> : null }
          </span>
          <ol className="relsyn">
            {note.syndicationLinks? 
              note.syndicationLinks.map((link) => {
                return (
                  <li>
                    <a aria-label={link.name} title={link.slug} className="u-syndication syn-link" href={link.slug} rel="syndication" >
                      <span>View on </span>
                      <i className={`lab la-${link.name}`}/> {link.name}
                    </a>
                  </li>
                )         
            })  : null }
          </ol> 
        </Hidden>

          <NotesContent className="e-content">
            {note.coverMedium[0] ? (
                  
              <NoteBodyWrapper>
                <Image 
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.coverMedium[0].url}`}
                  alt={`Cover medium of note ${note.created_at}`}
                  layout="fill"
                  className="u-photo" 
                  style={{cursor:'pointer'}}
                /> 
                <NotesDate>
                  <time className="dt-published" dateTime={note.created_at}>
                    {format(parseISO(note.created_at), "dd MMMM yyy 'at' HH:mm O")}
                  </time>
                </NotesDate>
              </NoteBodyWrapper>
            ): 
              <NoteBodyWrapper>
                <NoteBody content={note.content} /> 
                <NotesDate>
                  <a title={note.title} href={`${config.siteUrl}/notes/${note.id}`} className="u-url">                  
                    <time className="dt-published" dateTime={note.created_at}>
                      {format(parseISO(note.created_at), "dd MMMM yyy 'at' HH:mm O")}
                    </time>
                  </a>
                </NotesDate>
              </NoteBodyWrapper> 
            }
            

          </NotesContent>
          </a>
        </Link>
      </NotesItem>
  )
}
