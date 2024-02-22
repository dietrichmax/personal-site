import Layout from "@/src/components/layout/layout"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import PageTitle from "@/src/components/title/page-title"
import Grid from "@/src/components/grid/grid"
import SubTitle from "@/src/components/title/sub-title"
import PostPreview from "@/src/components/article/article-preview/article-preview"
import { getAllPosts } from "@/src/data/external/cms"

const BlogPageContainer = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto;
`

interface Post {
  id: number
  attributes: {
    title: string
    slug: string
    description: string
    coverImage: {
      url: string
    }
    content: string
    toc: string
    date: any
    updatedAt: string
    publishedAt: string
    syndicationLinks: any
    author: object
  }
}

export default function Blog({ posts }) {
  return (
    <>
      <Layout>
        <SEO
          title="Articles"
          description="Tutorials, Guides and thoughts"
          slug="articles"
        />

        <PageTitle>Articles</PageTitle>
        <SubTitle>Tutorials, Guides and thoughts</SubTitle>

        <BlogPageContainer>
          <Grid>
            {posts.map((post: Post) => (
              <PostPreview key={post.id} postData={post.attributes} />
            ))}
          </Grid>
        </BlogPageContainer>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts()
  return {
    revalidate: 86400,
    props: {
      posts,
    },
  }
}
