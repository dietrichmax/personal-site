import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import { getAllNotes } from '@/lib/data/api/cms'
import NoteTitle from '@/components/title/page-title'
import markdownToHtml from '@/lib/markdownToHtml'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import Date from '@/components/date/date'    
import Header from '@/components/navigation/header/header'
import Footer from '@/components/navigation/footer/footer'
import config from "@/lib/data/SiteConfig";
import Link from 'next/link'
import NoteBody from "@/components/note/note-body/note-body"

const NoteWrapper = styled.div`
    max-width: 600px;
    margin: var(--space-lg) auto;
    background-color: var(--primary-color);
    ${media.lessThan('medium')`
        padding-left: var(--space);
        padding-right: var(--space);
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
const MoreContainer = styled.div`
  margin: var(--space) auto var(--space) auto;
  text-align: left;    
  cursor: pointer;
  font-weight: 600;
  font-size: 1.3rem;
  text-decoration: none;
`
const MoreArticles = styled.a`
  cursor: pointer;
  transition: 0.2s;
  :hover {
    text-decoration: underline;
  }
  :before {
    content: "\f060";
    font-family: "Line Awesome Free";
    font-weight: 900;
  }
`
export default function Note({ note }) {
  const router = useRouter()

  return (
    <Layout>
      <Header />
        {router.isFallback ? (
          <NoteTitle>{config.loading}</NoteTitle>
        ) : (
          <>
            <SEO   
              title={`Notes`}
              description={`Note - ${note.content}`}
              slug={`/notes/${note.date}`}
              date={note.date}
            />
            <NoteWrapper>
              
            <MoreContainer>
              <Link href={`/notes`} passHref>
                <MoreArticles title="Back to all Notes">{' '}Back to Notes</MoreArticles>
              </Link>
            </MoreContainer>

            <NotesItem className="h-entry">
                <NotesDate><Date className="dt-published" dateString={note.date} /></NotesDate>
                <NotesContent>
                  <NoteBody className="e-content" content={note.content} />
                </NotesContent>
                

            </NotesItem>
            </NoteWrapper>
          </>
        )}
      <Footer />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getAllNotes()
  const content = await markdownToHtml(data[0]?.content || '')

  return {
    props: {
      note: {
        date: data[0]?.date,
        content: data[0]?.content,
      },
    },
  }
}

export async function getStaticPaths() {
  const notes = await getAllNotes()
  
  return {
    paths: notes?.map((note) => `/notes/${note.date}`) || [],
    fallback: true,
  }
}
