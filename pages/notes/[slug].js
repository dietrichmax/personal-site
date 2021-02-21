import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import { getAllNotes, getNote } from '@/lib/data/api/cms'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig";
import NoteBody from "@/components/note/note-body/note-body"
import NoteTitle from "@/components/title/post-title"
import NoteTags from "@/components/tags/tags"
import Webmentions from "@/components/social/webmentions/webmentions"
import SocialShare from "@/components/social/social-share/social-share"
import NoteMeta from "@/components/post/post-meta/post-meta"

const NoteWrapper = styled.div`
max-width: 1200px;
padding: var(--space);
margin: calc(var(--space-lg)*2.5) auto var(--space-lg) auto;
${media.lessThan('medium')`
  padding-left: var(--space-sm);
  padding-right: var(--space-sm);
`}
`

const NotesItem = styled.div`
  margin-bottom: var(--space);
  border-radius: var(--space-sm);
  cursor: pointer;
`


const NotesContent = styled.div`
  margin: var(--space) 0;
`


export default function Note({ note }) {
  const router = useRouter()

  return (
    <Layout>
        {router.isFallback ? (
          <NoteTitle>{config.loading}</NoteTitle>
        ) : (
          <>
            <SEO   
              title={note.title}
              description={`Note - ${note.content}`}
              slug={`/notes/${note.date}`}
              date={note.date}
              postSEO
            />
            <NoteWrapper className="h-entry">
              
            <NoteTitle className="p-name">{note.title}</NoteTitle>
          
            <NoteMeta postMetaData={note} />
            <NoteTags tags={note.tags} />
            <NotesItem >
                <NotesContent>
                  <NoteBody className="e-content" content={note.content} />
                </NotesContent>
      

                <SocialShare slug={`/notes/${note.slug}`} /> 
                <Webmentions slug={note.slug} />

            </NotesItem>
            </NoteWrapper>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getNote(params.slug)
  const content = data?.notes[0]?.content || ''

  return {
    props: {
      note: {
        ...data?.notes[0],
        content: content,
      },
    },
  }
}

export async function getStaticPaths() {
  const notes = await getAllNotes()
  
  return {
    paths: notes?.map((note) => `/notes/${note.slug}`) || [],
    fallback: true,
  }
}
