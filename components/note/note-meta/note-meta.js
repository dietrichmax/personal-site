import { parseISO, format } from 'date-fns'
import styled from 'styled-components';
import config from "@/lib/data/SiteConfig"
import markdownToHtml from '@/lib/utils/markdownToHtml'
import NoteTags from "@/components/tags/tags"
import Image from "next/image"
import Title from '@/components/title/post-title'

const MetaWrapper = styled.div`
  width: 70%;
`


const Time = styled.time``


const MetaOuterWrapper = styled.div`
  color: #fff;
  align-items: center;
`

const MetaInnerWrapper = styled.ol`
  margin-top: 0.25rem;
  margin-bottom: var(--space-sm);
  display: flex;
  padding-inline-start: 0;
  list-style: none;
  background-color: var(--primary-color);
  color: #fff;
  align-items: center;
`

const MetaItem = styled.li`
  margin-right: 0.5rem;
`

const Location = styled.a`
  font-size: 20px;
`

const Weather = styled.div`

`

const Temperature = styled.span``

const Tags = styled.div`
  margin-left: auto;
`


export default function NoteMeta({ note }) {

  return (
    <MetaWrapper>
      <Title>{format(parseISO(note.created_at), "MMMM dd'th', yyyy").replace("-"," ")}</Title>
      <MetaOuterWrapper>
        <Time>{format(parseISO(note.created_at), "hh:mm O").replace("-"," ")}</Time>

        <MetaInnerWrapper>
          <MetaItem><Location className="p-location" title="View this location in OpenStreetMap" href={`http://www.openstreetmap.org/?mlat=${note.lat}&mlon=${note.lon}&zoom=12`}><i class="las la-map-marker"></i></Location></MetaItem>
          <MetaItem>{note.weather_icon ? 
            <Weather title={note.weather_description}>
              <Image 
                src={`http://openweathermap.org/img/wn/${note.weather_icon}.png`}
                width="25"
                height="25"
              />
            </Weather>
            : null}
          </MetaItem>
          <MetaItem>{note.temperature ? <Temperature>{note.temperature.toFixed(0)}°C</Temperature> : null}</MetaItem>
          <MetaItem>
          <Tags>
            {note.tags.map((tag) => {
              return (
              <a href={`/topics/${tag.slug}`}>{tag.name}</a>
            )})}
          </Tags>
          </MetaItem>
        </MetaInnerWrapper>
      </MetaOuterWrapper>

    
    </MetaWrapper >
  )
}
