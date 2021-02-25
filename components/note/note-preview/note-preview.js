import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import Image from "next/image"
import NoteBody from "@/components/note/note-body/note-body"
import config from "@/lib/data/SiteConfig"
import Date from "@/components/date/date"

const NotesItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  min-height: 250px;
  box-shadow: 0 2px 2px rgba(0,0,0,.09);
  background-color: var(--content-bg);
  border-radius: var(--border-radius);
`

const NoteBodyWrapper = styled.div`
  height: 100%;
  font-size: .875rem;
`

const NotesContent = styled.div`
  padding: var(--space-sm);
  height: 100%;
  ${media.lessThan('medium')`
  `}
`

const NotesDate = styled.p`
  font-family: var(--secondary-font);
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(245, 248, 250, 0.7);
  padding: calc(var(--space-sm)*.5);
  font-size: 12px;
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
              <NotesDate><Date className="dt-published" dateString={note.date} /></NotesDate>
            </NoteBodyWrapper> 
          ): 
            <NoteBodyWrapper>
              <Image 
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.coverMedium.url}`}
                alt={`cover medium of ${note.date}`}
                layout="fill"
                className="u-photo" 
                style={{cursor:'pointer'}}
              /> 
              <NotesDate><Date className="dt-published" dateString={note.date} /></NotesDate>
            </NoteBodyWrapper>
          }
          
          <Hidden>
            {note.publishOnTwitter ? <a href="https://brid.gy/publish/twitter" /> : null}
            {note.publishOnInstagram ? <a href="https://brid.gy/publish/instagram" /> : null}
            {note.publishOnReddit ? <a href="https://brid.gy/publish/reddit" /> : null}
          </Hidden>
        </NotesContent>
      </a>
    </NotesItem>
  )
}
