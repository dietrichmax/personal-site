import styled from 'styled-components';
import { parseISO, format } from 'date-fns'
import config from "@/lib/data/internal/SiteConfig";


const DateWrapper = styled.p`
  font-size: 11px;
  margin-top: var(--space);
  :hover {
    text-decoration: underline;
  }
`

export default function PostMeta({ post, slug }) {
  
  return ( 
    <DateWrapper className="dt-published">
      <a className="u-url" title={slug} href={slug}>{format(parseISO(post.updated_at ? post.updated_at : post.published_at), config.dateFormat)}</a>
    </DateWrapper>            
  )
}
