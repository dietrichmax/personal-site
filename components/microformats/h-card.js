import styled from 'styled-components';
import config from "@/lib/data/internal/SiteConfig";

const Hidden = styled.div`
  display: none;
`

export default function hCard() {

    return (
        <Hidden> 
          <div className="h-card p-author" itemProp="author publisher" itemScope itemType="http://schema.org/Person">
            <img className="u-photo" itemProp="image" src={config.siteLogo} alt={`Image of ${config.siteTitle}`} /> 
            <data className="p-description" itemProp="description" data={config.siteDescription} /> 
            <data className="p-description" itemProp="url" data={config.siteUrl} />
            <a className="p-name u-url" rel="author" itemProp="name" href={config.siteUrl}>{config.siteTitleAlt}</a>
            <time className="dt-btday" dateTime="--08-08" itemProp="birthDate" />
            <data className="p-locality" value="Rosenheim" />
            <data className="p-region" value="Bavaria" />
            <data className="p-postal-code" value="83026" />
            <data className="p-country-name" value="Germany" />
          </div>
        </Hidden> 
    )
}
