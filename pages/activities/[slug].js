import React from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import { getActivity, getAllActivities } from '@/lib/data/external/cms'
import { fromUnixTime, format, parseISO } from 'date-fns'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import config from "@/lib/data/internal/SiteConfig";
import media from 'styled-media-query';
import Webmentions from "@/components/social/webmentions/webmentions"
import HCard from "@/components/microformats/h-card"
import WebActions from "@/components/social/social-share/social-share"
import { FaRunning, FaBiking, FaHiking, FaMountain } from 'react-icons/fa';
import { CgArrowsH, CgAlarm, CgArrowTopRight, CgArrowBottomRight } from 'react-icons/cg';
import { IoMdSpeedometer } from 'react-icons/io';
import Meta from "@/components/post/post-meta/post-meta"

import ActivityMap from "@/components/maps/deckgl/activity"


const ActivityWrapper = styled.article`
  max-width: 1200px;
  padding: 0 var(--space);
  margin:  calc(var(--space-lg)*2.5) auto var(--space-sm) auto;
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const ActivityContainer = styled.div`
  background-color: var(--content-bg);
  padding: var(--space-sm);
  box-shadow: var(--box-shadow);
`


const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  height: 100%;
  padding: var(--space-sm);
  box-shadow: var(--box-shadow);
  background-color: var(--content-bg);
  border-radius: var(--border-radius);
`

const Title = styled.h2`
  font-size: 1.25rem;
  color: var(--secondary-color);
`

const Date = styled.time`
  font-size: 1rem;
  font-weight: 400;
`

const Icon = styled.span`
  all: initial;
`

const Data = styled.div`
`

const DataItem = styled.dl`
  display: inline-block;
  margin: var(--space-sm) var(--space) var(--space-sm) 0;
  ${media.lessThan('large')`
  `}
`

const DataItemLabel = styled.dt`
  color: var(--text-color);
`

const DataItemValue = styled.dd`
    font-weight: 600;
`

const MapContainer = styled.div`
`




export default function Activity({ activity }) {  
  const router = useRouter()

  const getTypeIcon = type => {
    if (type === "Ride") {
        return <FaBiking/>
    } else if (type === "Hike") {
      return <FaHiking/>
    } else if (type === "Run"){
      return <FaRunning/>
    }
  }

  const secondsToHms = (s) => {
    const hours = (((s - s % 3600) / 3600) % 60)
    const minutes = (((s - s % 60) / 60) % 60)  
    const seconds = (s % 60)  
    return (`${hours}h ${minutes}min ${parseInt(seconds)}s`)
  }



  return (
    <Layout>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO  
              title={`${activity.activityName}-${format(parseISO(activity.start_date), "yyyy-MM-dd kk:mm")}`}
              description={`${activity.activityName}`}
              slug={`/activities/${activity.slug}`}
              date={activity.updated_at ? activity.updated_at : activity.created_at}
              ogType="activity"
            />
            <ActivityWrapper>
              <ActivityContainer>
                <HCard /> 

                <Link href={`/activities/${activity.activityId}`} passHref>
                  <a className="p-name u-url" title={activity.activityName}>
                    <Title>
                      <Icon title={activity.type}>{getTypeIcon(activity.type)}</Icon>{` `}
                        {activity.activityName}{` `}
                        <Date>({format(parseISO(activity.start_date), config.dateFormat)})</Date>
                    </Title>
                    </a>
                </Link>
                <Data className="e-content">
                  <DataItem>
                    <DataItemLabel><CgArrowsH /> Distance</DataItemLabel>
                    <DataItemValue>{(activity.distance/1000).toFixed(2)} km</DataItemValue>
                  </DataItem>
                  <DataItem>
                    <DataItemLabel><CgAlarm /> Duration</DataItemLabel>
                    <DataItemValue>{secondsToHms(activity.movingDuration)}</DataItemValue>
                  </DataItem>
                  <DataItem>
                    <DataItemLabel>Ø Speed</DataItemLabel>
                    <DataItemValue>{activity.averageSpeed.toFixed(2)} km/h</DataItemValue>
                  </DataItem>
                  <DataItem>
                    <DataItemLabel><IoMdSpeedometer /> Max Speed</DataItemLabel>
                    <DataItemValue>{activity.maxSpeed.toFixed(2)} km/h</DataItemValue>
                  </DataItem>
                  <DataItem>
                    <DataItemLabel><CgArrowTopRight /> Elevation Gain</DataItemLabel>
                    <DataItemValue>{activity.elevationGain.toFixed(0)} m</DataItemValue>
                  </DataItem>
                </Data>
                <HCard />
                <MapContainer>
                    <ActivityMap data={activity} />
                </MapContainer>

              </ActivityContainer>

                <WebActions slug={`/activities/${activity.slug}`} />
                <Meta post={activity} slug={`/activities/${activity.slug}`} syndicationLinks={[{slug:`https://www.strava.com/activities/${activity.slug}`,name:"strava"}]}/>
                {/*<Likes />*/}
                <Webmentions slug={`/activities/${activity.slug}`} />
                


            </ActivityWrapper>
            
          </>
        )}     
    </Layout>
  )
}

export async function getStaticProps({ params }) {  
  const data = await getActivity(params.slug)
  
  return {
    props: {
      activity: {
        ...data?.activities[0],
      },
    },
  }
}

export async function getStaticPaths() {
  const activities = await getAllActivities()
  
  return {
    paths: activities?.map((activity) => `/activities/${activity.slug}`) || [],
    fallback: true,
  }
}