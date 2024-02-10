import Layout from "@/src/components/layout/layout"
import { getAllPosts } from "@/src/data/external/cms"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import PageTitle from "@/src/components/title/page-title"
import Grid from "@/src/components/grid/grid"
import SubTitle from "@/src/components/title/sub-title"
import PostPreview from "@/src/components/article/article-preview/article-preview"

const BlogPageContainer = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto;
`

interface Blog {
  allPosts: Array<object>
}

export default function Blog({ allPosts }) {
  const posts: Array<object> = allPosts

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
            {posts.map((post, i) => (
              <PostPreview key={i} postData={post} />
            ))}
          </Grid>
        </BlogPageContainer>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = (await getAllPosts()) || []
  return {
    revalidate: 86400,
    props: { allPosts },
  }
}
