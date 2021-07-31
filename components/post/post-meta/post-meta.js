import styled from 'styled-components';
import { parseISO, format } from 'date-fns'
import config from "@/lib/data/internal/SiteConfig";
import { FaTwitter, FaInstagram, FaReddit, FaStrava } from 'react-icons/fa';

const Meta = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: var(--space-sm);
`


const DateWrapper = styled.p`
  font-size: 11px;
  :hover {
    text-decoration: underline;
  }
`

const SyndList = styled.ol`
  font-family: var(--secondary-font);
  list-style: none;
  padding-inline-start: 0;
  text-align: right;
`

const SyndLi = styled.li`
  display: inline-block;
`

const SyndItem = styled.a`
  cursor: pointer;
  margin-right: 0.25rem;

`


export default function PostMeta({ post, slug, syndicationLinks }) {
  
  const getEndpoint = (name) => {
    if (name == "twitter") {
        return <FaTwitter/> 
    } else if (name == "instagram") {
        return <FaInstagram/> 
    } else if (name == "reddit") {
      return <FaReddit/> 
  } else if (name == "strava") {
    return <FaStrava/> 
}
}


  return ( 
    <Meta>
      <DateWrapper className="dt-published">
        <a className="u-url" title={slug} href={slug}>{format(parseISO(post.updated_at ? post.updated_at : post.published_at), config.dateFormat)}</a>
      </DateWrapper>        
      <SyndList className="syndications">
        {syndicationLinks? 
          syndicationLinks.map((link,i) => {
            return (
            <SyndLi key={i}>
              <SyndItem 
                aria-label={link.name} 
                title={`See this post on ${link.name}`} 
                className="u-syndication syndication" 
                href={link.slug} 
                rel="u-syndication syndication no-follow" 
              >
                {getEndpoint(link.name)}
              </SyndItem>
            </SyndLi>
            )         
        })  : null }
      </SyndList>     
    </Meta>
  )
}
