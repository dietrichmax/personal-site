import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import { getTag, getAllTags } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/tag-title'
import config from "../../../lib/data/SiteConfig";
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import Header from '@/components/navigation/header/header'
import Footer from '@/components/navigation/footer/footer'

const TagContainer = styled.div`
  max-width: 1200px;
  margin: auto;
`


const TagPostsContainer = styled.div`
`



export default function Tags({ tag }) {
  const router = useRouter()
  if (!router.isFallback && !tag?.slug) {
    return <ErrorPage statusCode={404} />
  }
  
  return (
    <Layout>
      <Header/>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO   
              title={tag.name}
              description={tag.description}
              slug={`articles/topics/${tag.slug}`}
            />
            <PageTitle color={tag.color}>{tag.name}</PageTitle>
            <TagContainer>
              <TagPostsContainer>
                {tag.posts.length > 0 && <MoreStories posts={tag.posts} />}
              </TagPostsContainer>
            </TagContainer>
          </>
        )}
      <Footer />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getTag(params.slug)

  return {
    revalidate:  86400,
    props: {
      tag: {
        ...data?.tags[0],
      },
    },
  }
}

export async function getStaticPaths() {
  const allTags = await getAllTags()
  return {
    paths: allTags?.map((tag) => `/articles/topics/${tag.slug}`) || [],
    fallback: true,
  }
}
