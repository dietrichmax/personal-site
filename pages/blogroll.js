import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import { getAllBlogrolls } from '@/lib/data/api/cms'
import Head from 'next/head'
import config from "../lib/data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/navigation/header/header'
import Footer from '@/components/navigation/footer/footer'
import Link from 'next/link'
import Image from 'next/image'
import media from "styled-media-query"
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'

const BlogrollContainer = styled.ol`
  max-width: 1200px;
  padding-inline-start: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(20rem,1fr));
  grid-gap: 2rem;
  margin: var(--space-lg) auto var(--space-lg) auto;
  padding-left: var(--space);
  padding-right: var(--space);
  list-style-type: none;
  ${media.lessThan('1200px')`
    margin: var(--space-sm);
    padding: 0;
`}
`

const BlogrollItem = styled.li`
  position: relative;
  padding: var(--space-sm) var(--space);
  transition: 0.2s;
  height: 100%;
  border: 1px solid var(--gray);;
  border-radius: var(--space-sm);
  :hover {
    cursor: pointer; 
  }
`

const BlogrollProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-sm);
`

const BlogrollProfileImgWrapper = styled.div`
  margin-right: var(--space);
`

const BlogRollProfileImg = styled(Image)`
  flex: none;
  max-width: 70px;
  object-fit: cover;
  border-radius: 50%;
`

const BlogrollProfileName = styled.span`
  font-size: 1em;
`

const BlogrollLink = styled.a`
  outline: none;
`

const BlogrollProfileLink = styled.a`
  display: block;
  color: var(--link-color);
  font-size: .6em;
`

const BlogrollProfileDesc = styled.p`
  font-size: .75em;
`
const SubTitle = styled.p`
  max-width: 1200px;
  margin: auto;
  padding-left: var(--space);
  padding-right: var(--space);
  font-size: 1.5rem;
  font-weight: 200;
  line-height: 1.4;
  color: var(--gray);
  ${media.lessThan('1200px')`
    margin: var(--space-sm);
    padding: 0;
`}
`
export default function Blogroll({ allBlogrolls }) {
  const router = useRouter()


  return (
    <>
      <Layout>
        <Header/>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Blogroll"
              slug="blogroll"
            />
            
            <PageTitle>Blogroll</PageTitle>
            <SubTitle>Awesome people on the web, in random order.</SubTitle>

            <BlogrollContainer >

            {allBlogrolls.map((blogroll) => (
              <BlogrollLink href={blogroll.websiteUrl} title={blogroll.name} >
                <BlogrollItem >
                  <BlogrollProfile>
                    {blogroll.profilePictureUrl ? (
                    <BlogrollProfileImgWrapper>
                      <BlogRollProfileImg
                        src={blogroll.profilePictureUrl}
                        width="70"
                        height="70"
                        alt={blogroll.name}
                      /> 
                      </BlogrollProfileImgWrapper>
                    ) : null }
                  <div>
                    <BlogrollProfileName>{blogroll.name}</BlogrollProfileName>
                    <BlogrollProfileLink>{blogroll.websiteUrl}</BlogrollProfileLink>
                  </div>
                  </BlogrollProfile>
                  <BlogrollProfileDesc>{blogroll.bio}</BlogrollProfileDesc>
                </BlogrollItem>
              </BlogrollLink>
            ))}

              

            </BlogrollContainer>
          </>
        )}
        <Footer />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allBlogrolls = (await getAllBlogrolls()) || []
  
  return {
    revalidate:  86400,
    props: { allBlogrolls },
  }
}
