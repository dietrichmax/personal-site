import styled from 'styled-components';
import config from "@/lib/data/SiteConfig";

const Hidden = styled.div`
  display: none;
`

export default function hCard() {

    return (
        <Hidden> 
          <div className="h-card">
            <img className="u-photo" src={config.siteLogo} alt={`Image of ${config.siteTitle}`}  /> 
            <a className="p-name u-url" href="https://mxd.codes">Max Dietrich</a>
          </div>
        </Hidden> 
    )
}