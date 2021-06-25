import React from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import { getActivity, getAllActivities } from '@/lib/data/api/cms'
import { fromUnixTime, format } from 'date-fns'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import config from "@/lib/data/SiteConfig";
import media from 'styled-media-query';
import Webmentions from "@/components/social/webmentions/webmentions"
import Comments from "@/components/comments/comments"
import HCard from "@/components/microformats/h-card"
import Likes from "@/components/social/favorites/favorites"
import WebActions from "@/components/social/feedback/feedback"
import ActivityPreview from '@/components/activity/activity-preview/activity-preview'
import PostMeta from '@/components/post/post-meta/post-meta'
import dynamic from "next/dynamic";
import { FaRunning, FaBiking, FaMountain } from 'react-icons/fa';
import { CgArrowsH, CgAlarm, CgArrowTopRight, CgArrowBottomRight } from 'react-icons/cg';
import { IoMdSpeedometer } from 'react-icons/io';
import { GiValley, GiSummits } from 'react-icons/gi';



const ActivityMap = dynamic(() => import("@/components/maps/leaflet/largeActivityMap"), {
    ssr: false
});

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
  cursor: pointer;
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

const DataItemLabel = styled.dt``

const DataItemValue = styled.dd`
    font-weight: 600;
`

const MapContainer = styled.div`
`




export default function Activity({ activity, slug }) {  
  const router = useRouter()

  const getTypeIcon = activity => {
    if (activity.activityType.typeId == 5) {
        return <FaBiking/>
    } else if (activity.activityType.typeId == 15) {
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
              title={`${activity.activityName}-${format(fromUnixTime(activity.beginTimestamp.substring(0, activity.beginTimestamp.length - 3)), "yyyy-MM-dd kk:mm")}`}
              description={`${activity.activityName}`}
              slug={slug}
              date={activity.updated_at ? activity.updated_at : activity.published_at}
              ogType="activity"
            />
            <ActivityWrapper>
              <ActivityContainer>
                <HCard /> 

                <Link href={slug} passHref>
                  <a className="p-name u-url" title={activity.activityName}>
                    <Title>
                        <Icon title={activity.activityType.typeKey}>{getTypeIcon(activity)}</Icon>{` `}
                        {activity.activityName}{` `}
                        <Date>({format(fromUnixTime(activity.beginTimestamp.substring(0, activity.beginTimestamp.length - 3)), "yyyy-MM-dd kk:mm")})</Date>
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
                    <DataItemLabel><CgArrowTopRight /> Uphill</DataItemLabel>
                    <DataItemValue>{activity.elevationGain.toFixed(0)} m</DataItemValue>
                  </DataItem>
                  <DataItem>
                    <DataItemLabel><CgArrowBottomRight /> Downhill</DataItemLabel>
                    <DataItemValue>{activity.elevationLoss.toFixed(0)} m</DataItemValue>
                  </DataItem>
                  <DataItem>
                    <DataItemLabel><GiValley/> Min Elevation</DataItemLabel>
                    <DataItemValue>{(activity.minElevation / 100).toFixed(0)} m</DataItemValue>
                  </DataItem>
                  <DataItem>
                    <DataItemLabel><GiSummits/> Max Elevation</DataItemLabel>
                    <DataItemValue>{(activity.maxElevation / 100).toFixed(0)} m</DataItemValue>
                  </DataItem>
                </Data>
                <HCard />
                <MapContainer>
                    <ActivityMap data={activity.details.geoPolylineDTO} />
                </MapContainer>

              </ActivityContainer>

                <WebActions slug={slug} />
                {/*<Likes />*/}
                <Webmentions slug={slug} />
                


            </ActivityWrapper>
            
          </>
        )}     
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getActivity(params.id)

  return {
    revalidate:  86400,
    props: {
      activity: {
        ...data?.activities[0]
      },
      slug: `/activities/${format(fromUnixTime(data.activities[0].beginTimestamp.substring(0, data.activities[0].beginTimestamp.length - 3)), "yyyy-MM-dd-kk-mm")}`
    },
  }
}

export async function getStaticPaths() {
  const allActivities = await getAllActivities()

  return {
    paths: allActivities?.map((activity) => `/activities/${format(fromUnixTime(activity.beginTimestamp.substring(0, activity.beginTimestamp.length - 3)), "yyyy-MM-dd-kk-mm")}`) || [],
    fallback: true,
  }
}
