import React from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '@/components/article/article-body/article-body'
import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import { getAllPosts, getPostAndMorePosts } from '@/lib/data/external/cms'
import PageTitle from '@/components/title/page-title'
import markdownToHtml from '@/lib/utils/markdownToHtml'
import styled from 'styled-components';
import config from "@/lib/data/internal/SiteConfig";
import ReadingProgress from "@/components/reading-progress/reading-progress.js"
import media from 'styled-media-query';
import Webmentions from "@/components/social/webmentions/webmentions"
//import PostComments from "@/components/article/post-comments/post-comments"
import getReadTime from "@/lib/utils/read-time"
import PostImage from "@/components/article/article-image/article-image"
import PostTitle from '@/components/title/post-title'
import PostTags from '@/components/tags/tags'
import { parseISO, format } from 'date-fns'
//import Comments from "@/components/comments/comments"
import HCard from "@/components/microformats/h-card"
//import Likes from "@/components/social/favorites/favorites"
import WebActions from "@/components/social/feedback/feedback"
import SyndicationLinks from "@/components/microformats/syndication-links"


// components for posts
const PostWrapper = styled.div`
  max-width: 1200px;
  padding: 0 var(--space);
  margin: var(--space-sm) auto var(--space-sm) auto;
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const PostImgWrapper = styled.div`
  max-width: 1300px;
  margin: calc(var(--space-lg)*2.5) auto var(--space-sm) auto;
  position: relative;
`


const Content = styled.div`
  grid-column: span 4/span 4;
  ${media.lessThan('large')`
    grid-column: span 6/span 6;
  `}
`

const PostTitleWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space-sm) auto var(--space-lg) 5rem;
  bottom: 0;
  ${media.lessThan('large')`
    position: relative;
    margin: var(--space-sm) var(--space);
    padding: 0;
  `}
  ${media.lessThan('medium')`
    margin: var(--space-sm);
  `}
`

const TagsWrapper = styled.div`
  margin: var(--space-sm) 0;
`

const DateWrapper = styled.div`
  font-size: 12px;
`

const SyndicationLinksWrapper = styled.div`
  text-align: right;
`


export default function Post({ post }) {  

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
              image={post.coverImage ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${post.coverImage.url}` : ""}
              slug={`articles/${post.slug}`}
              date={post.updated_at ? post.updated_at : post.published_at}
              ogType="article"
              articleSchema
            />
            <article ref={target} className="h-entry">
             
              <HCard /> 
              
              <ReadingProgress target={target} />

              <PostImgWrapper>
                <PostImage postData={post} /> 
                <PostTitleWrapper className="p-name" >  
                  <PostTitle >{post.title}</PostTitle>
                </PostTitleWrapper> 
              </PostImgWrapper>

              <PostWrapper>
              <TagsWrapper><PostTags tags={post.tags}/></TagsWrapper> 
                <DateWrapper className="dt-published">{format(parseISO(post.updated_at ? post.updated_at : post.published_at), "yyyy-MM-dd")}</DateWrapper>


                <Content>
    
                  <PostBody content={post.content} />   

                  
                  <SyndicationLinksWrapper>
                    <SyndicationLinks syndicationLinks={post.syndicationLinks} />
                  </SyndicationLinksWrapper>
                  {/*<Comments slug={post.slug} />*/}
                  <WebActions slug={`/articles/${post.slug}`} />
                  {/*<Likes />*/}
                  <Webmentions slug={`/articles/${post.slug}`} />


                </Content>

              </PostWrapper>

            </article>
            
          </>
        )}     
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPostAndMorePosts(params.slug)
  const content = data?.posts[0]?.content || ''
  const excerpt = await markdownToHtml(data?.posts[0]?.excerpt || '')
  const readingTime = getReadTime(content); 


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
