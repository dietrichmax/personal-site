import React from "react"
import { useRouter } from "next/router"
import ErrorPage from "next/error"
import PostBody from "src/components/article/article-body/article-body"
import Layout from "src/components/layout/layout"
import SEO from "src/components/seo/seo"
import { getAllPosts, getPostAndMorePosts } from "src/data/external/cms"
import PageTitle from "src/components/title/page-title"
import markdownToHtml from "src/utils/markdownToHtml"
import styled from "styled-components"
import config from "src/data/internal/SiteConfig"
import ReadingProgress from "src/components/reading-progress/reading-progress.js"
import media from "styled-media-query"
import Webmentions from "src/components/social/webmentions/webmentions"
//import PostComments from "@/components/article/post-comments/post-comments"
import getReadTime from "src/utils/read-time"
import PostImage from "src/components/article/article-image/article-image"
import PostTitle from "src/components/title/post-title"
//import PostTags from 'src/components/tags/tags'
import { parseISO, format } from "date-fns"
//import Comments from "@/components/comments/comments"
import HCard from "src/components/microformats/h-card"
//import Feedback from "src/components/social/feedback/feedback"
import WebActions from "src/components/social/social-share/social-share"
import Meta from "src/components/post/post-meta/post-meta"
import Subscribe from "src/components/social/newsletter/subscribe"
//import { GoogleAdsenseContainer } from "@/components/google-adsense/google-adsense"
import RecommendedPosts from "@/components/recommended-articles/recommendedArticles"
import Author from "@/components/article/article-author/article-author"

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
  margin: calc(var(--space-lg) * 2.5) auto var(--space-sm) auto;
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

const TagsWrapper = styled.div`
  margin: var(--space-sm) 0;
`

const RecommendedPostsContainer = styled.div`
  margin-bottom: var(--space);
  grid-column: span 2;
  display: grid;
  grid-gap: var(--space);
  grid-template-columns: auto auto auto;
  margin-left: var(--space);
  margin-right: var(--space);
  ${media.lessThan("large")`
    grid-template-columns: repeat(2, minmax(auto, 1fr));
    grid-gap: var(--space-sm);
  `}
  ${media.lessThan("medium")`
    grid-template-columns: repeat(1, minmax(auto, 1fr));
    margin-left: var(--space-sm);
    margin-right: var(--space-sm);
  `}
`

const RecommendedPostTitle = styled.h3`
  margin-top: var(--space);
  margin-left: var(--space);
  padding-left: var(--space-sm);
  margin-bottom: var(--space-sm);
  grid-column: span 3;
  font-size: 1.5rem;
  font-weight: 600;
  ${media.lessThan("large")`
    margin-left: var(--space);
  `}
  ${media.lessThan("medium")`
    margin-left: var(--space-sm);
  `}
`

const NewsletterTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`

export default function Post({ post, allPosts }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const target = React.createRef()

  return (
    <Layout>
      {router.isFallback ? (
        <PageTitle>{config.loading}</PageTitle>
      ) : (
        <>
          <SEO
            title={post.title}
            description={post.excerpt}
            image={
              post.coverImage
                ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.coverImage.url}`
                : ""
            }
            slug={`articles/${post.slug}`}
            date={post.updated_at ? post.updated_at : post.published_at}
            ogType="article"
            articleSchema
            articleData={post}
          />
          <article ref={target} className="h-entry">
            <img
              src={`https://vg06.met.vgwort.de/na/${post.vgwortpubliccode}`}
              width="1"
              height="1"
              alt="vgwortpixel"
            />

            <HCard />

            <ReadingProgress target={target} />

            <PostImgWrapper>
              <PostImage postData={post} />
            </PostImgWrapper>

            <ArticleBackground>
              <StickySideBar>
                <DateWrapper className="dt-published">
                  <a className="u-url" href={`articles/${post.slug}`}>
                    {format(parseISO(post.published_at), "yyyy-MM-dd")}
                  </a>
                </DateWrapper>
                <StickySocialShareContainer>
                  <WebActions
                    slug={`/articles/${post.slug}`}
                    id={post.id}
                    syndicationLinks={post.syndicationLinks}
                    post={post}
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

                    <Content>
                      <PostBody content={post.content} />
                      {/*<Comments slug={post.slug} />
                      <Feedback /> */}
                      <Meta
                        post={post}
                        slug={`/articles/${post.slug}`}
                        syndicationLinks={post.syndicationLinks}
                      />
                      <SocialShareContainer>
                        <WebActions
                          slug={`/articles/${post.slug}`}
                          syndicationLinks={post.syndicationLinks}
                        />
                      </SocialShareContainer>
                      <Author post={post.user} />
                      {/*<Likes />*/}
                      <Webmentions slug={`/articles/${post.slug}`} />

                      <div>
                        <NewsletterTitle>Newsletter</NewsletterTitle>
                        <Subscribe />
                      </div>
                    </Content>
                  </PostWrapper>
                </ArticleBackgroundColor>
              </ArticleContainer>

              <RecommendedPostTitle>Continue Reading</RecommendedPostTitle>
              <RecommendedPostsContainer>
                <RecommendedPosts post={post} allPosts={allPosts} />
              </RecommendedPostsContainer>
            </ArticleBackground>
          </article>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPostAndMorePosts(params.slug)
  const content = data?.posts[0]?.content || ""
  const excerpt = await markdownToHtml(data?.posts[0]?.excerpt || "")
  const readingTime = getReadTime(content)
  const allPosts = await getAllPosts()

  //const morePosts = data?.morePosts || ''
  //console.log(morePosts)

  return {
    props: {
      post: {
        ...data?.posts[0],
        readingTime: readingTime,
        content,
        excerpt,
      },
      allPosts,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts()
  return {
    paths: allPosts?.map((post) => `/articles/${post.slug}`) || [],
    fallback: true,
  }
}
