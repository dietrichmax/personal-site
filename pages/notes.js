import Layout from "src/components/layout/layout"
import { getAllNotes } from "src/data/external/cms"
import config from "src/data/internal/SiteConfig"
import styled from "styled-components"
import SEO from "src/components/seo/seo"
import { useRouter } from "next/router"
import PageTitle from "src/components/title/page-title"
import NotePreview from "src/components/note/note-preview/note-preview"
import SubTitle from "src/components/title/sub-title"
import media from "styled-media-query"
import Grid from "src/components/grid/grid"
import { FaRss } from "react-icons/fa"

const NotesWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
`

const Feed = styled.span`
  display: inline-block;
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
            <SEO title="Notes" slug="notes" />
            <PageTitle>Notes</PageTitle>
            <SubTitle>Status updates and short notes.</SubTitle>
            <NotesWrapper>
              <Grid>
                {allNotes.map((note, i) => (
                  <NotePreview key={i} note={note} />
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
    revalidate: 86400,
    props: { allNotes },
  }
}
