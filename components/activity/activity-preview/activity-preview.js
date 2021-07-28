import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import { fromUnixTime, format, parseISO } from 'date-fns'
import PostMeta from '@/components/post/post-meta/post-meta-preview'
import HCard from "@/components/microformats/h-card"
import dynamic from "next/dynamic";
import { FaRunning, FaBiking, FaClock } from 'react-icons/fa';
import { CgArrowsH, CgAlarm, CgArrowsVAlt } from 'react-icons/cg';
import { GiWeightLiftingDown } from 'react-icons/gi';


const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  height: 100%;
  padding: var(--space-sm);
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

const Dot = styled.span`
  height: 12px;
  width: 12px;
  background-color: ${props => props.color ? props.color : "var(--primary-color)"};
  border-radius: 50%;
  display: inline-block;
`

const getFlow = (flow) => {
  if (flow < 1) 
    return <Dot color="#72ea24"/>
  else if (flow > 1 && flow < 20)
    return <Dot color="#d6ff32"/>
  else if (flow > 20)
    return <Dot color="#ff0035"/>
}

const getGrit = (grit) => {
  if (grit < 20) 
    return <Dot color="#72ea24"/>
  else if (grit > 20 && grit < 40)
    return <Dot color="#11A9ED"/>
  else if (grit > 40)
    return <Dot color="#632D5C"/>
}

export default function ActivityPreview({ activity }) {

  const date = format(fromUnixTime(activity.beginTimestamp.substring(0, activity.beginTimestamp.length - 3)), "yyyy-MM-dd-kk-mm")
  const slug = `/activities/${activity.activityId}`


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
            <DataItemValue>{secondsToHms(activity.movingDuration)}</DataItemValue>
          </DataItem>
          <DataItem>
            <DataItemLabel>Ø Speed</DataItemLabel>
            <DataItemValue>{activity.averageSpeed.toFixed(2)} km/h</DataItemValue>
          </DataItem>
          <DataItem>
            <DataItemLabel><CgArrowsVAlt /> Elevation gain</DataItemLabel>
            <DataItemValue>{activity.elevationGain.toFixed(0)} m</DataItemValue>
          </DataItem>

          {/*activity.grit ?
          <DataItem>
            <DataItemLabel>{getGrit(activity.grit)} Grit</DataItemLabel>
            <DataItemValue>{activity.grit.toFixed(2)}</DataItemValue>
          </DataItem> : null */}
        </Data>
        <HCard />
        <MapContainer>
            {/*<ActivityMap data={activity.details.geoPolylineDTO} />*/}
        </MapContainer>

        <PostMeta post={activity} slug={slug} />
      </Item>
  )
}
