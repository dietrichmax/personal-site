import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import PageTitle from '@/components/title/page-title'
import { getAllPostsForBlog, getAllTagsForHome } from '@/lib/api'
import Head from 'next/head'
import config from "../data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'

const BlogPageContainer = styled.div`
  margin: auto;
  max-width: 1200px;
`
const TagWrapper = styled.div`
  margin: var(--space-lg);
  padding: var(--space);
  text-align: center;
`

const TagItem = styled.button`
  background-color: ${props =>
    props.color ? props.color : '#798ad0'};
  padding: calc(var(--space-sm)*0.5);
  border-radius: calc(var(--space-sm)*0.5);
  font-size: 13px;
  text-transform: uppercase;
  margin: calc(var(--space-sm)*0.5) var(--space-sm) calc(var(--space-sm)*0.5) 0;
  color: #fff;
  transition: 0.3s;
  cursor: pointer;
  border: none;
  outline: none;
  :hover {
    background-color: white;
    color: ${props =>
      props.color ? props.color : '#798ad0'};
  }
`
export default function Blog({ allPosts, allTags }) {
  const router = useRouter()
  
  return (
    <>
      <Layout>
        <Header section="Blog" link="/"/>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Blog"
              slug="https://gis-netzwerk.com/blog"
            />
            <BlogPageContainer >
              <PageTitle>Blog</PageTitle>

              <TagWrapper>
                {allTags.map((tag, i) => (
                    <Link key={i} href={`/blog/themen/${tag.slug}`}>
                      <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
                    </Link>
                ))}
              </TagWrapper>

              {allPosts.length > 0 && <MoreStories posts={allPosts} />}

            </BlogPageContainer>
          </>
        )}
        <Footer />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = (await getAllPostsForBlog()) || []
  const allTags = (await getAllTagsForHome()) || []
  return {
    props: { allPosts, allTags },
  }
}
