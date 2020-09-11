import { parseISO, format } from 'date-fns'
import config from "../../data/SiteConfig";
import styled from 'styled-components';

const PostDate = styled.time`
  border-top: 1px solid var(--gray-light);
  position: relative;
  display: block;
  color: var(--gray);
  margin-top: var(--space-sm);
  padding-top: var(--space-sm);
`

export default function Date({ dateString, ago }) {
  const date = parseISO(dateString)
  return <PostDate dateTime={dateString}>{format(date, config.dateFormat)}</PostDate>
}
