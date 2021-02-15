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
import Date from "@/lib/utils/date/date"
import NoteBody from "@/components/note/note-body/note-body"
import PostTags from "@/components/post/post-tags/post-tags"
import SubTitle from '@/components/title/sub-title'

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
  margin-bottom: var(--space);
  padding-bottom: var(--space);
  border-bottom: 1px dashed var(--gray-light);
  ${media.lessThan('medium')`
    margin-left: 0;
`}
`

const LinksTitle = styled.h2`
  font-size: 1.5rem;
`

const LinksLink = styled.cite`
  font-size: 1rem;
  border-bottom: 1px solid var(--link-color);
  cursor: pointer;
`

const LinksContent = styled.div`
  margin: calc(var(--space-sm)*0.5) 0;
  font-size: 18px;
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
              <SubTitle>Awesome content on the web, in random order.</SubTitle>
              <LinksContainer >

              {allLinks.map((link) => (
                <LinksItem className="h-entry">
                    <LinksTitle><a href={link.link} title={link.title}>{link.title}</a></LinksTitle>
                    <LinksLink><span className="u-bookmark-of h-cite"href={link.link} title={link.title}>{link.link}</span></LinksLink>
                    <LinksContent>{link.description}</LinksContent>
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
