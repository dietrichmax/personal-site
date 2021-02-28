import Layout from '@/components/layout/layout'
import { getLocationData } from '@/lib/data/api/cms'
import config from "../lib/data/SiteConfig";
import SEO from '@/components/seo/seo'
import styled from 'styled-components';
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import SubTitle from '@/components/title/sub-title'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMatomoLiveCounter } from "@/lib/data/api/analytics"
import Image from "next/image"
import { parseISO, format } from 'date-fns'

const Container = styled.div`
  max-width: 1200px;
  margin: var(--space) auto;
  padding-left: var(--space);
  padding-right: var(--space);
`

const Data = styled.p`
  line-height: 28px;
`

const WeatherImg = styled(Image)`
  vertical-align: text-bottom;
`

export default function Now({ location, weather, adress }) {
  const router = useRouter()




  const movement = (vel) => {
    return (
      vel > 0 ? `moving with ${vel} km/h` : "not moving"
    )
  };

  const batteryStatus = (bs) => {
    switch (bs) {
      case 0:
        return "unknown"
      case 1:
        return "unplugged"
      case 2:
        return "charging"
      case 3:
          return "full"
    }
  };

  const batteryLevel = (batt) => {
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
        return "no"
      case all = 1:
        return "one"
      case all > 1:
        return all
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
            <SubTitle>Right now i am in {`${adress.address.town}, ${adress.address.state}, ${adress.address.country}`}</SubTitle>

            <Container >
              <Data>
                It is {weather.main.temp}°C which feels more like {weather.main.feels_like}°C and i think there {weather.clouds.all > 1 ? "are" : "is just" } {clouds(weather.clouds.all)} cloud.
                <WeatherImg
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  title={weather.weather[0].description}
                  alt="Icon displaying weather"
                  width="30"
                  height="30"
                />
              </Data>
              {/*<Data>I am {movement(location.vel)}.</Data>*/}
              <Data>My phone's battery level is {location.batt}% <i class={`las la-battery-${batteryLevel(location.batt)}`} /> and it is currently {batteryStatus(location.bs)}.</Data>

              <Data>Last updated on {format(parseISO(location.created_at), "hh:mm, dd'th' MMMM, yyyy").replace("-"," ")}.</Data>
            </Container >
          </>
        )}
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const locationData = (await getLocationData()) || []
  const location = locationData[0]

  const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`)
  const adress = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lon}&format=json`)

  return {
    props: { 
      location: location,
      weather: weather.data,
      adress: adress.data
    }
  }
}
