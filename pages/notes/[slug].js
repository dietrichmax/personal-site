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
import Image from "next/image"
import Link from"next/link"
import markdownToHtml from '@/lib/utils/markdownToHtml'
import Date from '@/components/date/date'

const NoteWrapper = styled.div`
  max-width: 1200px;
  padding: var(--space-sm) var(--space);
  margin: calc(var(--space-lg)*2.5) auto var(--space-lg) auto;
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const NotesItem = styled.div`
  max-width: var(--content-width);
  min-height: 200px;
  background-color: var(--content-bg);
  padding: var(--space-sm);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`

const NoteMeta = styled.a`
  font-size: .875rem;
  margin-right: var(--space-sm);
  font-family: var(--secondary-font);
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
  align-items: center;
  margin-bottom: calc(var(--space-sm)*.5);
`

const SyndList = styled.ol`
  list-style: none;
  padding-inline-start: 0;
  font-size: .875rem;
`

const SyndItem = styled.a`
  :hover {
    color: var(--text-color);
    border-bottom: 1px solid var(--link-color);
    cursor: pointer;
  }
`

const SyndPlattform = styled.span`
  text-transform: capitalize;
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
              title={`${note.date}`}
              description={note.description}
              slug={`/notes/${note.date}`}
              date={note.date}
              postSEO
            />
            <NoteWrapper>
             
              <NotesItem className="h-entry"> 

                <Hidden>
                  <div className="webmentions meta">
                    {note.publishOnTwitter ? <a href="https://brid.gy/publish/twitter" /> : null}
                    {note.publishOnInstagram ? <a href="https://brid.gy/publish/instagram" /> : null}
                    {note.publishOnReddit ? <a href="https://brid.gy/publish/reddit" /> : null}
                    <SyndList className="relsyn">
                        {note.syndicationLinks? 
                          note.syndicationLinks.map((link) => {
                            return (
                              <li>
                                <SyndItem aria-label={link.name} title={link.slug} className="u-syndication syn-link" href={link.slug} rel="syndication" >
                                  <span>View on </span>
                                  <i className={`lab la-${link.name}`}/> 
                                  <SyndPlattform> {link.name}</SyndPlattform>
                                </SyndItem>
                              </li>
                            )         
                          })  : null }
                      </SyndList> 
                      <span className="note__author__link">
                        <img className="u-photo" src={config.siteLogo} alt={`Image of ${config.siteLogo}`}  /> 
                        <strong className="p-name">Max Dietrich</strong>
                      </span>
                  </div>
                </Hidden>

                {/* <NoteTitle className="p-name">{note.title}</NoteTitle>                
                 
                <NoteInfo>
                  <NoteMeta className="u-url" href={`${config.siteUrl}/notes/${note.date}`} title={note.title}>
                    <Date className="dt-published" dateString={note.date} />
                  </NoteMeta>
                  <NoteTags tags={note.tags} />
                </NoteInfo>
                */}
            
                <NotesContent>
                  {note.coverMedium ? 
                    <Link href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.coverMedium.url}`} passHref >
                      <NoteImage
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${note.coverMedium.url}`}
                        alt={`cover image of ${note.date}/${note.slug}`}
                        title={`${note.date}/${note.slug}`}
                        width="900px"
                        height="900px"
                        className="u-photo" 
                      />   
                    </Link> 
                  : null }

                  {note.content ? 
                    <NoteBody 
                      className="p-summary" 
                      content={note.content} 
                    />
                  : null }
    
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
