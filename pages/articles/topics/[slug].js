import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Grid from '@/components/grid/grid'
import Layout from '@/components/layout/layout'
import { getTag, getAllTags } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/tag-title'
import config from "../../../lib/data/SiteConfig";
import styled from 'styled-components';
import SubTitle from '@/components/title/sub-title'
import SEO from '@/components/seo/seo'
import PostPreview from '@/components/post/post-preview/post-preview'

const TagContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto var(--space) auto;
`


const TagPostsContainer = styled.div`
`

const PostsGrid = styled.ol`
  grid-column: span 6/span 6;
  list-style: none;
  padding-inline-start: 0;
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
            <SEO   
              title={tag.name}
              description={tag.description}
              slug={`articles/topics/${tag.slug}`}
            />
            <PageTitle color={tag.backgroundColor}>{tag.name}</PageTitle>
            <SubTitle>Posts tagged with {tag.name}</SubTitle>
            <TagContainer>
              <TagPostsContainer>
              <Grid>
                <PostsGrid>
                  {tag.posts.map((post,i) => (
                    <PostPreview
                      key={i}
                      postData={post}
                    />
                  ))}
                  </PostsGrid>
                </Grid> 
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
