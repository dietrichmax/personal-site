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

const BlogPageContainer = styled.div`
  margin: auto;
  max-width: 1200px;
`

export default function Blog({ allPosts, allTags }) {
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
              title="Articles"
              slug="https://gis-netzwerk.com/blog"
            />
            <PageTitle>Articles</PageTitle>
            <BlogPageContainer >

              <PostTags tags={allTags} />

              {allPosts.length > 0 && <MoreStories posts={allPosts} />}

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
