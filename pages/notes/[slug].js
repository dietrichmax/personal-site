import { useRouter } from "next/router"
import Layout from "src/components/layout/layout"
import { getAllNotes, getNote } from "src/data/external/cms"
import styled from "styled-components"
import SEO from "src/components/seo/seo"
import media from "styled-media-query"
import config from "src/data/internal/SiteConfig"
import NoteBody from "src/components/note/note-body/note-body"
import NoteTitle from "src/components/title/post-title"
import Webmentions from "src/components/social/webmentions/webmentions"
import HCard from "src/components/microformats/h-card"
import NoteTags from "src/components/tags/tags"
import WebActions from "src/components/social/social-share/social-share"
import Meta from "src/components/post/post-meta/post-meta"

const NoteWrapper = styled.div`
  max-width: var(--width-container);
  padding: 0 var(--space);
  margin: calc(var(--space-lg) * 2.5) auto var(--space-sm) auto;
  ${media.lessThan("medium")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const NotesItem = styled.div`
  display: flex;
  max-width: 900px;
  flex-direction: column;
  justify-content: space-between;
`

const ContentWrapper = styled.div`
  margin-top: var(--space-sm);
  border-radius: var(--border-radius);
`

const NotesContent = styled.div``

const Hidden = styled.a`
  display: none;
`

const NoteBackground = styled.div`
  margin: auto auto var(--space-sm) auto;
  max-width: 1200px;
`

const NoteBackgroundColor = styled.div`
  max-width: 900px;
  margin: 0 auto var(--space-sm) 0;
  background-color: var(--content-bg);
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
            slug={`/notes/${note.slug}`}
            date={note.updated_at ? note.updated_at : note.published_at}
            postSEO
          />
          <NoteWrapper>
            <NotesItem className="h-entry">
              <Hidden>
                <div className="webmentions meta">
                  <span className="webmention type">
                    {note.ofUrl && note.category == "Like" ? (
                      <a class="u-like-of" href={note.ofUrl} />
                    ) : null}
                    {note.ofUrl && note.category == "Reply" ? (
                      <a class="u-in-reply-to" href={note.ofUrl} />
                    ) : null}
                    {note.ofUrl && note.category == "Repost" ? (
                      <a class="u-repost-of" href={note.ofUrl} />
                    ) : null}
                  </span>

                  <HCard />
                </div>
              </Hidden>
              <NoteTitle>{note.title}</NoteTitle>

              <ContentWrapper className="e-content">
                <NotesContent>
                  {note.content ? (
                    <NoteBody className="p-summary" content={note.content} />
                  ) : null}

                  {/*<NoteTags tags={note.tags} />*/}
                </NotesContent>
              </ContentWrapper>
            </NotesItem>

            <WebActions slug={`/notes/${note.slug}`} />
            <Meta
              post={note}
              slug={`/notes/${note.slug}`}
              syndicationLinks={note.syndicationLinks}
            />
            <Webmentions slug={`/notes/${note.slug}`} />
          </NoteWrapper>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getNote(params.slug)
  const note = data?.notes[0]
  const content = note.content || ""

  const publishOn = (note) => {
    const endpoints = []
    note.publishOnTwitter
      ? endpoints.push(`[](https://brid.gy/publish/twitter)`)
      : note.publishOnInstagram
      ? endpoints.push(`<a href="https://brid.gy/publish/instagram" />`)
      : note.publishOnReddit
      ? endpoints.push(`<a href="https://brid.gy/publish/reddit" />`)
      : null
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
    paths: notes?.map((note) => `/notes/${note.slug}`) || [],
    fallback: true,
  }
}
