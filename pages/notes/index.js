
import Layout from '@/components/layout/layout'
import { getAllNotes } from '@/lib/data/api/cms'
import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import NotePreview from "@/components/note/note-preview/note-preview"
import SubTitle from '@/components/title/sub-title'
import Grid from '@/components/grid/grid'

const NotesWrapper = styled.section`
  max-width: 1200px;
  margin: auto;
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
            <SubTitle>What's going on.</SubTitle>
            <NotesWrapper>

              <Grid>
                {allNotes.map((note,i) => (
                 <NotePreview 
                  key={i}
                  note={note} 
                />
                ))}
              </Grid>

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
