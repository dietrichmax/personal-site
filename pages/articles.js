import Layout from 'src/components/layout/layout'
import { getAllPosts, getAllTags } from 'src/data/external/cms'
import config from "src/data/internal/SiteConfig";
import styled from 'styled-components';
import SEO from 'src/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from 'src/components/title/page-title'
import Grid from 'src/components/grid/grid';
import SubTitle from 'src/components/title/sub-title'
import PostPreview from 'src/components/article/article-preview/article-preview'
import Tags from "src/components/tags/tags"
import media from 'styled-media-query';

const BlogPageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--space-lg);
  max-width: 1200px;
`

const PostsGrid = styled.ol`
  grid-column: span 2/span 2;
  list-style: none;
  padding-inline-start: 0;
  display: grid;
  gap: var(--space);
  grid-template-columns: repeat(2, minmax(0px, 1fr));
  ${media.lessThan('medium')`
    padding-left: 0;
    grid-template-columns: repeat(1, minmax(0px, 1fr));
`}
`

const TagsGrid = styled.div`
  grid-column: span 1/span 1;
  position: sticky;
  padding: var(--space-sm);
`

const Sticky = styled.div`
  position: sticky;
  top: var(--space);
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
              description="Tutorials, Guides and thoughts"
              slug="articles"
            />
            
            <PageTitle>Articles</PageTitle>
            <SubTitle>Tutorials, Guides and thoughts</SubTitle>

            <BlogPageContainer >

              <Grid>         
                <PostsGrid>
                  {posts.map((post,i) => (
                    <PostPreview
                      key={i} 
                      postData={post}
                    />
                  ))}
                </PostsGrid>
                <TagsGrid>
                  <Sticky>
                    <Tags tags={allTags} block />
                  </Sticky>
                </TagsGrid>
              </Grid>

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
