import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import { getAllPosts, getAllTags } from '@/lib/data/api/cms'
import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import SubTitle from '@/components/title/sub-title'

const BlogPageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--space-lg);
  max-width: 1200px;
`

export default function Blog({ allPosts, allTags }) {
  const router = useRouter()
  
  const posts = allPosts

  return (
    <>
      <Layout>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Articles"
              slug="articles"
            />
            
            <PageTitle>Articles</PageTitle>
            <SubTitle>Mostly well thought out content</SubTitle>

            <BlogPageContainer >

              <MoreStories posts={posts}/>

            </BlogPageContainer>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = (await getAllPosts()) || []
  const allTags = (await getAllTags()) || []
  return {
    revalidate:  86400,
    props: { allPosts, allTags },
  }
}
