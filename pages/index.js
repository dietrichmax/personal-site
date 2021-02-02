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
import PostTags from '@/components/post/post-tags/post-tags'
import SubTitle from '@/components/title/page-title'

const IndexPageContainer = styled.div`
  margin: auto;
  max-width: 1200px;
`
const TitleWrapper = styled.div`
  margin: var(--space) auto var(--space) auto;
`

const Hero = styled.div`
  height: 400px;
  background-color: var(--secondary-color);
`

const Title = styled.h1`
  text-align: center;
  font-size: 5rem;
  padding-top: 9rem;
  color: var(--gray-extra-light);
  margin-bottom: var(--space-lg);
  ${media.lessThan('medium')`
    margin-left: var(--space);
    margin-right: var(--space);
    font-size: 4rem;
  `}
`

const HeroDescription = styled.h3`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.4;
  ${media.lessThan('medium')`
    margin-left: var(--space);
    margin-right: var(--space);
    font-size: 2rem;
  `}
`

const MoreContainer = styled.div`
  text-align: right;    
  cursor: pointer;
  font-weight: 600;
  font-size: 1.3rem;
  color: var(--gray);
  text-decoration: none;
  margin-bottom: var(--space);
  margin-right: var(--space);
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
  :after {
    content: "\f061";
    font-family: 'Line Awesome Free';
    font-weight: 900;
  }
`


export default function Index({ allPosts, allTags }) {
  const router = useRouter()

  const posts = allPosts.slice(0, 6)

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
            <Hero>
              <Title>Welcome to my corner of the web! 👋</Title>
              <HeroDescription>My name is Max and i am making websites and gis-applications.</HeroDescription>
            </Hero>
            <IndexPageContainer>
              <SubTitle>Recent Posts</SubTitle>
              <MoreStories posts={posts} />
              <MoreContainer>
                <Link href={`/articles`} passHref>
                  <MoreArticles title="All Articles">All Articles{' '}</MoreArticles>
                </Link>
              </MoreContainer>
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

