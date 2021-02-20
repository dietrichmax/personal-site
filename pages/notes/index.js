
import Layout from '@/components/layout/layout'
import { getAllNotes } from '@/lib/data/api/cms'
import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import Link from 'next/link'
import media from "styled-media-query"
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'

const NotesWrapper = styled.section`
  margin: 0 auto;
  max-width: 1200px;
`

const NotesContainer = styled.ol`
  position: relative;
  margin: 0 auto var(--space-lg) var(--space);
  padding-inline-start: 0 !important;
  list-style-type: none;
`


const NotesItem = styled.li`
  border-left: 1px solid #dc143f;
  padding-bottom: 6.5em;
`

const NotesMeta = styled.div`
  display: inline-block;
  padding-left: .5rem;
`

const NotesDate = styled.p`
  font-size: 1rem;
  font-style: italic;
  color: var(--gray);
  display: inline-block;
  font-family: var(--secondary-font);
  :before {
    content: "";
      display: block;
      position: absolute;
      margin-left: -33px;
      width: 12px;
      height: 12px;
      background: var(--thirdy-color);
      border-radius: 100%;
      margin-top: 8px;
  }
  
  ${media.lessThan('medium')`
    font-size: .875rem;
`}
`


const NoteTitle = styled.h2`
  display: inline-block;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  margin-left: var(--space-lg);
  line-height: 1.2em;
  ${media.lessThan('medium')`
    display: block;
    font-size: 1.25rem;
    margin-left: var(--space-sm);
  `}
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
                  <NotesItem>
                    <NotesMeta>
                      <i class="las la-pen"></i><NotesDate>{note.date}</NotesDate>
                    </NotesMeta>
                    <NoteTitle>
                      <Link href={`/notes/${note.slug}`} passHref>
                        <a title={note.title}>{note.title}</a>
                      </Link>
                    </NoteTitle>
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
