import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import PageTitle from '@/components/title/page-title'
import { getAllPosts, getAllTags } from '@/lib/data/api/cms'
import Head from 'next/head'
import config from "../lib/data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PostTags from '@/components/post/post-tags/post-tags'
import PostHero from '@/components/post/post-hero/post-hero'
import SubTitle from '@/components/title/page-title'

const BlogPageContainer = styled.div`
  margin: auto;
  max-width: 1200px;
`

export default function Blog({ allPosts, allTags }) {
  const router = useRouter()
  
  const heroPost = allPosts[0]
  const posts = allPosts.slice(1)
  const morePosts = allPosts.slice(7)

  return (
    <>
      <Layout>
        <Header/>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Articles"
              slug="articles"
            />
            
            <PostHero post={heroPost}/>
            <BlogPageContainer >

              <PostTags tags={allTags} />

              <MoreStories posts={posts}/>

            </BlogPageContainer>
          </>
        )}
        <Footer />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = (await getAllPosts()) || []
  const allTags = (await getAllTags()) || []
  return {
    props: { allPosts, allTags },
  }
}
