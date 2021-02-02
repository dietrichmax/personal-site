import React from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '@/components/post/post-body/post-body'
import MoreStories from '@/components/post/post-preview/more-stories'
import PostHeader from '@/components/post/post-header/post-header'
import Layout from '@/components/layout/layout'
import Newsletter from '@/components/newsletter/subscribe'
import SEO from '@/components/seo/seo'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/page-title'
import markdownToHtml from '@/lib/markdownToHtml'
import styled from 'styled-components';
import ReadingProgress from "@/components/post/post-reading-progress/reading-progress.js"
import media from 'styled-media-query';
import CoverImage from '@/components/post/post-image/cover-image'
import config from "../../lib/data/SiteConfig";
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import Date from '@/components/date/date' 


// components for posts

const PostWrapper = styled.div`
  max-width: 720px;
  padding: 0 calc(var(--space-lg)*1.5) calc(var(--space-lg)*1.5) calc(var(--space-lg)*1.5);
  margin: var(--space-sm) auto;
  background-color: var(--bg-dark);
  ${media.lessThan('large')`
    padding-left: var(--space);
    padding-right: var(--space);
  `}
`

const MorePostsWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space) auto;
`

const MorePostsTitle = styled.p`
  letter-spacing: 0.35px;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray);
  margin-top: var(--space);
  margin-left: var(--space);
  margin-bottom: var(--space-sm);
`

const PostDate = styled.div`
  font-size: 1.3rem;
  margin-bottom: calc(var(--space-sm) *0.5);
`;

const MoreContainer = styled.div`
  max-width: 720px;
  margin: var(--space) auto;
  text-align: left;    
  cursor: pointer;
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--gray);
  text-decoration: none;
  ${media.lessThan('medium')`
    margin-left: var(--space);
  `}
`
const MoreArticles = styled.a`
  cursor: pointer;
  transition: 0.2s;
  :hover {
    text-decoration: underline;
  }
  :before {
    content: "\f060";
    font-family: "Line Awesome Free";
    font-weight: 900;
  }
`

export default function Post({ post, morePosts }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const target = React.createRef()


  return (
    <Layout>
      <Header/>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO   
              title={post.title}
              description={post.excerpt}
              image={post.coverImage.coverImage.url}
              slug={`articles/${post.slug}`}
              date={post.date}
              ogType="article"
            />
            <article ref={target} >
              <ReadingProgress target={target} />
              {/*{post.coverImage.coverImage ? (
              <CoverImage title={post.title} alt={post.title} url={post.coverImage.coverImage.url} caption={post.coverImage.caption}/>
              ) : null }*/}

              <MoreContainer>
                <Link href={`/articles`} passHref>
                  <MoreArticles title="Back to all articles">{' '}Back to Articles</MoreArticles>
                </Link>
              </MoreContainer>

              <PostWrapper>
                <PostHeader postData={post} />                
                <PostDate>
                  <Date dateString={post.date} />
                </PostDate>
                {/* <PostBody content={post.excerpt} /> */}


                <PostBody content={post.content} />
              </PostWrapper>

            </article>
            
            <Newsletter />
            <MorePostsWrapper>
              <MorePostsTitle><Link href="/articles" title="More Articles">More Articles:</Link></MorePostsTitle>
              {morePosts.length > 0 && <MoreStories posts={morePosts}/>}
            </MorePostsWrapper>
          </>
        )}     
      <Footer />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPostAndMorePosts(params.slug)
  const content = await markdownToHtml(data?.posts[0]?.content || '')
  const excerpt = await markdownToHtml(data?.posts[0]?.excerpt || '')

  return {
    revalidate:  86400,
    props: {
      post: {
        ...data?.posts[0],
        content,
        excerpt,
      },
      morePosts: data?.morePosts,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map((post) => `/articles/${post.slug}`) || [],
    fallback: true,
  }
}
