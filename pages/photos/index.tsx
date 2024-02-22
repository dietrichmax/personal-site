import Layout from "@/src/components/layout/layout"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import PageTitle from "@/src/components/title/page-title"
import SubTitle from "@/src/components/title/sub-title"
import Grid from "@/src/components/grid/grid"
import PhotosPreview from "@/src/components/photo/photo-preview"
import { getAllPhotos } from "@/src/data/external/cms"

const PhotosContainer = styled.div`
  margin: 0 auto;
  max-width: var(--width-container);
`

interface Photo {
  id: number
  attributes: {
    title: string
    slug: string
    updatedAt: string
    publishedAt: string
    description: string
    content: string
    syndicationLinks: Array<any>
    photo: any
    tags: any
    author: any
  }
  meta?: any
}

export default function Photos({ photos }) {
  return (
    <Layout>
      <SEO title="Photos" slug="Photos" description="Photos taken by me" />
      <PageTitle>Photos</PageTitle>
      <SubTitle>.</SubTitle>
      <PhotosContainer>
        <Grid>
          {photos.map((photo: Photo) => (
            <PhotosPreview key={photo.id} photo={photo.attributes} />
          ))}
        </Grid>
      </PhotosContainer>
    </Layout>
  )
}

export async function getStaticProps() {
  const photos = await getAllPhotos()

  return {
    revalidate: 86400,
    props: {
      photos,
    },
  }
}
