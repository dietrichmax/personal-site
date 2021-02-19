import Layout from '@/components/layout/layout'
import { getAllNotes } from '@/lib/data/api/cms'
import config from "../lib/data/SiteConfig";
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
  ${media.lessThan('medium')`
    margin: var(--space);
`}
`


const NotesItem = styled.li`
  border-left: 1px solid #dc143f;
  margin-bottom: 0;
  padding-bottom: 6.5em;
`

const NotesMeta = styled.div`
  float: left;
  height: 0;
  padding: 0 0 0 16px;
  margin: -10px 0 0 3px;
  min-width: 100px;
  :before {
    content: "";
    display: block;
    position: absolute;
    margin-left: -26px;
    width: 12px;
    height: 12px;
    background: var(--thirdy-color);
    border-radius: 100%;
    margin-top: 8px;
  }
  ${media.lessThan('medium')`
    float: none;
  `}
`

const NotesDate = styled.p`
  font-size: 1rem;
  display: inline-block;
  font-style: italic;
  color: var(--gray);
  font-family: var(--secondary-font);
  ${media.lessThan('small')`
    display: block;
  `}
`


const NotesEntry = styled.div`
  width: calc(50% + 10vw);
  margin-right: 50%;
  transform: translateX(50%);
  padding-left: 0;
  float: right;
  ${media.lessThan('medium')`
    margin-right: 30%;
    transform: translateX(40%);
  `}
  ${media.lessThan('small')`
    width: 100%;
    margin-left: var(--space);
    padding-left: calc(var(--space-sm)*1.5);
  `}

`

const NoteTitle = styled.h2`
  display: inline-block;
  margin: -22px 0 0;
  font-size: 2.5rem;
  line-height: 1.2em;
  ${media.lessThan('medium')`
    font-size: 2rem;
  `}
  ${media.lessThan('small')`
    font-size: 1.5rem;
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
                            <NotesEntry>
                            <NoteTitle>
                              <Link href={`/notes/${note.slug}`} passHref>
                                <a title={note.title}>{note.title}</a>
                              </Link>
                            </NoteTitle>

                          </NotesEntry>
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
