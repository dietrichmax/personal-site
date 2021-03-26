import Layout from '@/components/layout/layout'
import { getAllBlogrolls } from '@/lib/data/api/cms'
import config from "../lib/data/SiteConfig";
import styled from 'styled-components';
import Image from 'next/image'
import media from "styled-media-query"
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import SubTitle from '@/components/title/sub-title'
import Link from "next/link"
import TextBody from "@/components/note/note-body/note-body"

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
  ${media.lessThan('medium')`
    margin: var(--space-sm);
    padding: 0;
`}
`

const BlogrollItem = styled.li`
  position: relative;
  transition: 0.2s;
  height: 100%;
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
  font-size: 1.5rem;
`

const BlogrollProfileLink = styled.cite`
  border-bottom: 1px solid var(--link-color);
  font-family: var(--secondary-font);
  display: block;
`

const BlogrollProfileDesc = styled.p`
  font-family: var(--secondary-font);
`

export default function Blogroll({ allBlogrolls }) {
  const router = useRouter()


  return (
    <>
      <Layout>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Blogroll"
              slug="blogroll"
            />
            
            <PageTitle>Blogroll</PageTitle>
            <SubTitle>List of all personal blogs i am reading in random order.</SubTitle>

            <BlogrollContainer>

            {allBlogrolls.map((blogroll,i) => (
                <BlogrollItem key={i} className="h-entry">
                  <BlogrollProfile>
                    {blogroll.profilePictureUrl ? (
                    <BlogrollProfileImgWrapper>
                      <BlogRollProfileImg
                        src={blogroll.profilePictureUrl}
                        width="70"
                        height="70"
                        alt={blogroll.name}
                        className="p-photo"
                      /> 
                      </BlogrollProfileImgWrapper>
                    ) : null }
                  
                    <Link href={blogroll.websiteUrl} passHref>
                      <a rel="bookmark" title={blogroll.name}>
                        <BlogrollProfileName className="p-name">{blogroll.name}</BlogrollProfileName>
                        <BlogrollProfileLink className="u-url">{blogroll.websiteUrl}</BlogrollProfileLink>
                      </a>
                    </Link>
                  </BlogrollProfile>
                  <BlogrollProfileDesc className="p-summary">
                    <TextBody content={blogroll.bio} />
                  </BlogrollProfileDesc>
                </BlogrollItem>
            ))}

              

            </BlogrollContainer>
          </>
        )}
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
