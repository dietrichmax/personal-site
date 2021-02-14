import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import { getAllNotes } from '@/lib/data/api/cms'
import Head from 'next/head'
import config from "../lib/data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/navigation/header/header'
import Footer from '@/components/navigation/footer/footer'
import Link from 'next/link'
import Image from 'next/image'
import media from "styled-media-query"
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import Date from "@/components/date/date"
import NoteBody from "@/components/note/note-body/note-body"

const NotesContainer = styled.ol`
  max-width: 600px;
  position: relative;
  margin: 0 auto var(--space-lg) auto;
  padding-inline-start: 0 !important;

  ${media.lessThan('medium')`
    margin: var(--space);
`}
`

const NotesItem = styled.div`
  margin-bottom: var(--space);
  border: 1px solid var(--secondary-color);
  border-radius: var(--space-sm);
  padding: var(--space);
  cursor: pointer;
`

const NotesDate = styled.div`
font-size: 0.6em;
margin-bottom: var(--space-sm);
`

const NotesContent = styled.div`
  font-size: 2rem;
`

export default function Notes({ allNotes }) {
  const router = useRouter()

  return (
    <>
      <Layout>
        <Header/>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Notes"
              slug="notes"
            />
            
            <PageTitle>Notes</PageTitle>
            <NotesContainer >

            {allNotes.map((note) => (
              <Link href={`/notes/${note.slug}`} passHref>
                <a><NotesItem>
                  <NotesDate><Date dateString={note.date} /></NotesDate>
                  <NotesContent><NoteBody content={note.content} /></NotesContent>
                </NotesItem></a>
              </Link>
            ))}

              

            </NotesContainer>
          </>
        )}
        <Footer />
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
