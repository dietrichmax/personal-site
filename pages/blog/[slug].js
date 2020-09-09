import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '@/components/post/post-body/post-body'
import MoreStories from '@/components/post/post-preview/more-stories'
import PostHeader from '@/components/post/post-header/post-header'
import Layout from '@/components/layout/layout'
import Newsletter from '@/components/newsletter/subscribe'
import SEO from '@/components/seo/seo'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PageTitle from '@/components/title/page-title'
import markdownToHtml from '@/lib/markdownToHtml'
import styled from 'styled-components';
import ReadingProgress from "@/components/post/post-reading-progress/reading-progress.js"
import media from 'styled-media-query';
import CoverImage from '@/components/post/post-image/cover-image'
import config from "../../data/SiteConfig";
import Header from '@/components/header/headerNav'
import Footer from '@/components/footer/footer'
import Link from 'next/link'

const PostWrapper = styled.div`
  max-width: 720px;
  padding: 0 calc(var(--space-lg)*1.5) calc(var(--space-lg)*1.5) calc(var(--space-lg)*1.5);
  margin: var(--space) auto var(--space) auto;
  background-color: #fff;
  border: 1px solid var(--gray-light);;
  ${media.lessThan('large')`
    padding-left: var(--space);
    padding-right: var(--space);
  `}
`

const MorePostsWrapper = styled.div`
  max-width: 1140px;
  margin: var(--space) auto;
  background-color: #fff;
  border: 1px solid var(--gray-light);;
`

const MorePostsTitle = styled.h4`
  font-size: 1.5rem;
  padding: var(--space);
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
`

export default function Post({ post, morePosts }) {
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
              image={post.coverImage.coverImage.url}
              slug={`https://gis-netzwerk.com/blog/${post.slug}`}
              date={post.date}
              lang={post.lang}
              ogType="article"
              postSEO
            />
            <Header section="Blog" link="/blog" />
            <article ref={target} >
              <ReadingProgress target={target} />
              <CoverImage title={post.title} url={post.coverImage.coverImage.url} caption={post.coverImage.caption}/>
              <PostWrapper>
              <PostHeader
                title={post.title}
                date={post.date}
                author={post.user}
                tags={post.tags}
              />
                <PostBody content={post.content} />
              </PostWrapper>
            </article>
            <Newsletter />
            <MorePostsWrapper>
              <MorePostsTitle><Link href="/blog"><a>Mehr Artikel:</a></Link></MorePostsTitle>
              {morePosts.length > 0 && <MoreStories posts={morePosts} afterPost/>}
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

  return {
    props: {
      post: {
        ...data?.posts[0],
        content,
      },
      morePosts: data?.morePosts,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: allPosts?.map((post) => `/blog/${post.slug}`) || [],
    fallback: true,
  }
}
