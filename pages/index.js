import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import { getAllPosts, getAllTags } from '@/lib/data/api/cms'
import config from "../lib/data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import { useRouter } from 'next/router'
import PostHero from '@/components/post/post-hero/post-hero'
import PostTags from '@/components/post/post-tags/post-tags'

const IndexPageContainer = styled.div`
  margin: auto;
  max-width: 1200px;
`
const TitleWrapper = styled.div`
  margin: var(--space) auto var(--space) auto;
`

const Title = styled.h2`
  max-width: auto;
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: var(--space-sm);
  color: var(--gray);
`
const Separator = styled.div`
  border-bottom: 2px solid  ${props =>
    props.color ? props.color : '#798ad0'};
  width: 10%;
  margin: auto;
`

const MoreContainer = styled.div`
  text-align: right;    
  cursor: pointer;
  margin-right: var(--space);
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--gray);
  text-decoration: none;
  ${media.lessThan('large')`
    margin-left: var(--space);
  `}
`
const MoreArticles = styled.a`
  text-align: right;    
  cursor: pointer;
  transition: 0.2s;
  :hover {
    text-decoration: underline;
  }
`


export default function Index({ allPosts, allTags }) {
  const router = useRouter()

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1, 7)

  return (
    <>
      <Layout>
        <Header/>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Home"
              slug=""
            />

            <PostHero heroData={heroPost} hero/>

            <IndexPageContainer>

              <MoreStories posts={morePosts} />
              <MoreContainer>
                <Link href={`/articles`} passHref>
                  <MoreArticles title="All Articles">All Articles{' '}</MoreArticles>
                </Link> 🡒
              </MoreContainer>
            </IndexPageContainer>

            <IndexPageContainer>

              <TitleWrapper>
                  <Title>Search by Topic</Title>
                  <Separator/>
              </TitleWrapper>

              <PostTags tags={allTags}/>

            </IndexPageContainer>
          </>
        )}
        <Footer />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = (await getAllPosts()) || []
  const allTags = (await getAllTags()) || []
  
  return {
    revalidate:  86400,
    props: { allPosts, allTags },
  }
}

