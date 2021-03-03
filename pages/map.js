/*import { useState } from "react"
import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import Title from '@/components/title/page-title'
import dynamic from "next/dynamic";
import styled from 'styled-components';
import { getAllLocationData } from '@/lib/data/api/cms'

const MapContainer = styled.div`
  margin: auto;
  width: 1200px;
  padding: var(--space);
`

export default function Map({ locations }) {
    const [loading, setLoading] = useState(false);

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
    const locations = (await getAllLocationData()) || []

    return {
      props: { 
        locations
      }
    }
  }
  */