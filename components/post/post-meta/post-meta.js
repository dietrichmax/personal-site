import Date from '@/lib/utils/date/date'
import styled from 'styled-components';
import Webmentions from "@/components/social/webmentions/webmentions"
import getReadTime from "@/lib/utils/read-time"


const CardItemMeta = styled.div`
  display: flex;
  font-size: .875rem;
  margin: calc(var(--space-sm)*0.5) 0;
  font-family: var(--secondary-font);
`;


const ReadingTime = styled.span`
  margin-left: var(--space-sm);
`

const ReadingTimeSymbol = styled.i`
`

export default function PostMeta({ postMetaData }) {
  
  const { date, dateUpdated,  slug, content } = postMetaData

  const readingTime = getReadTime(content)
  
  return (
    <CardItemMeta>
        <Date dateString={dateUpdated ? dateUpdated : date} />
        <Webmentions preview slug={`/articles/${slug}`}/>
        <ReadingTime><ReadingTimeSymbol className="las la-book-open" /> {readingTime} min read</ReadingTime>
    </CardItemMeta>
  )
}
