import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import Title from '@/components/title/page-title'
import dynamic from "next/dynamic";
import styled from 'styled-components';
import media from 'styled-media-query';
import { getRecentLocationData } from '@/lib/data/api/cms'
import Livemap from "@/components/maps/deckgl/livemap"

const MapContainer = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: var(--space);
  ${media.lessThan('medium')`
    padding: var(--space-sm);
  `}
`

export default function Map({ locations }) {

      
  return (
    <Layout>
  
      <SEO   
        title="Map"
        slug="map"
      />
      <Title>Map</Title>
      
      <MapContainer>
        <Livemap data={locations} />
      </MapContainer>
      
    </Layout>
  )
}

export async function getStaticProps() {
  const locations = (await getRecentLocationData()) || []

    return {
      revalidate:  86400,
      props: {
        locations
      }
    }
}
  
