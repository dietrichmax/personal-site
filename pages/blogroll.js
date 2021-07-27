import Layout from '@/components/layout/layout'
import { getAllBlogrolls } from '@/lib/data/external/cms'
import config from "@/lib/data/internal/SiteConfig";
import styled from 'styled-components';
import Image from 'next/image'
import media from "styled-media-query"
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import SubTitle from '@/components/title/sub-title'
import Link from "next/link"
import TextBody from "@/components/note/note-body/note-body"
import Grid from "@/components/grid/grid"

const BlogrollContainer = styled.div`
  max-width: 1200px;
  margin: var(--space) auto var(--space) auto;
  ${media.lessThan('medium')`
    padding: 0;
    margin-top: var(--space-lg);
`}
`

const BlogrollItem = styled.li`
  position: relative;
  transition: 0.2s;
  height: 100%;
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
  text-decoration: underline var(--secondary-color);
  font-family: var(--secondary-font);
  display: block;
  :hover {
    text-decoration: none;
  }
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
              <Grid>
              {allBlogrolls.map((blogroll,i) => (
                  <BlogrollItem key={i} className="h-entry">
                    <BlogrollProfile>
                      {blogroll.profilePictureUrl ? (
                      <BlogrollProfileImgWrapper>
                        <BlogRollProfileImg
                          src={blogroll.profilePictureUrl}
                          width="70"
                          height="70"
                          title={blogroll.name}
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
              </Grid>
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
