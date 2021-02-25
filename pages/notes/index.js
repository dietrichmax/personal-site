
import Layout from '@/components/layout/layout'
import { getAllNotes } from '@/lib/data/api/cms'
import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import media from "styled-media-query"
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import NotePreview from "@/components/note/note-preview/note-preview"

const NotesWrapper = styled.section`
  max-width: 1200px;
  margin: auto;
`

const NotesContainer = styled.ol`
  margin: var(--space);
  position: relative;
  padding-inline-start: 0 !important;
  list-style-type: none;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  display: grid;
  ${media.lessThan('1200px')`
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    margin: var(--space-sm);
  `}
  ${media.lessThan('small')`
    display: block;
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
            <PageTitle>Notes</PageTitle>
            <NotesWrapper>

              <NotesContainer className="h-feed">

                {allNotes.map((note) => (
                 <NotePreview note={note} />
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
