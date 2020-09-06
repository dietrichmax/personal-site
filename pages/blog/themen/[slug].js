import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '@/components/post/post-body/post-body'
import MoreStories from '@/components/post/post-preview/more-stories'
import PostHeader from '@/components/post/post-header/post-header'
import SectionSeparator from '@/components/layout/section-separator'
import Layout from '@/components/layout/layout'
import Newsletter from '@/components/newsletter/subscribe'
import { getTag, getAllTagsWithSlug } from '@/lib/api'
import PostTitle from '@/components/title/content-title'
import PageTitle from '@/components/title/page-title'
import Head from 'next/head'
import markdownToHtml from '@/lib/markdownToHtml'
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
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <TagContainer>
              <PageTitle title={tag.name} color={tag.color}/>
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
