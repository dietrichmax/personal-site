import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import { fromUnixTime, format, parseISO } from 'date-fns'
import PostMeta from '@/components/post/post-meta/post-meta'
import HCard from "@/components/microformats/h-card"
import dynamic from "next/dynamic";
import { MdDirectionsBike } from 'react-icons/md';

const ActivityMap = dynamic(() => import("@/components/maps/leaflet/smallActivityMap"), {
    ssr: false
});

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

export default function ActivityPreview({ activity }) {

  const date = format(parseISO(activity.created_at), "yyyy-MM-dd-kk-mm")
  const slug = `/activities/${date}`


  const getTypeIcon = activity => {
    if (activity.activityType.typeId == 5) {
        return <MdDirectionsBike/>
    }

  }


  return (
    <Item className="h-entry" >
        
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
        </Data>
        <HCard />
        <MapContainer>
            <ActivityMap data={activity.details.geoPolylineDTO} />
        </MapContainer>

        <PostMeta post={activity} slug={slug} />
      </Item>
  )
}
