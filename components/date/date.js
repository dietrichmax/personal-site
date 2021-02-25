import { parseISO, format } from 'date-fns'
import styled from 'styled-components';
import config from "@/lib/data/SiteConfig"

const DateContainer = styled.time`
  position: relative;
  display: block;
`

export default function Date({ dateString, ago }) {
  const date = parseISO(dateString)
  return (
    <DateContainer className="dt-published" dateTime={dateString}> {format(date, config.dateFormat).replace("-"," ")}</DateContainer>
  )
}
