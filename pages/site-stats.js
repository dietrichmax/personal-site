import React, { useState, useEffect } from "react"
import Layout from '@/components/layout/layout'
import config from "../lib/data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import media from 'styled-media-query';
import { getMatomoActions, getMatomoLiveCounter, getMatomoPageViews } from '@/lib/data/api/analytics'
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
  max-width: 1200px;
  margin: var(--space-lg) auto;
  background-color: #fff;
  padding: var(--space);
  border-bottom: 3px solid var(--gray-light);
  border: 1px solid var(--gray-light);
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
  
  const α = 0.4;
  const B = 1000;
  let pageViews = []
  let normalisedViews = []
  Object.entries(lastViews).forEach((value) => (
    pageViews.push({
      date: value[0],
      dateShort: value[0].substring(8),
      views: isNaN(value[1].nb_pageviews) ? 0 : value[1].nb_pageviews,
      normalisedViews: (1 - α) * isNaN(value[1].nb_pageviews) ? 0 : value[1].nb_pageviews + α * B,
    }),
    normalisedViews.push((1 - α) * isNaN(value[1].nb_pageviews) ? 0 : value[1].nb_pageviews + α * B)
  ));
  const normalisedMax = Math.max.apply(Math, normalisedViews);
  
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
              title="Site Stats"
              slug="site-stats"
            />
          <PageTitle>Site statistics</PageTitle>
          <Container>
            <GeneralStats>
              {live > 1 ?
              <p>You are with {live - 1} others on this site.</p> :
              <p>At the moment you are the only person on this site.</p>
              }
              In {stats.year} this site was viewed {stats.overallPageViews} times. 
              There were {stats.overallOutlinks} clicks on external link and {stats.overallDownloads} files have been downloaded. 
              Loading time for a page takes in average <GenerationTime>{stats.overallAvgTimeGeneration}</GenerationTime> seconds.
            </GeneralStats>
            <ViewsContainer>
              <Title>Views in the past 30 days</Title>
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
              <Credits>Data via <a title="Matomo Reporting API" href="https://developer.matomo.org/api-reference/reporting-api">Matomo Reporting API</a>.</Credits>
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


