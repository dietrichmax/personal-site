import Layout from "@/src/components/layout/layout"
import { getAllPhotos } from "@/src/data/external/cms"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import PageTitle from "@/src/components/title/page-title"
import SubTitle from "@/src/components/title/sub-title"
import Grid from "@/src/components/grid/grid"
import PhotosPreview from "@/src/components/photo/photo-preview"

const PhotosContainer = styled.div`
  margin: 0 auto;
  max-width: var(--width-container);
`

interface Photo {
  photo: any
}

export default function Photos({ allPhotos }) {
  return (
    <Layout>
      <SEO title="Photos" slug="Photos" description="Photos taken by me" />
      <PageTitle>Photos</PageTitle>
      <SubTitle>.</SubTitle>
      <PhotosContainer>
        <Grid>
          {allPhotos.map((photo: Photo, i: number) => (
            <PhotosPreview key={i} photo={photo} />
          ))}
        </Grid>
      </PhotosContainer>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPhotos: Array<Photo> = (await getAllPhotos()) || []

  return {
    revalidate: 86400,
    props: { allPhotos },
  }
}
