import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import Title from '@/components/title/page-title'
import dynamic from "next/dynamic";
import styled from 'styled-components';
import media from 'styled-media-query';
import Livemap from "@/components/maps/deckgl/livemap"
//import { getRecentLocationData } from '@/lib/data/api/cms'
import { PrismaClient } from "@prisma/client";



const MapContainer = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: var(--space);
  ${media.lessThan('medium')`
    padding: var(--space-sm);
  `}
`

export default function Map({ locations }) {
  
  prisma = new PrismaClient()
      
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
  const locations = await prisma.locations.findMany({
    select: {
      lat: true,
      lon: true,
      alt: false,
      vel: false,
    },
  });

  return {
    revalidate:  86400,
    props: {
      locations
    }
  }
}
  
