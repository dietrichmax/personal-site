import React from "react"
import Layout from "@/src/components/layout/layout"
import SEO from "@/src/components/seo/seo"
import { getPostBySlug, getAllPosts } from "@/src/data/external/cms"
import PostBody from "@/src/components/article/article-body/article-body"
import { getToc } from "@/src/utils/getToc"
import styled from "styled-components"
import ReadingProgress from "@/src/components/reading-progress/reading-progress"
import media from "styled-media-query"
import getReadTime from "@/src/utils/read-time"
import PostImage from "@/src/components/article/article-image/article-image"
import PostTitle from "@/src/components/title/post-title"
//import PostTags from 'src/components/tags/tags'
import HCard from "@/src/components/microformats/h-card"
import WebActions from "@/src/components/social/social-share/social-share"
import { serialize } from "next-mdx-remote/serialize"
import RecommendedPosts from "@/components/recommended-articles/recommendedArticles"
import DynamicMeta from "@/src/components/post/post-meta/post-meta"
import DynamicSubscribe from "@/src/components/social/newsletter/subscribe"
import DynamicWebmentions from "@/src/components/social/webmentions/webmentions"
import DynamicAuthor from "@/components/article/article-author/article-author"

const ArticleBackground = styled.div`
  margin: auto auto var(--space-sm) auto;
  max-width: 1300px;
  display: grid;
  grid-template-columns: 82px;
  ${media.lessThan("large")`
    display: block;
  `}
`

const StickySideBar = styled.div``

const DateWrapper = styled.div`
  text-align: center;
  font-size: 12px;
  ${media.lessThan("large")`
    text-align: left;
    margin-left: var(--space);
  `}
  ${media.lessThan("medium")`
    margin-left: var(--space-sm);
  `}
`

const StickySocialShareContainer = styled.div`
  top: var(--space-sm);
  position: sticky;
  margin-left: var(--space);
  margin-right: var(--space);
  margin-top: var(--space);
  grid-column: span 1 / span 1;
  ${media.lessThan("large")`
    display: none;
  `}
`

const SocialShareContainer = styled.div`
  display: none;
  ${media.lessThan("large")`
    display: inline-block;
  `}
`

const ArticleBackgroundColor = styled.div`
  grid-column: span 1;
  max-width: 100%;
  margin: 0 auto var(--space-sm) 0;
  border-left: 1px solid var(--content-bg);
  ${media.lessThan("large")`
    padding-top: calc(var(--space-sm)*0.125);
    border-left: none;
  `}
`

const ArticleContainer = styled.div`
  max-width: calc(1300-82) px;
  margin: 0 auto var(--space-sm) 0;
  ${media.lessThan("large")`
    padding-top: calc(var(--space-sm)*0.125);
  `}
`

// components for posts
const PostWrapper = styled.div`
  max-width: 1200px;
  padding: 0 var(--space);
  margin: var(--space-sm) auto var(--space-sm) auto;
  ${media.lessThan("medium")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const PostImgWrapper = styled.div`
  max-width: 1300px;
  margin: calc(var(--space-lg) * 1.75) auto var(--space-sm) auto;
  position: relative;
`

const Content = styled.div`
  grid-column: span 4 / span 4;
  ${media.lessThan("large")`
    grid-column: span 6/span 6;
  `}
`

const PostTitleWrapper = styled.div`
  padding: var(--space-sm) 0 0 var(--space);
  bottom: 0;
  line-height: normal;
  ${media.lessThan("large")`
    position: relative;
    margin: var(--space-sm) var(--space);
    padding: 0;
  `}
  ${media.lessThan("medium")`
    margin: var(--space-sm);
  `}
`

interface Post {
  post: {
    id: number
    title: string
    slug: string
    excerpt: string
    coverImage: {
      url: string
    }
    content: string
    toc: string
    date: any
    updated_at: string
    published_at: string
    syndicationLinks: any
    user: object
  }
}

export default function Post({ post }: Post) {
  const target = React.createRef<HTMLInputElement>()

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={
          post.coverImage
            ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.coverImage.url}`
            : ""
        }
        slug={`articles/${post.slug}`}
        ogType="article"
        articleSchema={true}
        articleData={post}
      />
      <article ref={target} className="h-entry">
        <HCard />

        <ReadingProgress target={target} />

        <PostImgWrapper>
          <PostImage postData={post} />
        </PostImgWrapper>

        <ArticleBackground>
          <StickySideBar>
            <DateWrapper className="dt-published">
              <a className="u-url" href={`articles/${post.slug}`}>
                {new Date(
                  post.updated_at ? post.updated_at : post.published_at
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </a>
            </DateWrapper>
            <StickySocialShareContainer>
              <WebActions
                slug={`/articles/${post.slug}`}
                syndicationLinks={post.syndicationLinks}
                title={post.title}
                excerpt={post.excerpt}
              />
            </StickySocialShareContainer>
          </StickySideBar>

          <ArticleContainer>
            <PostTitleWrapper className="p-name">
              <PostTitle>{post.title}</PostTitle>
            </PostTitleWrapper>

            <ArticleBackgroundColor>
              <PostWrapper>
                {/*<TagsWrapper><PostTags tags={post.tags} /></TagsWrapper>*/}
                {/*<GoogleAdsenseContainer client={process.env.NEXT_PUBLIC_ADSENSE_ID} slot="4628674793"></GoogleAdsenseContainer>*/}

                <PostBody content={post.content} toc={post.toc} />
                <Content>
                  {/*<Feedback /> */}
                  <DynamicMeta
                    post={post}
                    slug={`/articles/${post.slug}`}
                    syndicationLinks={post.syndicationLinks}
                  />
                  <SocialShareContainer>
                    <WebActions
                      slug={`/articles/${post.slug}`}
                      syndicationLinks={post.syndicationLinks}
                      title={post.title}
                      excerpt={post.excerpt}
                    />
                  </SocialShareContainer>
                  {/*<Likes />*/}
                  <DynamicWebmentions
                    slug={`/articles/${post.slug}`}
                    preview={false}
                  />
                  <DynamicAuthor post={post.user} />
                  <DynamicSubscribe />
                </Content>
              </PostWrapper>
            </ArticleBackgroundColor>
          </ArticleContainer>
          <RecommendedPosts post={post} />
        </ArticleBackground>
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPostBySlug(params.slug)
  const markdownContent = (await data?.posts[0]?.content) || ""
  const content = await serialize(markdownContent)
  const toc = getToc(markdownContent)
  const readingTime = getReadTime(markdownContent)

  return {
    revalidate: 86400,
    props: {
      post: {
        updated_at: new Date(data.posts[0].updated_at).toLocaleDateString(
          "en-US"
        ),
        published_at: new Date(data.posts[0].published_at).toLocaleDateString(
          "en-US"
        ),
        title: data.posts[0].title,
        slug: data.posts[0].slug,
        excerpt: data.posts[0].excerpt,
        tags: data.posts[0].tags,
        coverImage: data.posts[0].coverImage,
        syndicationLinks: data.posts[0].syndicationLinks,
        user: data.posts[0].user,
        readingTime: readingTime,
        content,
        toc,
      },
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts()

  return {
    paths: allPosts.map(post => `/articles/${post.slug}`),
    fallback: false,
  }
}
