import React from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/layout/layout'
import SEO from '@/components/seo/seo'
import { getActivityBySlug, getAllActivities } from '@/lib/data/api/cms'
import { fromUnixTime, format } from 'date-fns'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import config from "@/lib/data/SiteConfig";
import media from 'styled-media-query';
import Webmentions from "@/components/social/webmentions/webmentions"
import Comments from "@/components/comments/comments"
import HCard from "@/components/microformats/h-card"
import Likes from "@/components/social/favorites/favorites"
import WebActions from "@/components/social/web-actions/web-actions"
import ActivityPreview from '@/components/activity/activity-preview/activity-preview'
import PostMeta from '@/components/post/post-meta/post-meta'
import dynamic from "next/dynamic";
import { MdDirectionsBike } from 'react-icons/md';

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

const DataItem = styled.div`
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
  margin-bottom: var(--space-sm);
`




export default function Activity({ activity, slug }) {  
  const router = useRouter()

  const getTypeIcon = activity => {
    if (activity.activityType.typeId == 5) {
        return <MdDirectionsBike/>
    }

  }

  return (
    <Layout>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO   
              /*title={activity.title}
              description="{post.excerpt}"
              slug={`articles/${activity.slug}`}
              date={activity.updated_at ? activity.updated_at : activity.published_at}
              ogType="activity"*/
            />
            <ActivityWrapper>

              <HCard /> 

              <Link href={slug} passHref>
                <a className="p-name u-url" title={activity.activityName}>
                  <Title>
                      <Icon>{getTypeIcon(activity)}</Icon>{` `}
                      {activity.activityName}{` `}
                      <Date>({format(fromUnixTime(activity.beginTimestamp.substring(0, activity.beginTimestamp.length - 3)), "yyyy-MM-dd kk:mm")})</Date>
                  </Title>
                  </a>
              </Link>
              <Data className="e-content">
                <DataItem>
                  <DataItemLabel>Distance</DataItemLabel>
                  <DataItemValue>{(activity.distance/1000).toFixed(2)} km</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemLabel>Duration</DataItemLabel>
                  <DataItemValue>{activity.duration} s</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemLabel>Ø Speed</DataItemLabel>
                  <DataItemValue>{activity.averageSpeed} km/h</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemLabel>Max Speed</DataItemLabel>
                  <DataItemValue>{activity.maxSpeed} km/h</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemLabel>Uphill</DataItemLabel>
                  <DataItemValue>{activity.elevationGain} m</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemLabel>Downhill</DataItemLabel>
                  <DataItemValue>{activity.elevationLoss} m</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemLabel>Min Elevation</DataItemLabel>
                  <DataItemValue>{activity.minElevation.toFixed(2)} m</DataItemValue>
                </DataItem>
                <DataItem>
                  <DataItemLabel>Max Elevation</DataItemLabel>
                  <DataItemValue>{activity.maxElevation.toFixed(2)} m</DataItemValue>
                </DataItem>
              </Data>
              <HCard />
              <MapContainer>
                  <ActivityMap data={activity.details.geoPolylineDTO} />
              </MapContainer>

              <PostMeta post={activity} slug={slug} />

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
  const data = await getActivityBySlug(params.id)

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