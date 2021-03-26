import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import { fromUnixTime, format, parseISO } from 'date-fns'
import PostMeta from '@/components/post/post-meta/post-meta'
import HCard from "@/components/microformats/h-card"
import dynamic from "next/dynamic";
import { FaRunning, FaBiking, FaClock } from 'react-icons/fa';
import { CgArrowsH, CgAlarm } from 'react-icons/cg';


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
  transition: .5s;
  :hover {
    transform: var(--transform);
  }
`

const Title = styled.h2`
  font-size: 1.25rem;
  cursor: pointer;
`

const Date = styled.time`
  font-size: 1rem;
  font-weight: 400;
  ${media.lessThan('large')`
    display: block;
  `}
`

const Icon = styled.span`
  all: initial;
`

const Data = styled.div`
  font-size: .875rem;
  ${media.lessThan('small')`
    display: flex;
    justify-content: space-between;
  `}
`

const DataItem = styled.dl`
  display: inline-block;
  margin: var(--space-sm) var(--space) var(--space-sm) 0;
  ${media.lessThan('small')`

    margin: var(--space-sm) 0;
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
    <Item className="h-entry" >
        
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
            <DataItemValue>{secondsToHms(activity.duration)}</DataItemValue>
          </DataItem>
          <DataItem>
            <DataItemLabel>Ø Speed</DataItemLabel>
            <DataItemValue>{activity.averageSpeed.toFixed(2)} km/h</DataItemValue>
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
