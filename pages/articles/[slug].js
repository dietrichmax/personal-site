import React from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '@/components/post/post-body/post-body'
import PostHeader from '@/components/post/post-header/post-header'
import Layout from '@/components/layout/layout'
import Newsletter from '@/components/newsletter/subscribe'
import SEO from '@/components/seo/seo'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/page-title'
import markdownToHtml from '@/lib/markdownToHtml'
import styled from 'styled-components';
import config from "@/lib/data/SiteConfig";
import ReadingProgress from "@/components/post/post-reading-progress/reading-progress.js"
import media from 'styled-media-query';
//import CoverImage from '@/components/post/post-image/cover-image'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import RelatedPosts from '@/components/post/post-preview/related-posts'
//import renderToString from 'next-mdx-remote/render-to-string'
import dynamic from 'next/dynamic'
import PostReactions from "@/components/post/post-reactions/post-reactions"
import getReadTime from "@/lib/read-time"
import TableOfContents from "@/components/post/post-toc/table-of-contents"
import toc from 'markdown-toc'

// components for posts

const PostWrapper = styled.div`
  max-width: 1400px;
  padding: 0 calc(var(--space-lg)*1.5) calc(var(--space-lg)*1.5) calc(var(--space-lg)*1.5);
  margin: var(--space-sm) auto;
  background-color: var(--primary-color);
  ${media.lessThan('medium')`
    padding-left: var(--space);
    padding-right: var(--space);
  `}
`

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8,minmax(0,1fr));
  gap: var(--space);
  ${media.lessThan('medium')`
    display: block;
  `}
`

const Sidebar = styled.div`
  display: block;
  grid-column: span 2/span 2;
  margin-top: var(--space-lg);
  ${media.lessThan('large')`
    grid-column: span 1/span 1;
  `}
`

const Content = styled.div`
  grid-column: span 4/span 4;
  ${media.lessThan('large')`
    grid-column: span 6/span 6;
  `}
`

const MorePostsWrapper = styled.div`
  background-color: var(--primary-color);
  ${media.lessThan('large')`
    padding-left: var(--space);
    padding-right: var(--space);
  `}
`

const PostDate = styled.div`
  font-size: 1.3rem;
  margin-bottom: calc(var(--space-sm) *0.5);
`;

const MoreContainer = styled.div`
  margin: var(--space) auto 0 auto;
  text-align: left;    
  cursor: pointer;
  font-weight: 600;
  font-size: 1.3rem;
  text-decoration: none;
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

const SideReactions = styled.div`
  top: 0;
  position: sticky;
  ${media.lessThan('large')`
    display: none
  `}
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
              image={post.coverImage.coverImage.formats.small.url}
              slug={`articles/${post.slug}`}
              date={post.date}
              ogType="article"
              author={post.user}
              postSEO
            />
            <article ref={target} >
              <ReadingProgress target={target} />
              {/*{post.coverImage.coverImage ? (
              <CoverImage title={post.title} alt={post.title} url={post.coverImage.coverImage.url} caption={post.coverImage.caption}/>
              ) : null }*/}

              <PostWrapper>
                <PostGrid>

                  <Sidebar>
                  </Sidebar>

                  <Content>
                    <MoreContainer>
                      <Link href={`/articles`} passHref>
                        <MoreArticles title="Back to all articles">{' '}Back to Articles</MoreArticles>
                      </Link>
                    </MoreContainer>

                    <PostHeader postData={post} />          



                    <PostBody content={post.content} />
                    
                    <PostReactions postID={post.id}/>

                    
                    <RelatedPosts relatedPosts={morePosts} />
                  </Content>

                  <Sidebar>
                      
                    {/*<SideReactions>
                      <PostReactions postID={post.id}/>
                    </SideReactions>*/}
                    <TableOfContents content={post.toc}/>
                  </Sidebar>
                  
                </PostGrid>
              </PostWrapper>

            
              <Newsletter />
            </article>
            
          </>
        )}     
      <Footer />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPostAndMorePosts(params.slug)
  const mdxSource = await markdownToHtml(data?.posts[0]?.content || '')
  const excerpt = await markdownToHtml(data?.posts[0]?.excerpt || '')
  const readingTime = getReadTime(mdxSource); 
  const tocContent = await markdownToHtml(toc(data?.posts[0]?.content || '').content)

  return {
    revalidate:  86400,
    props: {
      post: {
        ...data?.posts[0],
        readingTime: readingTime,
        content: mdxSource,
        excerpt,
        toc: tocContent
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
