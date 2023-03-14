import Layout from "src/components/layout/layout"
import config from "src/data/internal/SiteConfig"
import styled from "styled-components"
import SEO from "src/components/seo/seo"
import { useRouter } from "next/router"
import PageTitle from "src/components/title/page-title"
import Grid from "src/components/grid/grid"
import SubTitle from "src/components/title/sub-title"
import PostPreview from "src/components/article/article-preview/article-preview"
import NotePreview from "src/components/note/note-preview/note-preview"
import LinkPreview from "src/components/link/link-preview/link-preview"
import PhotoPreview from "src/components/photo/photo-preview"
import media from "styled-media-query"
import {
  getAllPosts,
  getAllNotes,
  getAllLinks,
  getAllPhotos,
} from "src/data/external/cms"

const IndexPageContainer = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto;
`

const RecentPosts = styled.ol`
  display: grid;
  margin: auto;
  margin-left: 0;
  padding-left: var(--space);
  padding-right: var(--space);
  margin-bottom: var(--space-lg);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: masonry;
  gap: var(--space);
  list-style: none;
  ${media.lessThan("medium")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  `}
`

const BlogPageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--space-lg);
  max-width: var(--width-container);
`

const PostsGrid = styled.ol`
  grid-column: span 3 / span 3;
  list-style: none;
  padding-inline-start: 0;
  display: grid;
  gap: var(--space);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  ${media.lessThan("medium")`
    padding-left: 0;
    grid-template-columns: repeat(1, minmax(0px, 1fr));
`}
`

const TagsGrid = styled.div`
  grid-column: span 1 / span 1;
  position: sticky;
  padding: var(--space-sm);
`

const Sticky = styled.div`
  position: sticky;
  top: var(--space);
`
export default function Posts({ allPosts, allNotes, allLinks, allPhotos }) {
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
              title="Posts"
              description="Articles, Photos, Notes and Links"
              slug="posts"
            />

            <PageTitle>Posts</PageTitle>
            <SubTitle>Articles, Photos, Notes and Links</SubTitle>

            <BlogPageContainer>
              <Grid>
                <PostsGrid>
                  {posts.map((post, i) => (
                    <PostPreview key={i} postData={post} />
                  ))}
                </PostsGrid>
                {/*<TagsGrid>
                  <Sticky>
                    <Tags tags={allTags} block />
                  </Sticky>
                  </TagsGrid>*/}
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
  const allNotes = (await getAllNotes()) || []
  const allLinks = (await getAllLinks()) || []
  const allPhotos = (await getAllPhotos()) || []

  return {
    revalidate: 86400,
    props: {
      props: { allPosts, allNotes, allLinks, allPhotos },
    },
  }
}
