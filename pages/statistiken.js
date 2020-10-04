import React, { useState, useEffect } from "react"
import Layout from '@/components/layout/layout'
import Head from 'next/head'
import config from "../data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import media from 'styled-media-query';
import Teaser from '@/components/title/teaser-title'
import { addISOWeekYears, format } from 'date-fns'
import PageTitle from '@/components/title/page-title'


const Container = styled.div`
  ${media.lessThan('medium')`
    margin-left: var(--space);
    margin-right: var(--space);
  `}
`

const Title = styled.h2`
  margin: var(--space) auto var(--space) auto;
  font-size: 1.65rem;
  color: var(--primary-color);
`



const GeneralStats = styled.div`
  max-width: 600px;
  margin: var(--space-lg) auto;
  font-weight: 600;
  line-height: 2;
`

const GenerationTime = styled.a`
  color: ${props =>
    props.children < 0.5 ? "green" : "red"};
`


const ViewsContainer = styled.div`
  max-width: 1200px;
  margin: var(--space) auto;
  border-bottom: 3px solid var(--gray-light);
`

const RecentViewsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100px;
  justify-content: center;
  display: flex;
`

const ColumnWrapper = styled.div`
  position: relative;
  margin-right: calc(var(--space-sm)*0.3);
  background-color: var(--gray-light);
  width: 100%;
  :before {
    content: attr(data-tip);
    font-size: 1.2rem;
    font-family: var(--secondary-font);
    position: absolute;
    z-index: 999;
    white-space: nowrap;
    background: rgba(0, 0, 0, 0.8);
    color: #e0e0e0;
    padding: var(--space-sm);
    height: var(--space);
    top: -2rem;
    left: var(--space);
    opacity: 0;
    -webkit-transition: opacity 0.4s ease-out;
    -moz-transition: opacity 0.4s ease-out;
    -o-transition: opacity 0.4s ease-out;
    transition: opacity 0.4s ease-out;
    text-shadow: none;
  }
  :hover::before {
    opacity: 1;
  }
`

const Column = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--primary-color);
  height: ${props =>
    props.height ? `${props.height}px !important` : "10px"};
  border-top-right-radius: calc(var(--space-sm)*0.5);
  border-top-left-radius: calc(var(--space-sm)*0.5);
`
const DateContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto var(--space-lg) auto;
  justify-content: center;
  display: flex;
  ${media.lessThan('medium')`
    display: none;
`}
`

const DateWrapper = styled.div`
  position: relative;
  width: 100%;
`

const Date = styled.p`
  display: block;
  width: 100%;
  text-align: center;
`

export default function Recruiting({ lastViews, liveViews, actions }) {
  const router = useRouter()

  // lastViews last 30 days
  const α = 0.6;
  const B = 100;
  let allViews = []
  let allDates = []
  Object.entries(lastViews).forEach((value) => {
    allDates.push(value[0]),
    allViews.push(isNaN(value[1].nb_pageviews) ? 0 : value[1].nb_pageviews)
  });
  const matomoViews = allViews.map((item) => ({
    normalisedViews: (1 - α) * item + α * B,
    lastViews: item
  }));
  const matomoDate = allDates.map((item) => ({
    date: item,
    dateShort: item.substring(8),
  }));
  const normalisedMax = (1 - α) * Math.max.apply(Math, allViews) + α * B;
  //_____________________________________________
  let live = liveViews[0].visits

  const year = []
  const overallPageViews = []
  const overallDownloads = []
  const overallOutlinks = []
  const overallAvgTimeGeneration = []
  Object.entries(actions).forEach((value) => {
    year.push(value[0])
    overallPageViews.push(value[1].nb_pageviews)
    overallDownloads.push(value[1].nb_downloads)
    overallOutlinks.push(value[1].nb_outlinks)
    overallAvgTimeGeneration.push(value[1].avg_time_generation)
  });
  

  //const allPageViews = actions
  //console.log(allPageViews)
  return (
    <>
      <Layout>
        <Header link="/"/>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Auf GIS-Netzwerk werben"
              slug="https://gis-netzwerk.com/werben"
            />
          <PageTitle>Statistiken</PageTitle>
          <Container>
            <GeneralStats>
              {live > 1 ?
              <a>Du bist derzeit mit {live - 1} weiteren Person auf GIS-Netzwerk.com. </a> :
              <a>Du bist momentan die einzige Person auf GIS-Netzwerk.com. </a>
              }
              <br/>
              <a>Die Seite wurde im Jahr {year} insgesamt {overallPageViews} Mal aufgerufen. 
              Dabei wurde {overallOutlinks} Mal auf externe Links geklickt und {overallDownloads} Dateien heruntergeladen. 
              Durschnittlich dauert ein Ladevorgang für eine Seite <GenerationTime>{overallAvgTimeGeneration}</GenerationTime> Sekunden</a>
            </GeneralStats>
            <ViewsContainer>
              <Title>Seitenaufrufe in den letzten 30 Tagen</Title>
              <RecentViewsContainer>
              {matomoViews.map((item, i) => (
                <ColumnWrapper 
                  key={i}
                  data-tip={`${item.lastViews} Aufrufe`}>
                  <Column 
                    height={Math.floor((item.normalisedViews / normalisedMax) * 100)}
                  />
                </ColumnWrapper>
              ))}

              </RecentViewsContainer>
              <DateContainer>
                {matomoDate.map((item, i) => (
                  <DateWrapper>
                    <Date key={i} title={`${item.date}`}>{item.dateShort}</Date>
                  </DateWrapper>
                ))}
              </DateContainer>
            </ViewsContainer>
          </Container>
          </>
        )}
        <Footer />
      </Layout>
    </>
  )
}


export async function getServerSideProps() {
  // Get lastViews for last 30 days
  const getViews = encodeURI(`${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=day&date=previous30&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`)
  const matomoDataLastViews = await fetch(getViews)
  const lastViews = await matomoDataLastViews.json()
  if (lastViews.errors) {
    console.error(lastViews.errors)
    throw new Error('Failed to fetch MATOMO API')
  }
  const getLiveViews = encodeURI(`${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Live.getCounters&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&lastMinutes=1&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`)
  const matomoDataLiveViews = await fetch(getLiveViews)
  const liveViews = await matomoDataLiveViews.json()
  if (liveViews.errors) {
    console.error(liveViews.errors)
    throw new Error('Failed to fetch MATOMO API')
  }

  const getActions = encodeURI(`${process.env.NEXT_PUBLIC_MATOMO_URL}?method=Actions.get&idSite=${process.env.NEXT_PUBLIC_MATOMO_SITE_ID}&period=year&date=last&module=API&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`)
  const matomoDataActions = await fetch(getActions)
  const actions = await matomoDataActions.json()
  if (actions.errors) {
    console.error(actions.errors)
    throw new Error('Failed to fetch MATOMO API')
  }
  return {
    props: { lastViews, liveViews, actions }
  }
}


