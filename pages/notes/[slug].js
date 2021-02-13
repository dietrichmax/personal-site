import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Layout from '@/components/layout/layout'
import { getAllNotes } from '@/lib/data/api/cms'
import NoteTitle from '@/components/title/page-title'
import markdownToHtml from '@/lib/markdownToHtml'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import Date from '@/components/date/date'    
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import config from "@/lib/data/SiteConfig";
import markdownStyles from '@/components/post/post-body/markdown-styles.module.css'

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
            <NotesItem>
                <NotesDate><Date dateString={note.date} /></NotesDate>
                <NotesContent
                    className={markdownStyles['markdown']}
                    dangerouslySetInnerHTML={{ __html: note.content }}
                />
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
        content,
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
