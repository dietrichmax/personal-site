
import Layout from '@/components/layout/layout'
import { getAllNotes } from '@/lib/data/api/cms'
import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import Link from 'next/link'
import media from "styled-media-query"
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import Image from "next/image"
import { usePalette } from 'react-palette'

const NotesWrapper = styled.section`
  margin: 0 auto;
  max-width: 1200px;
`

const NotesContainer = styled.ol`
  position: relative;
  margin: 0 auto var(--space-lg) var(--space);
  padding-inline-start: 0 !important;
  list-style-type: none;
  :before {
    content: '';
    display: block;
    width: 3px;
    background-color: var(--gray-extra-light);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 2.5rem;
  }
`


const NotesItem = styled.li`
  border-radius: var(--border-radius);
  min-height: 100px;
  max-width: 400px;
  position: relative;
  margin-bottom: var(--space-lg);
  background-color: ${props => props.bgColor ? props.bgColor : 'var(--gray-light)'};
`


const NotesMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--space-sm);
  padding-left: var(--space-sm);
`

const NotesDate = styled.p`
  font-size: .875rem;
  color: var(--gray-extra-light);
  font-style: italic;
  ${media.lessThan('medium')`
`}
`


const NotesContent = styled.div`
  padding: var(--space-sm);
  ${media.lessThan('medium')`
  `}
`

const Hidden = styled.a`
  display: none;
`

export default function Notes({ allNotes }) {
  const router = useRouter()


  return (
    <>
      <Layout>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Notes"
              slug="notes"
            />
            <NotesWrapper>

              <PageTitle>Notes</PageTitle>
              <NotesContainer >

                {allNotes.map((note) => (
                  
                  <NotesItem bgColor={note.photo ? (usePalette(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.photo.url}`).data.muted): "var(--gray-extra-light)"} className="h-entry">
                    {note.publishOnTwitter ? <a href="https://brid.gy/publish/twitter" /> : null}
                    {note.publishOnInstagram ? <a href="https://brid.gy/publish/instagram" /> : null}
                    {note.inReplyTo ?  <a className="u-in-reply-to" href={ofUrl} /> : null}
                    {note.likeOf ? <a class="u-like-of" href={ofUrl} /> : null}
                    {note.repostOf ? <a class="u-repost-of" href={ofUrl} />  : null}
                    {note.quoteOf ? <a class="h-cite u-quotation-of" href={ofUrl} /> : null}
                    <NotesContent className="e-content p-name">
                    {note.content ? note.content : 
                      <Link
                        href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.photo.url}`}
                        passHref
                      >
                        <Image 
                          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.photo.url}`}
                          alt={note.date} 
                          title={note.date}
                          width="400"
                          height="400"
                          className="u-photo" 
                          style={{cursor:'pointer'}}
                        /> 
                      </Link>
                    }
                    </NotesContent>
                    <NotesMeta>
                      <Hidden>
                        <span className="note__author__link">
                          <img className="u-photo" src="/assets/images/avatar2.jpg" alt={note.title} /> 
                          <strong className="p-name">Max Dietrich</strong>
                        </span>
                      </Hidden>
                      <NotesDate className="dt-published">{note.date}</NotesDate>
                    </NotesMeta>
                  </NotesItem>
                ))}
              </NotesContainer>
            </NotesWrapper>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allNotes = (await getAllNotes()) || []
  
  return {
    revalidate:  86400,
    props: { allNotes },
  }
}
