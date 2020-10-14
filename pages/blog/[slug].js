import React from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '@/components/post/post-body/post-body'
import MoreStories from '@/components/post/post-preview/more-stories'
import PostHeader from '@/components/post/post-header/post-header'
import Layout from '@/components/layout/layout'
import Newsletter from '@/components/newsletter/subscribe'
import SEO from '@/components/seo/seo'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api/cms'
import PageTitle from '@/components/title/page-title'
import markdownToHtml from '@/lib/markdownToHtml'
import styled from 'styled-components';
import ReadingProgress from "@/components/post/post-reading-progress/reading-progress.js"
import media from 'styled-media-query';
import CoverImage from '@/components/post/post-image/cover-image'
import config from "../../data/SiteConfig";
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import RIWAAD from '@/components/ads/riwa/mobile-vermessung/mobile-vermessung'
import Date from '@/components/date/date' 



// components for posts

const PostWrapper = styled.div`
  max-width: 720px;
  padding: 0 calc(var(--space-lg)*1.5) calc(var(--space-lg)*1.5) calc(var(--space-lg)*1.5);
  margin: var(--space-sm) auto;
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

const MorePostsTitle = styled.p`
  letter-spacing: 0.35px;
  font-size: 1.5rem;
  font-weight: bold;
  font-color: var(--gray);
  padding: var(--space) 0 var(--space-sm) var(--space);
`

const PostDate = styled.div`
  font-size: 1.3rem;
  margin-bottom: calc(var(--space-sm) *0.5);
`;

const MoreContainer = styled.div`
  max-width: 720px;
  margin: var(--space-sm) auto;
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
              slug={`https://gis-netzwerk.com/blog/${post.slug}`}
              date={post.date}
              lang={post.lang}
              ogType="article"
              postSEO
            />
            <article ref={target} >
              <ReadingProgress target={target} />
              <CoverImage title={post.title} alt={post.title} url={post.coverImage.coverImage.formats.large.url} caption={post.coverImage.caption}/>

              <MoreContainer>
                🡐 
                <Link href={`/blog`} passHref>
                  <MoreArticles title="Zurück zum Blog">{' '}Zurück</MoreArticles>
                </Link>
              </MoreContainer>

              <PostWrapper>
                <PostHeader postData={post} />                
                <PostDate>
                  <Date dateString={post.date} />
                </PostDate>
                {/* <RIWAAD allTags={post.tags} /> */}
                <PostBody content={post.excerpt} />


                <PostBody content={post.content} />
              </PostWrapper>

            </article>
            
            <Newsletter />
            <MorePostsWrapper>
              <MorePostsTitle><Link href="/blog"><a title="Zum Blog">Mehr Artikel:</a></Link></MorePostsTitle>
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
    paths: allPosts?.map((post) => `/blog/${post.slug}`) || [],
    fallback: true,
  }
}
