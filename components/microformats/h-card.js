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
            <time className="dt-btday" dateTime="--08-08"></time>
            <data className="p-locality" data="Rosenheim"></data>
            <data className="p-region" data="Bavaria"></data>
            <data className="p-postal-code" data="83026"></data>
            <data className="p-country-name" data="Germany"></data>
          </div>
        </Hidden> 
    )
}
