import MoreStories from '@/components/post/post-preview/more-stories'
import Layout from '@/components/layout/layout'
import { getAllBlogrolls } from '@/lib/data/api/cms'
import Head from 'next/head'
import config from "../lib/data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import Image from 'next/image'
import media from "styled-media-query"
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'

const BlogrollContainer = styled.ol`
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  margin: 0 auto var(--space-lg) auto;
  list-style-type: none;
`

const BlogrollItem = styled.li`
  position: relative;
  padding: var(--space-sm) var(--space);
  transition: 0.2s;
  background-color: var(--secondary-color); 
  border-radius: var(--space-sm);
  ${media.greaterThan('large')`
    :hover {
      cursor: pointer;
      box-shadow: 0 25px 25px var(--gray-dark);    
    }
`}
`

const BlogrollProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-sm);
`

const BlogRollProfileImg = styled(Image)`
  flex: none;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  object-fit: cover;
`

const BlogrollProfileName = styled.span`
  font-size: 2rem;
  margin-left: var(--space);
`

const BlogrollLink = styled.a`
  outline: none;
`

const BlogrollProfileLink = styled.a`
  display: block;
  margin-left: var(--space);
  color: var(--gray);
`

const BlogrollProfileDesc = styled.p`

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
            <BlogrollContainer >

            {allBlogrolls.map((blogroll) => (
              <BlogrollLink href={blogroll.websiteUrl} title={blogroll.name} >
                <BlogrollItem >
                  <BlogrollProfile>
                  <BlogRollProfileImg
                    src={blogroll.profilePictureUrl}
                    width="70"
                    height="70"
                  />
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
