import Grid from "@/src/components/grid/grid"
import Layout from "@/src/components/layout/layout"
import { getTagBySlug, getAllTagSlugs } from "@/src/data/external/cms"
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
  posts: [
    {
      id: number
      attributes: any
      type: string
    },
  ]
  tag: {
    name: string
    description: string
    slug: string
    backgroundColor: string
  }
}

export default function Tags({ posts, tag }: Tag) {
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
              {posts.map((post) =>
                post.type === "article" ? (
                  <PostPreview key={post.id} postData={post.attributes} />
                ) : post.type === "link" ? (
                  <LinkPreview key={post.id} link={post.attributes} />
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
  const tag = await getTagBySlug(params.slug)
  const allPosts = []

  tag[0].attributes.posts.data.map((post) => {
    allPosts.push({
      id: post.id,
      attributes: post.attributes,
      date: post.attributes.publishedAt,
      type: "article",
    })
  })

  tag[0].attributes.links.data.map((post) => {
    allPosts.push({
      id: post.id,
      attributes: post.attributes,
      date: post.attributes.publishedAt,
      type: "link",
    })
  })

  const sortedContent = allPosts.sort((a, b) => (a.date < b.date ? 1 : -1))

  return {
    revalidate: 86400,
    props: {
      posts: sortedContent,
      tag: tag[0],
    },
  }
}

export async function getStaticPaths() {
  const tags = await getAllTagSlugs()
  return {
    paths: tags.map((tag) => `/topics/${tag.attributes.slug}`) || [],
    fallback: false,
  }
}
