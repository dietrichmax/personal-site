import { parseISO, format } from 'date-fns'
import styled from 'styled-components';
import NoteTags from "@/components/tags/tags"
import Image from "next/image"
import Title from '@/components/title/post-title'
import { FaMapMarkerAlt } from 'react-icons/fa';

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
  display: inline-block;
  vertical-align: middle;
`

const Temperature = styled.span`
  vertical-align: middle;

`


export default function NoteMeta({ note }) {

  const date = note.updated_at ? note.updated_at : note.created_at

  return (
    <MetaWrapper>
      <Title>{format(parseISO(date), "MMMM dd'th', yyyy").replace("-"," ")}</Title>
      <MetaOuterWrapper>

        <MetaInnerWrapper>
            <MetaItem><Location className="p-location" title="View this location in OpenStreetMap" href={`http://www.openstreetmap.org/?mlat=${note.lat}&mlon=${note.lon}&zoom=12`}><FaMapMarkerAlt /></Location> | </MetaItem>
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
            {note.temperature ? <Temperature title={`${note.temperature.toFixed(0)}°Celsius`}> {note.temperature.toFixed(0)}°C</Temperature> : null }
          </MetaItem>
        </MetaInnerWrapper>
        
        <NoteTags tags={note.tags} />


      </MetaOuterWrapper>
    
    </MetaWrapper >
  )
}
