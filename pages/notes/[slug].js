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
import Image from "next/image"
import Link from"next/link"
import markdownToHtml from '@/lib/utils/markdownToHtml'

const NoteWrapper = styled.div`
max-width: 1200px;
padding: 0 var(--space);
margin: calc(var(--space-lg)*2.5) auto var(--space-lg) auto;
${media.lessThan('medium')`
  padding-left: var(--space-sm);
  padding-right: var(--space-sm);
`}
`

const NotesItem = styled.div`
  margin-bottom: var(--space);
  border-radius: var(--space-sm);
`

const NoteImage = styled(Image)`
  cursor: pointer;
  border-radius: var(--border-radius);
  object-fit: contain;
  margin: 0;
`

const NotesContent = styled.div`
  margin: var(--space) 0;
`

const NoteInfo = styled.div`
  display: flex;
`

const SyndList = styled.ol`
  list-style: none;
  padding-inline-start: 0;
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
              slug={`/notes/${note.date}`}
              date={note.date}
              postSEO
            />
            <NoteWrapper>
             
              <NotesItem className="h-entry"> 
                <div className="webmentions meta">
                  {note.publishOnTwitter ? <a href="https://brid.gy/publish/twitter" /> : null}
                  {note.publishOnInstagram ? <a href="https://brid.gy/publish/instagram" /> : null}
                  {note.publishOnReddit ? <a href="https://brid.gy/publish/reddit" /> : null}
                  {note.inReplyTo ?  <a className="u-in-reply-to" href={note.ofUrl} /> : null}
                  {note.likeOf ? <a class="u-like-of" href={note.ofUrl} /> : null}
                  {note.repostOf ? <a class="u-repost-of" href={note.ofUrl} />  : null}
                  {note.quoteOf ? <a class="h-cite u-quotation-of" href={note.ofUrl} /> : null}
                  {note.mentionOf ? <a class="u-mention-of" href={note.ofUrl} /> : null}
                  <Hidden>
                    <span className="note__author__link">
                      <img className="u-photo" src={config.siteLogo} alt={note.title} /> 
                      <strong className="p-name">Max Dietrich</strong>
                    </span>
                  </Hidden>
                </div>

                <NoteTitle className="p-name">{note.title}</NoteTitle>                
                 
                <NoteInfo>
                  <a className="u-url" href={`${config.siteUrl}/notes/${note.date}`} rel="bookmark">
                    <NoteMeta postMetaData={note} slug={`/notes/${note.date}`} />
                  </a>
                  <SyndList className="relsyn">
                    {note.syndLinkTwitter ? <li><a aria-label="twitter" title="See this tweet on Twitter" className="u-syndication syn-link" href={note.syndLinkTwitter} rel="syndication"><i className="lab la-twitter"/></a></li> : null }
                    {note.syndLinkInstagram ? <li><a aria-label="instagram" title="See this post on Instagram" className="u-syndication syn-link" href={note.syndLinkInstagram} rel="syndication"><i className="lab la-instagram"/></a></li> : null }
                    {note.syndLinkReddit? <li><a aria-label="reddit" title="See this post on Reddit" className="u-syndication syn-link" href={note.syndLinkReddit} rel="syndication"><i className="lab la-reddit"/></a></li> : null }
                  </SyndList> 

                  <NoteTags tags={note.tags} />
                </NoteInfo>
            
                {note.photo ? 
                <Link
                  href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.photo.url}`}
                  passHref
                >
                  <NoteImage
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.photo.url}`}
                    alt={`${note.title}/${note.date}`}
                    title={`${note.title}/${note.date}`}
                    width="800"
                    height="800"
                    className="u-photo" 
                  />   
                </Link> 
                : null}
                <NotesContent>
                  <NoteBody 
                    className="p-summary" 
                    title={`${note.title}/${note.date}`}
                    content={note.content} 
                  />
                </NotesContent>

              </NotesItem>
      

              <SocialShare slug={`/notes/${note.date}`} /> 
              <Webmentions slug={`/notes/${note.date}`} />
            </NoteWrapper>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getNote(params.slug)
  const content = data?.notes[0]?.content || ''
  const description = await markdownToHtml(data?.notes[0]?.content || '')

  return {
    props: {
      note: {
        ...data?.notes[0],
        content: content,
        description,
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
