import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import { getAllNotes } from '@/lib/data/api/cms'
import Head from 'next/head'
import config from "../lib/data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import Image from 'next/image'
import media from "styled-media-query"
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import Date from "@/components/date/date"

const NotesContainer = styled.ol`
  max-width: 600px;
  position: relative;
  margin: 0 auto var(--space-lg) auto;
  padding-inline-start: 0 !important;
  :before {
    content: '';
    display: block;
    width: 1px;
    background-color: var(--secondary-color);
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--space-lg);
  }
  
  ${media.lessThan('medium')`
    margin: var(--space);
`}
`

const NotesItem = styled.div`
  margin-bottom: var(--space);
  background-color: var(--secondary-color);
  border-radius: var(--space-sm);
  padding: var(--space);
  cursor: pointer;
  ${media.greaterThan('large')`
    :hover {
      box-shadow: 0 25px 25px var(--gray-dark);    
    }
`}
`

const NotesDate = styled.div`
color: var(--gray);
font-size: 1.3rem;
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
              <Link href={`/notes/${note.date}`} passHref>
                <a><NotesItem>
                  <NotesDate><Date dateString={note.date} /></NotesDate>
                  <NotesContent>{note.content}</NotesContent>
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
