import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import { getAllPosts, getAllTags } from '@/lib/data/api/cms'
import config from "../lib/data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/navigation/header/header'
import Footer from '@/components/navigation/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import { useRouter } from 'next/router'
import PostTags from '@/components/post/post-tags/post-tags'

const IndexPageContainer = styled.div`
  margin: auto;
  max-width: 1200px;
`
const TitleWrapper = styled.div`
  margin: var(--space) auto var(--space) auto;
`


const MoreContainer = styled.div`
  margin: var(--space);
  text-align: right;    
  cursor: pointer;
  font-size: .6em;
  text-decoration: none;
`
const MoreArticles = styled.p`
  cursor: pointer;
  transition: 0.2s;
  :hover {
    text-decoration: underline;
  }
  :after {
    content: "\f061";
    font-family: "Line Awesome Free";
    font-weight: 900;
  }
`


const HeroWrapper = styled.div`
  width: 100%;
  margin: auto;
  padding-left: var(--space);
  padding-right: var(--space);
  background-color: var(--primary-color);
`
const Hero = styled.div`   
  display: flex;
  color: var(--thirdy-color);
  max-width: 1200px;
  padding: calc(2em + 120px) 0 calc(1.2em + 120px) 0;
  margin: 0 auto;
  ${media.lessThan('large')`
    padding: 3em 0 3em 0;
    width: 100%;
  `}
`

const HeroDescription = styled.h3`
  margin: 0 var(--space-sm);
  font-size: calc(.7em + 2vw);
  font-weight: 300;
  line-height: 1.15;
  color: var(--thirdy-color);
  font-family: var(--secondary-font);
  ${media.lessThan('medium')`
    font-size: 1.5em;
  `}
  ${media.lessThan('large')`
  margin: 0;
  `}
`

const HeroLinks = styled.a`
  font-weight: 600;
  background-image: linear-gradient(var(--thirdy-color),var(--thirdy-color));
  background-size: 100% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  font-family: var(--primary-font);
`

const HeroFont = styled.span`
  font-family: var(--primary-font);
  font-weight: 600;
`
const SubTitle = styled.p`
  padding-top: var(--space);
  padding-left: var(--space-sm);
  margin: var(--space);
  font-size: 0.75em;
  font-weight: 600;
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
             <HeroWrapper>
              <Hero>
                <HeroDescription>
                <HeroFont>Hi, I’m </HeroFont><HeroLinks href={config.socials.mail}title={config.siteTitle}>Max Dietrich</HeroLinks>, GeoData Manager and Web-Developer from Rosenheim, Germany. <br/>
                  I am also a proud member of the <HeroLinks href="https://indieweb.org/" title="IndieWeb">IndieWeb</HeroLinks> community.
                </HeroDescription>
              </Hero>
            </HeroWrapper>

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

