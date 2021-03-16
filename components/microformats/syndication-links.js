import { FaGithub, FaTwitter, FaInstagram, FaRss, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import styled from 'styled-components';
import config from "@/lib/data/SiteConfig";


const SyndList = styled.ol`
  font-family: var(--secondary-font);
  list-style: none;
  padding-inline-start: 0;
  font-size: 12px;
  text-align: right;
`

const SyndItem = styled.a`
    cursor: pointer;
    margin-right: 0.25rem;
`


export default function SyndicationLinks({syndicationLinks}) {

    const getEndpoint = (name) => {
        if (name == "twitter") {
            return <FaTwitter/> 
        } else if (name == "instagram") {
            return <FaInstagram/> 
        }
    }

    return (
        <SyndList className="relsyn">
            {syndicationLinks? 
              syndicationLinks.map((link) => {
                return (
                <li>
                  <SyndItem aria-label={link.name} title={`See this post on ${link.name}`} className="u-syndication syn-link" href={link.slug} rel="syndication no-follow " >
                    {getEndpoint(link.name)}
                  </SyndItem>
                </li>
                )         
            })  : null }
        </SyndList> 
    )
}