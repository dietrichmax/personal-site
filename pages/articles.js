import Layout from "src/components/layout/layout"
import { getAllPosts } from "src/data/external/cms"
//import config from "src/data/internal/SiteConfig"
import styled from "styled-components"
import SEO from "src/components/seo/seo"
import PageTitle from "src/components/title/page-title"
import Grid from "src/components/grid/grid"
import SubTitle from "src/components/title/sub-title"
import PostPreview from "src/components/article/article-preview/article-preview"
//import Tags from "src/components/tags/tags"
import media from "styled-media-query"

const BlogPageContainer = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto;
`

export default function Blog({ allPosts, allTags }) {
  const posts = allPosts

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
