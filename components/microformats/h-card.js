import styled from 'styled-components';
import config from "@/lib/data/internal/SiteConfig";

const Hidden = styled.div`
  display: none;
`

export default function hCard() {

    return (
        <Hidden> 
          <div className="h-card p-author">
            <img className="u-photo" src={config.siteLogo} alt={`Image of ${config.siteTitle}`}  /> 
            <a className="p-name u-url" rel="author" href={config.siteUrl}>{config.siteTitleAlt}</a>
          </div>
        </Hidden> 
    )
}
