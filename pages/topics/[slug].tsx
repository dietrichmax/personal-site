import Grid from "@/src/components/grid/grid"
import Layout from "@/src/components/layout/layout"
import { getTag, getAllTags } from "@/src/data/external/cms"
import PageTitle from "@/src/components/title/tag-title"
import styled from "styled-components"
import SubTitle from "@/src/components/title/sub-title"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import PostPreview from "@/src/components/article/article-preview/article-preview"
import LinkPreview from "@/components/link/link-preview/link-preview"

const TagContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto var(--space) auto;
`

const TagPostsContainer = styled.div``

const PostsGrid = styled.ol`
  grid-column: span 3 / span 3;
  list-style: none;
  padding-inline-start: 0;
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  ${media.lessThan("large")`
    padding-left: 0;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  `}
  ${media.lessThan("medium")`
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  `}
`

interface Tag {
  posts: Array<any>
  tag: any
  type: string
  post: any
  link: any
}

export default function Tags({ posts, tag }: Tag) {
  const content = posts

  return (
    <Layout>
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
              {content.map((post: Tag, i: number) =>
                post.type === "article" ? (
                  <PostPreview key={i} postData={post.post} />
                ) : post.type === "link" ? (
                  <LinkPreview key={i} link={post.link} />
                ) : null
              )}
            </PostsGrid>
          </Grid>
        </TagPostsContainer>
      </TagContainer>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getTag(params.slug)
  const allContent = []
  const posts = data.tags[0].posts
  posts.map((post) => {
    allContent.push({
      post: post,
      date: post.published_at,
      type: "article",
    })
  })

  const sortedContent = allContent.sort((a, b) => (a.date < b.date ? 1 : -1))

  return {
    revalidate: 86400,
    props: {
      posts: sortedContent,
      tag: data.tags[0],
    },
  }
}

export async function getStaticPaths() {
  const allTags = await getAllTags()
  return {
    paths: allTags?.map((tag) => `/topics/${tag.slug}`) || [],
    fallback: false,
  }
}
