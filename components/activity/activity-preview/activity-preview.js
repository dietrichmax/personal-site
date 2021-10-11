import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import { fromUnixTime, format, parseISO } from 'date-fns'
import PostMeta from '@/components/post/post-meta/post-meta-preview'
import HCard from "@/components/microformats/h-card"
import config from "@/lib/data/internal/SiteConfig"
import { FaRunning, FaBiking, FaHiking, FaClock } from 'react-icons/fa';
import { CgArrowsH, CgAlarm, CgArrowsVAlt } from 'react-icons/cg';
import Image from "next/image"
const polyline = require('@mapbox/polyline');

const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  height: 100%;
  padding: var(--space-sm);
  border-radius: var(--border-radius);
  transition: .5s;
  padding: 6px 6px 0 6px;
`

const Title = styled.h2`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const Date = styled.time`
  font-size: .875rem;
  font-weight: 400;
  ${media.lessThan('large')`
    display: block;
  `}
`

const Icon = styled.span`
  all: initial;
  color: var(--text-color);
`

const Data = styled.div`
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

const DataItemLabel = styled.dt`
  font-size: 0.75rem;
`

const DataItemValue = styled.dd`
font-size: 1rem;
`

const MapContainer = styled.div`
  position: relative;
  margin-bottom: var(--space-sm);
  width: 100%;
  height: 250px;
`

const Dot = styled.span`
  height: 12px;
  width: 12px;
  background-color: ${props => props.color ? props.color : "var(--primary-color)"};
  border-radius: 50%;
  display: inline-block;
`

/*const staticMapLoader = ({ basemap, attribution, width, height, path, weight, color }) => {
  return `https://static-maps-api.mxd.codes/img.php?basemap=${basemap || "stamen-terrain"}&attribution=${attribution || "none"}&width=${width || "520"}&height={height || "250}&path[]=${path};weight:${weight || "3"};color:${color | "6680CA"}`
}*/

export default function ActivityPreview({ activity }) {

  const date = activity.start_date
  const slug = `/activities/${activity.slug}`


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
  
  const geoPolyline = polyline.decode(activity.details.summary_polyline);

  let path = []
  geoPolyline.map((coordinate) => {
    path.push([coordinate[1],coordinate[0]])
  })

  return (
    <Item className="h-entry" >
        
        <Link href={slug} passHref>
          <a className="p-name u-url" title={activity.activityName}>
            <Title>
                <Icon title={activity.type}>{getTypeIcon(activity.type)}</Icon>{` `}
                {activity.activityName}{` `}
                <Date>{format(parseISO(activity.start_date), config.dateFormat)}</Date>
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
          <Image
            src={`https://static-maps-api.mxd.codes/img.php?basemap=stamen-terrain&attribution=none&width=520&height=250&path[]=${JSON.stringify(path)};weight:3;color:6680CA`}
            layout="fill"
          />
        </MapContainer>

        <PostMeta post={activity} slug={slug} />
      </Item>
  )
}
