import { FaTwitter, FaInstagram, FaReddit } from 'react-icons/fa';
import styled from 'styled-components';
import config from "@/lib/data/SiteConfig";


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

const SyndTitle = styled.span`
  margin-right: var(--space-sm);
  vertical-align: text-bottom;
`


export default function SyndicationLinks({syndicationLinks}) {

    const getEndpoint = (name) => {
        if (name == "twitter") {
            return <FaTwitter/> 
        } else if (name == "instagram") {
            return <FaInstagram/> 
        } else if (name == "reddit") {
          return <FaReddit/> 
      }
    }

    return (
        <SyndList className="syndications">
            {syndicationLinks? 
              syndicationLinks.map((link) => {
                return (
                <SyndLi>
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
    )
}
