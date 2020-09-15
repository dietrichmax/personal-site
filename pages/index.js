import MoreStories from '@/components/post/post-preview/more-stories'
import MoreJobs from '@/components/job/job-preview/more-jobs'
import Layout from '@/components/layout/layout'
import { getAllPosts, getAllJobs, getAllTags } from '@/lib/api'
import Head from 'next/head'
import config from "../data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import Dots from '@/components/funky-stuff/dots'
import { useRouter } from 'next/router'
import PostHero from '@/components/post/post-hero/post-hero'

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

const TagWrapper = styled.div`
  margin: var(--space-lg);
  padding: var(--space-lg);
  text-align: center;
  background-color: #fff;
  border: 1px solid var(--gray-light);
  border-radius: calc(var(--space-sm)*0.5);
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
const JobboardTeaser = styled.div`
  width: 100%;
  background-color: var(--primary-color);
  color: #fff;
  margin-bottom: var(--space);
  border-top: 2px solid var(--gray-light);
  border-bottom: 2px solid var(--gray-light);
  background: 
    linear-gradient(135deg, var(--primary-color) 35%, transparent 235%) -50px 0,
    linear-gradient(225deg, var(--primary-color) 35%, transparent 25%) -30px 0,
    linear-gradient(315deg, var(--primary-color) 45%, transparent 25%);
`

const JobboardTextWrapper = styled.div`
  max-width: 1200px;
  margin: auto; 
`

const JobboardTitle = styled.div`
  margin-left: var(--space);
  letter-spacing: 0.35px;
  font-size: 2.2rem;
  padding-top: var(--space-sm);
  :hover {
    color: var(--gray-light);
  }
`

const JobboardSubline = styled.div`
  font-weight: 200;
  margin-left: var(--space);
  letter-spacing: -0.1px;
  font-size: 1.5rem;
  margin-bottom: var(--space-sm);
`




export default function Index({ allPosts, allJobs, allTags }) {
  const router = useRouter()

  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1, 4)
  const evenMorePosts = allPosts.slice(4)
  const previewJobs = allJobs.slice(0, 3)
  
  return (
    <>
      <Layout>
        <Header/>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Startseite"
              slug="https://gis-netzwerk.com"
            />

            <PostHero heroData={heroPost} hero/>

            <IndexPageContainer >

              <MoreStories posts={morePosts} />
            </IndexPageContainer>

              <JobboardTeaser>
                <JobboardTextWrapper>
                  <JobboardTitle><Link href="/jobs"><a title="Zum Stellenmarkt">Der GIS-Netzwerk Stellenmarkt.</a></Link></JobboardTitle>
                  <JobboardSubline>...für alle, die mehr bewegen wollen.</JobboardSubline>
                </JobboardTextWrapper>
                <MoreJobs jobs={previewJobs} />
              </JobboardTeaser>

            <IndexPageContainer >
              <Dots/>

              <MoreStories posts={evenMorePosts} />

              <TitleWrapper>
                  <Title>Nach Thema durchsuchen</Title>
                  <Separator/>
              </TitleWrapper>

              <TagWrapper>
                {allTags.map((tag, i) => (
                  
                    <Link key={i} href={`/blog/themen/${tag.slug}`} passHref>
                      <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
                    </Link>
                ))}
              </TagWrapper>

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
  const allJobs = (await getAllJobs()) || []
  const allTags = (await getAllTags()) || []
  
  return {
    props: { allPosts, allJobs, allTags },
  }
}

