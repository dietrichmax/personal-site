import Layout from 'src/components/layout/layout'
import { getLocationData, getNowData} from 'src/data/external/cms'
import config from "../src/data/internal/SiteConfig";
import SEO from 'src/components/seo/seo'
import media from "styled-media-query"
import styled from 'styled-components';
import { useRouter } from 'next/router'
import PageTitle from 'src/components/title/page-title'
import SubTitle from 'src/components/title/sub-title'
import axios from 'axios';
import Image from "next/image"
import { format, fromUnixTime} from 'date-fns'
import TextBody from 'src/components/note/note-body/note-body'



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
  margin: 0;
`

const TextWrapper  = styled.div`
  margin: var(--space-sm) 0;
`

const Disclaimer = styled.p`
  font-size: 0.75rem;
  margin: 0;
`

const WeatherImg = styled(Image)`
  vertical-align: text-bottom;
  display: inline-block;
`



export default function Now({ weather, address, content, now  }) {
  const router = useRouter()


  const batteryStatus = (bs) => {
    switch (bs) {
      case 0:
        return 
      case 1:
        return "unplugged"
      case 2:
        return "charging"
      case 3:
        return "full"
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
    if (all == 0) {
      return "is not even one cloud"
    } else if (all == 1) {
      return "is just one cloud"
    } else if (all > 1) {
      return `are about ${all} clouds`
    }
  };

  const town = address.address.city ? address.address.city : address.address.village
  
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
              description="This page describes what i am focused on at this point in my life."
            />
            
            <PageTitle>Now</PageTitle>
            <SubTitle>Right now i am in {`${town}, ${address.address.state}, ${address.address.country}`}</SubTitle>

            <Container >


              <LiveDataWrapper>
                <Data>
                  In {town} it has {weather.main.temp}°C with {weather.weather[0].description}.
                  <WeatherImg
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    title={weather.weather[0].description}
                    alt="Icon displaying weather"
                    width="30"
                    height="30"
                  />
                </Data>
                {now.batt ? <Data>My phone's battery level is {now.batt}% <i className={`las la-battery-${getBatteryLevelIcon(now.batt)}`} title={`${now.batt}% Battery Level`}/> and it is currently {batteryStatus(now.bs)}.</Data> : null}
              </LiveDataWrapper>

              <TextWrapper> 
                <TextBody className="e-content" content={content} /> 
              </TextWrapper> 

              <Disclaimer>Last updated on {format(fromUnixTime(now.timestamp), "H:mm, dd'th' MMMM yyyy '('O')'").replace("-"," ")}.</Disclaimer>
          
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


  const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`)
  const address = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${locationData[0].lat}&lon=${locationData[0].lon}&format=json&zoom=10`)


  return {
    props: { 
      weather: weather.data,
      address: address.data,
      content: content.content,
      now: {
        batt: locationData[0].batt,
        bs: locationData[0].bs,
        timestamp: locationData[0].tst,
      }
    }
  }
}
