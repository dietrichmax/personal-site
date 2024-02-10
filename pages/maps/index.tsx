import Layout from "@/src/components/layout/layout"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import PageTitle from "@/src/components/title/page-title"
import Grid from "@/src/components/grid/grid"
import SubTitle from "@/src/components/title/sub-title"
import Link from "next/link"

const MapsPageContainer = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto;
`

const MapsCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  background-color: var(--content-bg);
  border-radius: var(--border-radius);
  &:hover {
    background-color: var(--secondary-color);
    cursor: pointer;
  }
`

export default function Blog({}) {
  return (
    <Layout>
      <SEO
        title="Maps"
        description="React Map Components built with OpenLayers and Leaflet"
        slug="maps"
      />

      <PageTitle>Maps</PageTitle>
      <SubTitle>
        React Map Components built with OpenLayers and Leaflet
      </SubTitle>

      <MapsPageContainer>
        <Grid>
          <Link href="/maps/openlayers">
            <MapsCard>OpenLayers</MapsCard>
          </Link>
          <MapsCard>
            <Link href="/maps/leafelt">Leaflet</Link>
          </MapsCard>
        </Grid>
      </MapsPageContainer>
    </Layout>
  )
}
