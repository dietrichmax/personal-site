import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import { getAllNotes, getNote } from '@/lib/data/api/cms'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig";
import NoteBody from "@/components/note/note-body/note-body"
import NoteTitle from "@/components/title/post-title"
import Webmentions from "@/components/social/webmentions/webmentions"
import Image from "next/image"
import Link from"next/link"
import HCard from "@/components/microformats/h-card"
import NoteTags from "@/components/tags/tags"
import NoteMeta from "@/components/note/note-meta/note-meta"
import SyndicationLinks from "@/components/microformats/syndication-links"
import WebActions from "@/components/social/feedback/feedback"

const NoteWrapper = styled.div`
  max-width: var(--width-container);
  padding: 0 var(--space);
  margin: calc(var(--space-lg)*2.5) auto var(--space-sm) auto;
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const NoteImageWrapper = styled.div`
  position: relative;
  margin-bottom: var(--space-sm);
`


const NoteImage = styled(Image)`
  position: absolute;
  cursor: pointer;
  border-radius: var(--border-radius);
  object-fit: contain;
  margin: 0;
`

const NotesItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const NoteDiv = styled.ol`
  font-family: var(--secondary-font);
  font-size: 14px;
  display: flex;
  margin-top: var(--space-sm);
  justify-content: space-between;
  list-style: none;
  padding-inline-start 0;
`

const MetaItem = styled.li`
`

const ContentWrapper = styled.div`
  margin-top: var(--space-sm);
  border-radius: var(--border-radius);
`

const NotesContent = styled.div`
  padding: var(--space-sm);
  background-color: var(--content-bg);
  box-shadow: var(--box-shadow);
`

const MetaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
`
const Hidden = styled.a`
  display: none;
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
              description={note.description}
              slug={`/notes/${note.id}`}
              date={note.date}
              postSEO
            />
            <NoteWrapper>
             
              <NotesItem className="h-entry"> 
                <Hidden>
                  <div className="webmentions meta">
                      <span className="webmention type">
                        {note.ofUrl && note.category == "Like" ? <a class="u-like-of" href={note.ofUrl} /> : null }
                        {note.ofUrl && note.category == "Reply" ? <a class="u-in-reply-to" href={note.ofUrl} /> : null }
                        {note.ofUrl && note.category == "Repost" ? <a class="u-repost-of" href={note.ofUrl} /> : null }
                      </span>
                      
                      <HCard /> 
                  </div>
                </Hidden>            
                 
                <ContentWrapper className="e-content">
                  {note.coverMedium ? note.coverMedium.map((note, i) => {
                    return (
                    <NoteImageWrapper key={i}> 
                      <Link href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.url}`} passHref >
                        <NoteImage
                          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.formats.large.url}`}
                          alt={`${i}. cover image`}
                          title={`${note.name}`}
                          className="u-photo" 
                          width="1200"
                          height={(1200/note.width)*note.height}
                          layout="responsive"
                        />   
                      </Link> 
                    </NoteImageWrapper> 
                    )
                  }): null }

                <NotesContent>
                  {note.content ? 
                    <NoteBody 
                      className="p-summary" 
                      content={note.content} 
                    />
                  : null }
                  
                  <NoteTags tags={note.tags} />
                  <MetaWrapper>
                    <NoteMeta  note={note} />
                    <SyndicationLinks syndicationLinks={note.syndicationLinks} />
                  </MetaWrapper>

                  
                </NotesContent>

                </ContentWrapper>
              </NotesItem>
      
              <WebActions slug={`/notes/${note.id}`} />
              <Webmentions slug={`/notes/${note.id}`} />

            </NoteWrapper>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {  
  const data = await getNote(params.slug)
  const note =  data?.notes[0]
  const content = note.content || '' 

  const publishOn = (note) => {
    const endpoints = []
    note.publishOnTwitter ? endpoints.push(`[](https://brid.gy/publish/twitter)`) :
    note.publishOnInstagram ? endpoints.push(`<a href="https://brid.gy/publish/instagram" />`) : 
    note.publishOnReddit ? endpoints.push(`<a href="https://brid.gy/publish/reddit" />`) : null
    return endpoints
  }
  const endpoints = publishOn(note)

  
  return {
    props: {
      note: {
        ...data?.notes[0],
        content: content + endpoints,
      },
    },
  }
}

export async function getStaticPaths() {
  const notes = await getAllNotes()
  
  return {
    paths: notes?.map((note) => `/notes/${note.id}`) || [],
    fallback: true,
  }
}