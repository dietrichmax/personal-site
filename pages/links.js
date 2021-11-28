import Layout from 'src/components/layout/layout'
import { getAllLinks } from 'src/data/external/cms'
import config from "src/data/internal/SiteConfig";
import styled from 'styled-components';
import SEO from 'src/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from 'src/components/title/page-title'
import SubTitle from 'src/components/title/sub-title'
import Grid from 'src/components/grid/grid'
import LinkPreview from "src/components/link/link-preview/link-preview"

const LinksContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`

const LinksGrid = styled.ol`
  grid-column: span 3/span 3;
  list-style: none;
  padding-inline-start: 0;
`

export default function Links({ allLinks }) {
  const router = useRouter()

  return (
    <>
      <Layout>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Links"
              slug="links"
            />
              <PageTitle>Links</PageTitle>
              <SubTitle>Awesome content on the web, in random order.</SubTitle>
              <LinksContainer >

                <Grid>

                    {allLinks.map((link,i) => (
                      <LinkPreview key={i} link={link} />
                    ))}

                </Grid>

              </LinksContainer>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allLinks = (await getAllLinks()) || []
  
  return {
    revalidate:  86400,
    props: { allLinks },
  }
}
