
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
import NoteBody from "@/components/note/note-body/note-body"

const NotesWrapper = styled.section`
  max-width: 1200px;
  margin: auto;
`

const NotesContainer = styled.ol`
  margin: var(--space);
  position: relative;
  padding-inline-start: 0 !important;
  list-style-type: none;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  display: grid;
  ${media.lessThan('1200px')`
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    margin: var(--space-sm);
  `}
  ${media.lessThan('small')`
    display: block;
  `}
`


const NotesItem = styled.li`
  margin: 1px;
  overflow: hidden;
  position: relative;
  min-height: 350px;
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
            <PageTitle>Notes</PageTitle>
            <NotesWrapper>

              <NotesContainer className="h-feed">

                {allNotes.map((note) => (
                  
                  <NotesItem className="h-entry">
                    <NotesContent className="e-content p-name">
                      <a
                        href={`/notes/${note.date}`}
                        title={`${note.title}/${note.date}`}
                        className="u-url"
                        rel="bookmark"
                      >
                      {note.content ? (
                        <NoteBodyWrapper>
                          <NoteBody content={note.content} /> 
                          <NotesDate className="dt-published">{note.date}</NotesDate>
                        </NoteBodyWrapper> 
                      ): 
                        <Image 
                          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.photo.url}`}
                          alt={`${note.title}/${note.date}`}
                          layout="fill"
                          className="u-photo" 
                          style={{cursor:'pointer'}}
                        /> 
                      }
                      </a>
                    </NotesContent>
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
