import MoreStories from '@/components/post/post-preview/more-stories'
import MoreJobs from '@/components/job/job-preview/more-jobs'
import Layout from '@/components/layout/layout'
import { getAllPostsForHome, getAllJobsForHome, getAllTagsForHome } from '@/lib/api'
import Head from 'next/head'
import config from "../data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/headerNav'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'

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

export default function Index({ allPosts, allJobs, allTags }) {
  const router = useRouter()

  
  return (
    <>
      <Layout>
      {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          
        <>
          <SEO   
            title="Startseite"
            slug="https://gis-netzwerk.com"
          />
          <Header link="/"/>
          <IndexPageContainer >

            <TitleWrapper>
                <Title><Link href="/jobs"><a title="Zur Jobbörse">Die aktuellsten Jobs aus der Jobbörse</a></Link></Title>
                <Separator/>
            </TitleWrapper>
            <MoreJobs jobs={allJobs} />

            <TitleWrapper>
                <Title><Link href="/blog"><a title="Zum Blog">Aus dem Blog</a></Link></Title>
                <Separator/>
            </TitleWrapper>
            <MoreStories posts={allPosts} />
            
            <TitleWrapper>
                <Title>Alle Themen</Title>
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
          <Footer />
        </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = (await getAllPostsForHome()) || []
  const allJobs = (await getAllJobsForHome()) || []
  const allTags = (await getAllTagsForHome()) || []
  
  return {
    props: { allPosts, allJobs, allTags },
  }
}
