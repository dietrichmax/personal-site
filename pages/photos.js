import Layout from '@/components/layout/layout'
import { getAllPhotos } from '@/lib/data/external/cms'
import config from "@/lib/data/internal/SiteConfig";
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import SubTitle from '@/components/title/sub-title'
import PhotosPreview from "@/components/photo/photo-preview"

const PhotosContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`

const Grid = styled.ol`
  max-width: var(--width-container);
  display: grid;
  padding-left: var(--space);
  padding-right: var(--space);
  margin-bottom: var(--space-lg);
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: var(--space-lg);
  list-style: none;
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  `}
`

export default function Photos({ allPhotos }) {
  const router = useRouter()

  return (
    <>
      <Layout>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Photos"
              slug="Photos"
            />
              <PageTitle>Photos</PageTitle>
              <SubTitle>.</SubTitle>
              <PhotosContainer >

                <Grid>
                    {allPhotos.map((photo,i) => (
                      <PhotosPreview key={i} photo={photo} />
                    ))}

                </Grid>

              </PhotosContainer>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPhotos = (await getAllPhotos()) || []
  
  return {
    revalidate:  86400,
    props: { allPhotos },
  }
}
