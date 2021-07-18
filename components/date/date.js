import { parseISO, format } from 'date-fns'
import styled from 'styled-components';
import config from "@/lib/data/internal/SiteConfig"

const DateContainer = styled.time`
  font-family: var(--secondary-font);
`

export default function Date({ dateString, updated }) {

  const date = parseISO(dateString)

  return (
    <DateContainer className="dt-published" dateTime={dateString}> {format(date, config.dateFormat).replace("-"," ")} {updated ? "(Updated)" : null}</DateContainer>
  )
}
