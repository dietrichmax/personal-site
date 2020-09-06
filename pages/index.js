import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import Title from '@/components/title/content-title'
import { getAllPostsForBlog } from '@/lib/api'
import Head from 'next/head'
import config from "../data/SiteConfig";
import styled from 'styled-components';

const IndexPageContainer = styled.div`
  margin: auto;
  max-width: 1200px;
`

const IndexPageHeader = styled.div`
  margin: 0 0 var(--space-lg);
`

export default function Index({ allPosts, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{config.siteTitle}</title>
        </Head>
        <IndexPageContainer >
          <IndexPageHeader>
            <Title>Blog</Title>
          </IndexPageHeader>
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
        </IndexPageContainer>
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
