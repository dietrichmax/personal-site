import Layout from "src/components/layout/layout"
import { getAllBlogrolls } from "src/data/external/cms"
import config from "src/data/internal/SiteConfig"
import styled from "styled-components"
import Image from "next/image"
import media from "styled-media-query"
import SEO from "src/components/seo/seo"
import { useRouter } from "next/router"
import PageTitle from "src/components/title/page-title"
import SubTitle from "src/components/title/sub-title"
import Link from "next/link"
import TextBody from "src/components/note/note-body/note-body"
import Grid from "src/components/grid/grid"

const BlogrollContainer = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto var(--space) auto;
  ${media.lessThan("medium")`
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
            <SEO title="Blogroll" slug="blogroll" />

            <PageTitle>Blogroll</PageTitle>
            <SubTitle>
              List of all personal blogs i am reading in random order.
            </SubTitle>

            <BlogrollContainer>
              <Grid>
                {allBlogrolls.map((blogroll, i) => (
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
                      ) : null}

                      <Link
                        href={blogroll.websiteUrl}
                        passHref
                        rel="bookmark"
                        title={blogroll.name}
                      >
                        <BlogrollProfileName className="p-name">
                          {blogroll.name}
                        </BlogrollProfileName>
                        <BlogrollProfileLink className="u-url">
                          {blogroll.websiteUrl}
                        </BlogrollProfileLink>
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
    revalidate: 86400,
    props: { allBlogrolls },
  }
}
