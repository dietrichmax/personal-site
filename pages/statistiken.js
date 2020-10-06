import React, { useState, useEffect } from "react"
import Layout from '@/components/layout/layout'
import config from "../data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import media from 'styled-media-query';
import { getMatomoActions, getMatomoLiveCounter, getMatomoPageViews } from '@/lib/api/analytics'
import PageTitle from '@/components/title/page-title'


const Container = styled.div`
  ${media.lessThan('medium')`
    margin-left: var(--space);
    margin-right: var(--space);
  `}
`

const Title = styled.h2`
  margin: 0 auto var(--space) auto;
  font-size: 1.65rem;
  color: var(--primary-color);
`

const GeneralStats = styled.div`
  max-width: 600px;
  margin: var(--space-lg) auto;
  font-weight: 600;
  line-height: 2;
`

const GenerationTime = styled.span`
  color: ${props =>
    props.children < 0.5 ? "#166416" : "red"};
`

const ViewsContainer = styled.div`
  margin: var(--space-lg) auto;
  background-color: #fff;
  padding: var(--space);
  border-bottom: 3px solid var(--gray-light);
  border: 1px solid var(--gray-light);
  ${media.greaterThan('medium')`
    margin-left: calc(var(--space-lg)*2);
    margin-right: calc(var(--space-lg)*2);
  `}
`

const RecentViewsContainer = styled.div`
  margin: 0 auto;
  height: 100px;
  justify-content: center;
  display: flex;
`

const Credits = styled.div`
  text-align: right;
  font-size: 1.1rem;
`

const ColumnWrapper = styled.div`
cursor: pointer;
  position: relative;
  margin-right: calc(var(--space-sm)*0.3);
  width: 100%;
  background-color: var(--gray-extra-light);
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
    props.height ? `${props.height}px !important` : "0px"};
  border-top-right-radius: calc(var(--space-sm)*0.5);
  border-top-left-radius: calc(var(--space-sm)*0.5);
`
const DateContainer = styled.div`
  margin: 0 auto var(--space-lg) auto;
  justify-content: center;
  display: flex;
  ${media.lessThan('large')`
    display: none;
  `}
`

const DateWrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
`

const Date = styled.p`
  font-size: 1rem;
  display: block;
  width: 100%;
  text-align: center;
`
const PageViewsInfo = styled.a`
  font-size: 1.3rem;
`

export default function Recruiting({ lastViews, liveViews, actions }) {
  const router = useRouter()
  
  const α = 0;
  const B = 1000;
  let pageViews = []
  let allViews = []
  Object.entries(lastViews).forEach((value) => (
    pageViews.push({
      date: value[0],
      dateShort: value[0].substring(8),
      views: isNaN(value[1].nb_pageviews) ? 0 : value[1].nb_pageviews,
      normalisedViews: (1 - α) * isNaN(value[1].nb_pageviews) ? 0 : value[1].nb_pageviews + α * B,
    }),
    allViews.push(isNaN(value[1].nb_pageviews) ? 0 : value[1].nb_pageviews)
  ));
  const normalisedMax = (1 - α) * Math.max.apply(Math, allViews) + α * B;

  let live = liveViews[0].visits

  const generalStats = []
  Object.entries(actions).forEach((value) => (
    generalStats.push({
      year: value[0],
      overallPageViews: value[1].nb_pageviews,
      overallDownloads: value[1].nb_downloads,
      overallOutlinks: value[1].nb_outlinks,
      overallAvgTimeGeneration: value[1].avg_time_generation,
    })
  ));
  const stats = generalStats[0]


  return (
    <>
      <Layout>
        <Header link="/"/>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Statistiken - GIS-Netzwerk"
              slug="https://gis-netzwerk.com/statistiken"
            />
          <PageTitle>Statistiken</PageTitle>
          <Container>
            <GeneralStats>
              {live > 1 ?
              <a>Du bist derzeit mit {live - 1} weiteren Personen auf GIS-Netzwerk.com. </a> :
              <a>Du bist momentan die einzige Person auf GIS-Netzwerk.com. </a>
              }
              <br/>
              <a>Die Seite wurde im Jahr {stats.year} insgesamt {stats.overallPageViews} Mal aufgerufen. 
              Dabei wurde {stats.overallOutlinks} Mal auf externe Links geklickt und {stats.overallDownloads} Dateien heruntergeladen. 
              Durschnittlich dauert ein Ladevorgang für eine Seite <GenerationTime>{stats.overallAvgTimeGeneration}</GenerationTime> Sekunden</a>
            </GeneralStats>
            <ViewsContainer>
              <Title>Seitenaufrufe in den letzten 50 Tagen</Title>
              <RecentViewsContainer>
              {pageViews.map((item, i) => (
                <ColumnWrapper 
                  key={i}
                  data-tip={`${item.views} Aufrufe`}>
                  <Column 
                    height={Math.floor((item.normalisedViews / normalisedMax) * 100)}
                  />
                </ColumnWrapper>
              ))}

              </RecentViewsContainer>
              <DateContainer>
                {pageViews.map((item, i) => (
                  <DateWrapper key={i} >
                    <Date title={item.date}>{item.dateShort}</Date>
                  </DateWrapper>
                ))}
                </DateContainer>
                <PageViewsInfo>Daten aus Matomo Reporting API.</PageViewsInfo>
              <Credits>Inspiriert von <a title="sld.codes" href="https://sld.codes/stats">Sam Larsen-Disney</a></Credits>
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
  
  const lastViews = (await getMatomoPageViews()) || []
  const actions = (await getMatomoActions()) || []
  const liveViews = (await getMatomoLiveCounter()) || []

  return {
    props: { lastViews, liveViews, actions }
  }
}


