import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import { getTag, getAllTagsWithSlug } from '@/lib/api'
import PageTitle from '@/components/title/page-title'
import Head from 'next/head'
import config from "../../../data/SiteConfig";
import styled from 'styled-components';
import SEO from '@/components/seo/seo'

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
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <TagContainer>
              <PageTitle color={tag.color}>{tag.name}</PageTitle>
              <TagPostsContainer>
                {tag.posts.length > 0 && <MoreStories posts={tag.posts} />}
              </TagPostsContainer>
            </TagContainer>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getTag(params.slug)

  return {
    props: {
      tag: {
        ...data?.tags[0],
      },
    },
  }
}

export async function getStaticPaths() {
  const allTags = await getAllTagsWithSlug()
  return {
    paths: allTags?.map((tag) => `/blog/themen/${tag.slug}`) || [],
    fallback: true,
  }
}
