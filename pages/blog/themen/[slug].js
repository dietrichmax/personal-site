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
import Head from 'next/head'
import markdownToHtml from '@/lib/markdownToHtml'
import config from "../../../data/SiteConfig";
import styled from 'styled-components';
import SEO from '@/components/seo/seo'

const TagPostsContainer = styled.div`
  max-width: 1140px;
  margin: auto;
`

const TagMeta = styled.div`
  max-width: 1140px;
  margin: var(--space) auto var(--space) auto;
`

const TagTitle = styled.h1`
  max-width: auto;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: var(--space-sm);
  color: var(--gray);

`
const TagSeparator = styled.div`
  border-bottom: 2px solid  ${props =>
    props.color ? props.color : '#798ad0'};
  width: 10%;
  margin: auto;
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
            <article>
              <TagMeta>
              <TagTitle>{tag.name}</TagTitle>
              <TagSeparator color={tag.color}/>
              </TagMeta>
              <TagPostsContainer>
                {tag.posts.length > 0 && <MoreStories posts={tag.posts} />}
              </TagPostsContainer>
            </article>
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
