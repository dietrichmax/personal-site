import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import Image from "next/image"
import NoteBody from "@/components/note/note-body/note-body"


const NotesItem = styled.li`
  margin: 1px;
  overflow: hidden;
  position: relative;
  min-height: 350px;
`

const NotesDate = styled.p`
  font-size: .875rem;
  font-style: italic;
  ${media.lessThan('medium')`
`}
`

const NoteBodyWrapper = styled.div`
  padding: var(--space-sm);
  background-color: var(--gray-extra-light);
  height: 100%;
`

const NotesContent = styled.div`

  height: 100%;
  ${media.lessThan('medium')`
  `}
`

const Hidden = styled.a`
  display: none;
`
export default function NotePreview({ note }) {

  return (
    <NotesItem className="h-entry">
      <Hidden className="webmention meta">
        {note.publishOnTwitter ? <a href="https://brid.gy/publish/twitter" /> : null}
        {note.publishOnInstagram ? <a href="https://brid.gy/publish/instagram" /> : null}
        {note.publishOnReddit ? <a href="https://brid.gy/publish/reddit" /> : null}
        <span className="note__author__link">
          <img className="u-photo" src={config.siteLogo} alt={note.title} /> 
          <strong className="p-name">Max Dietrich</strong>
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
      <a
        href={`/notes/${note.date}`}
        title={`${note.date}/${note.title}`}
        className="u-url"
      >
        <NotesContent className="e-content p-name">
          {note.content ? (
            <NoteBodyWrapper>
              <NoteBody content={note.content} /> 
              <NotesDate className="dt-published">{note.date}</NotesDate>
            </NoteBodyWrapper> 
          ): 
            <Image 
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.coverMedium.url}`}
              alt={`cover medium of ${note.date}`}
              layout="fill"
              className="u-photo" 
              style={{cursor:'pointer'}}
            /> 
          }
        </NotesContent>
      </a>
    </NotesItem>
  )
}
