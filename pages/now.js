import Layout from '@/components/layout/layout'
import { getLocationData, getNowData} from '@/lib/data/api/cms'
import config from "../lib/data/SiteConfig";
import SEO from '@/components/seo/seo'
import media from "styled-media-query"
import styled from 'styled-components';
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import SubTitle from '@/components/title/sub-title'
import axios from 'axios';
import Image from "next/image"
import { parseISO, format } from 'date-fns'
import TextBody from '@/components/note/note-body/note-body'

const Container = styled.div`
  max-width: 1200px;
  margin: var(--space) auto;
  padding-left: var(--space);
  padding-right: var(--space);
  ${media.lessThan('medium')`
    margin: var(--space-sm);
    padding: 0;
  `}
`

const LiveDataWrapper = styled.div`
  font-family: var(--secondary-font);
`


const Data = styled.p`
  margin-bottom: 0;
`

const TextWrapper  = styled.div`
  margin: var(--space-sm) 0;
`

const Disclaimer = styled.p`
  font-size: 0.75rem;
`

const WeatherImg = styled(Image)`
  vertical-align: text-bottom;
  display: inline-block;
`



export default function Now({ location, weather, address, content }) {
  const router = useRouter()

  const batteryLevel = location.batt*100


  const movement = (vel) => {
    return (
      vel > 0 ? `moving with ${vel} km/h` : "not moving"
    )
  }

  const batteryStatus = (bs) => {
    switch (bs) {
      case false:
        return "unplugged"
      case true:
        return "charging"
    }
  };

  const getBatteryLevelIcon = (batt) => {
    if (batt == 0) {
      return "empty"
    } else if (batt > 0 && batt < 37) {
      return "quarter"
    } else if (batt > 37 && batt < 62) {
      return "half"
    } else if (batt > 62 && batt < 100) {
      return "three-quarters"
    } else if (batt == 100) {
      return "full"
    } 
  };

  const clouds = (all) => {
    switch (all) {
      case all = 0:
        return "is not even one cloud"
      case all = 1:
        return "is just one cloud"
      case all > 1:
        return `are ${all} clouds`
    }
  };


  return (
    <>
      <Layout>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Now"
              slug="Now"
            />
            
            <PageTitle>Now</PageTitle>
           <SubTitle>Right now i am in {`${address.address.town}, ${address.address.state}, ${address.address.country}`}</SubTitle>

            <Container >

              <LiveDataWrapper>
                <Data>
                  It is {weather.main.temp}°C which feels more like {weather.main.feels_like}°C and i think there {clouds(weather.clouds.all)} in the sky.
                  <WeatherImg
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    title={weather.weather[0].description}
                    alt="Icon displaying weather"
                    width="30"
                    height="30"
                  />
                </Data>
                {batteryLevel ? <Data>My phone's battery level is {batteryLevel}% <i class={`las la-battery-${getBatteryLevelIcon(batteryLevel)}`} title={`${batteryLevel}% Battery Level`}/> and it is currently {batteryStatus(location.bs)}.</Data> : null}
              </LiveDataWrapper>

              <TextWrapper> 
                <TextBody className="e-content" content={content} /> 
              </TextWrapper> 

              <Disclaimer>Last updated on {format(parseISO(location.created_at), "H:mm, dd'th' MMMM yyyy '('O')'").replace("-"," ")}.</Disclaimer>
          
            </Container >
          </>
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const locationData = (await getLocationData()) || []
  const content = (await getNowData()) || []
  const dataLength = locationData[0].locations.length - 1
  const coordinates = locationData[0].locations[dataLength].geometry.coordinates
  const properties = locationData[0].locations[dataLength].properties


  const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[1]}&lon=${coordinates[0]}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`)
  const address = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${coordinates[1]}&lon=${coordinates[0]}&format=json`)


  return {
    props: { 
      location: {
        created_at: properties.timestamp,
        batt: properties.battery_level,
        bs: properties.battery_state
      },
      weather: weather.data,
      address: address.data,
      content: content.content,
    }
  }
}
