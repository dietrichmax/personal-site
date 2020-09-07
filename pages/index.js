import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import PageTitle from '@/components/title/page-title'
import { getAllPostsForBlog } from '@/lib/api'
import Head from 'next/head'
import config from "../data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/headerNav'
import Footer from '@/components/footer/footer'

const IndexPageContainer = styled.div`
  margin: auto;
  max-width: 1200px;
`

export default function Index({ allPosts }) {
  return (
    <>
      <Layout>
        <Header section="Blog" />
        <Head>
          <title>{config.siteTitle}</title>
        </Head>
        <IndexPageContainer >
            <PageTitle>Blog</PageTitle>
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
        </IndexPageContainer>
        
        <Footer />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = (await getAllPostsForBlog()) || []
  return {
    props: { allPosts },
  }
}
