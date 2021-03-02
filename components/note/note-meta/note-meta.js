import { parseISO, format } from 'date-fns'
import styled from 'styled-components';
import NoteTags from "@/components/tags/tags"
import Image from "next/image"
import Title from '@/components/title/post-title'

const MetaWrapper = styled.div`

`


const Time = styled.time`
`


const MetaOuterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MetaInnerWrapper = styled.ol`
  display: flex;
  padding-inline-start: 0;
  list-style: none;
  align-items: center;
  font-size: 14px;
  color: #fff;
  background-color: var(--primary-color);
  padding: 0 var(--space-sm);
  border-radius:var(--border-radius);
`

const MetaItem = styled.li`
  text-align: center;
  margin-right: 0.25rem;
`

const Location = styled.a`
`

const Weather = styled.div`
  height: 24px;
`

const Temperature = styled.span`

`


export default function NoteMeta({ note }) {

  return (
    <MetaWrapper>
      <Title>{format(parseISO(note.date), "MMMM dd'th', yyyy").replace("-"," ")}</Title>
      <MetaOuterWrapper>

        <MetaInnerWrapper>
          <MetaItem><Time>{format(parseISO(note.date), "hh:mm O").replace("-"," ")}</Time></MetaItem>
            <MetaItem> | <Location className="p-location" title="View this location in OpenStreetMap" href={`http://www.openstreetmap.org/?mlat=${note.lat}&mlon=${note.lon}&zoom=12`}><i class="las la-map-marker"></i></Location> | </MetaItem>
            <MetaItem>{note.weather_icon ? 
              <Weather title={note.weather_description}>
                <Image 
                  src={`http://openweathermap.org/img/wn/${note.weather_icon}.png`}
                  width="24"
                  height="24"
                  title={note.weather_description}
                  alt="Icon displaying weather"
                />
              </Weather>
              : null}
            </MetaItem>
          <MetaItem>{note.temperature ? <Temperature title={`${note.temperature.toFixed(0)}°Celsius`}> | {note.temperature.toFixed(0)}°C</Temperature> : null}</MetaItem>
        </MetaInnerWrapper>
        
        <NoteTags tags={note.tags} />


      </MetaOuterWrapper>
    
    </MetaWrapper >
  )
}
