import Date from '@/components/date/date'
import styled from 'styled-components';
import getReadTime from "@/lib/utils/read-time"


const CardItemMeta = styled.div`
  display: flex;
  font-size: .875rem;
  margin: calc(var(--space-sm)*0.5) 0;
  font-family: var(--secondary-font);
`;



export default function PostMeta({ postMetaData }) {
  
  const { date, dateUpdated, content } = postMetaData

  
  return (
    <CardItemMeta>
        <Date className="dt-published" dateString={dateUpdated ? dateUpdated : date} />
    </CardItemMeta>
  )
}
