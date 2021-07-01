import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import Title from '@/components/title/page-title'
import styled from 'styled-components';
import media from 'styled-media-query';
import Livemap from "@/components/maps/deckgl/livemap"
import { getLocationsCount } from "@/lib/data/api/cms"
import prisma from '@/lib/utils/prisma'
import { server } from "@/lib/utils/server"
import axios from 'axios';

const MapContainer = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: var(--space);
  ${media.lessThan('medium')`
    padding: var(--space-sm);
  `}
`

const Description = styled.p`
  max-width: 1200px;
  margin: auto;
  padding: 0 var(--space) var(--space) var(--space);
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const InternalLink = styled.a`
  color: var(--text-color);
  border-bottom: 1px solid var(--thirdy-color);
  cursor: pointer;
  :hover {
    border-bottom: 1px solid transparent;
  }
`

export default function Map({ locations, locationsCount } ) {

  
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
      <Description>
        Since 2021-03-02 i am tracking my current location. Right now there are {locationsCount} locations displayed on the map and the map is always centered at my last known position.
      </Description>
      <Description>
        If you are curious how that works have a look at the article <InternalLink href="/articles/how-i-track-my-location-and-display-the-data-on-my-website" title="How i track my location and display the data on my website">How i track my location and display the data on my website</InternalLink> where i am describing the details behind it.
      </Description>    
    </Layout>
  )
}

export async function getStaticProps() {
  const locationsCount = (await getLocationsCount()) || []
  
  const locations = await prisma.locations.findMany({
    select: {
      lat: true,
      lon: true,
      alt: true,
      vel: false,
    },
  });

  return {
    revalidate:  1800,
    props: {
      locations,
      locationsCount
    }
  }
}
  
