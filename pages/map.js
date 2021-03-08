import { useState } from "react"
import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import Title from '@/components/title/page-title'
import dynamic from "next/dynamic";
import styled from 'styled-components';
import { getRecentLocationData } from '@/lib/data/api/cms'
import media from 'styled-media-query';

const MapContainer = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: var(--space);
  ${media.lessThan('medium')`
    padding: var(--space-sm);
  `}
`

export default function Map({ locations }) {

   const Map = dynamic(() => import("@/components/maps/leaflet/map"), {
        ssr: false
      });


      
  return (
    <Layout>
  
      <SEO   
        title="Map"
        slug="map"
      />
      <Title>Map</Title>
      
      <MapContainer>
        <Map data={locations} />
      </MapContainer>
      
    </Layout>
  )
}

export async function getServerSideProps() {
    const locations = (await getRecentLocationData()) || []

    return {
      props: { 
        locations
      }
    }
  }
  