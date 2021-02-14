import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import { getAllLinks } from '@/lib/data/api/cms'
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
import PostTags from "@/components/post/post-tags/post-tags"

const LinksContainer = styled.div`
  max-width: 1200px;
  position: relative;
  margin: 0 auto var(--space-lg) auto;
  padding-inline-start: 0 !important;

  ${media.lessThan('medium')`
    margin: var(--space-sm);
  `}
`

const LinksItem = styled.section`
  margin-left: var(--space);
  margin-bottom: var(--space-lg);
  ${media.lessThan('medium')`
    margin-left: 0;
`}
`

const LinksTitle = styled.h2`
  font-size: 0.75em;
  font-weight: 800;
  margin-bottom: 0;
  line-height: 0.5;
`

const LinksLink = styled.cite`
  font-size: 0.6em;
  border-bottom: 1px solid var(--link-color);
  cursor: pointer;
`

const LinksContent = styled.div`
`


export default function Links({ allLinks }) {
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
              title="Links"
              slug="links"
            />
            <article className="b-links">
              <PageTitle>Links</PageTitle>
              <LinksContainer >

              {allLinks.map((link) => (
                <LinksItem>
                    <LinksTitle><a href={link.link} title={link.title}>{link.title}</a></LinksTitle>
                    <LinksLink><span className="h-entry" href={link.link} title={link.title}>{link.link}</span></LinksLink>
                    <LinksContent><NoteBody content={link.description} /></LinksContent>
                    <PostTags tags={link.tags} />

                </LinksItem>
              ))}

                

              </LinksContainer>
            </article>
          </>
        )}
        <Footer />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allLinks = (await getAllLinks()) || []
  
  return {
    revalidate:  86400,
    props: { allLinks },
  }
}
