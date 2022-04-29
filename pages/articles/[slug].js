import React from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from 'src/components/article/article-body/article-body'
import Layout from 'src/components/layout/layout'
import SEO from 'src/components/seo/seo'
import { getAllPosts, getPostAndMorePosts } from 'src/data/external/cms'
import PageTitle from 'src/components/title/page-title'
import markdownToHtml from 'src/utils/markdownToHtml'
import styled from 'styled-components';
import config from "src/data/internal/SiteConfig";
import ReadingProgress from "src/components/reading-progress/reading-progress.js"
import media from 'styled-media-query';
import Webmentions from "src/components/social/webmentions/webmentions"
//import PostComments from "@/components/article/post-comments/post-comments"
import getReadTime from "src/utils/read-time"
import PostImage from "src/components/article/article-image/article-image"
import PostTitle from 'src/components/title/post-title'
import PostTags from 'src/components/tags/tags'
import { parseISO, format } from 'date-fns'
//import Comments from "@/components/comments/comments"
import HCard from "src/components/microformats/h-card"
//import Feedback from "src/components/social/feedback/feedback"
import WebActions from "src/components/social/social-share/social-share"
import Meta from "src/components/post/post-meta/post-meta"
//import Subscribe from "src/components/social/subscribe/subscribe"
import Cookie from "js-cookie"


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
  padding: var(--space-sm) 0 0 var(--space) ;
  bottom: 0;
  line-height: normal;
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

const ArticleBackground = styled.div`
  margin: auto auto var(--space-sm) auto;
  max-width: 1200px;
`

const ArticleBackgroundColor = styled.div`
  max-width: 900px;
  margin: 0 auto var(--space-sm) 0;
  background-color: var(--content-bg);
  ${media.lessThan('large')`
    padding-top: calc(var(--space-sm)*0.125);
  `}
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
              articleData={post}
            />
            <article ref={target} className="h-entry">
            {/*{Cookie.get("consent") ? <img src={`https://vg06.met.vgwort.de/na/${post.vgwortpubliccode}`} width="1" height="1" alt="" /> : null}*/}
              
             
              <HCard /> 
              
              <ReadingProgress target={target} />

              <PostImgWrapper>
                <PostImage postData={post} /> 
              </PostImgWrapper>

              <ArticleBackground>
                <ArticleBackgroundColor>
                  <PostTitleWrapper className="p-name" >  
                    <PostTitle >{post.title}</PostTitle>
                  </PostTitleWrapper> 

                  <PostWrapper>
                  <TagsWrapper><PostTags tags={post.tags}/></TagsWrapper> 
                    <DateWrapper className="dt-published"><a className="u-url" href={`articles/${post.slug}`}>{format(parseISO(post.updated_at ? post.updated_at : post.published_at), "yyyy-MM-dd")}</a></DateWrapper>


                    <Content>
        
                      <PostBody content={post.content} />   

                      {/*<Comments slug={post.slug} />
                      <Feedback /> */}
                      <WebActions slug={`/articles/${post.slug}`} />
                      <Meta post={post} slug={`/articles/${post.slug}`} syndicationLinks={post.syndicationLinks}/>
                      {/*<Likes />*/}
                      <Webmentions slug={`/articles/${post.slug}`} />



                    </Content>

                  </PostWrapper>
                </ArticleBackgroundColor>
              </ArticleBackground>

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
