import Layout from 'src/components/layout/layout'
import SEO from 'src/components/seo/seo'
import Title from 'src/components/title/page-title'
import styled from 'styled-components';
import media from 'styled-media-query';
import { getLocationsCount, getRecentLocationData } from "src/data/external/cms"
import dynamic from 'next/dynamic'

const Livemap = dynamic(
  () => import('src/components/maps/leaflet/livemap'),
)

const MapContainer = styled.div`
  margin: auto;
  max-width: 1200px;
  height: 600px;
  padding: var(--space);
  ${media.lessThan('medium')`
    padding: var(--space-sm);
    height: 60vh;
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
        Since 2021-03-02 i am tracking my current location. 
        Right now there are {parseFloat(locationsCount).toLocaleString('en')} locations displayed on the map. 
      </Description>
      <Description>
        If you are curious how that works have a look at the article <InternalLink href="/articles/constant-location-tracking-with-owntracks-strapi-and-visualizing-data-with-deckgl" title="How i constantly track my location and display a web-map with all the locations">How i constantly track my location and display a web-map with all the locations</InternalLink> where i am describing the details behind it.
      </Description>    
    </Layout>
  )
}

export async function getStaticProps() {
  const locationsCount = (await getLocationsCount()) || []
  const locations = (await getRecentLocationData()) || []


  return {
    revalidate:  3600,
    props: {
      locations,
      locationsCount
    }
  }
}
  
