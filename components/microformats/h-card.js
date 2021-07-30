import styled from 'styled-components';
import config from "@/lib/data/internal/SiteConfig";

const Hidden = styled.div`
  display: none;
`

export default function hCard() {

    return (
        <Hidden> 
          <div className="h-card p-author" itemprop="author publisher" itemscope itemtype="http://schema.org/Person">
            <img className="u-photo" itemprop="image" src={config.siteLogo} alt={`Image of ${config.siteTitle}`}
            <data className="p-description" itemprop="description" data={config.siteDescription} /> 
            <data className="p-description" itemprop="url" data={config.siteUrl} />
            <a className="p-name u-url" rel="author" itemprop="name" href={config.siteUrl}>{config.siteTitleAlt}</a>
            <time className="dt-btday" dateTime="--08-08" itemprop="birthDate" />
            <data className="p-locality" data="Rosenheim" />
            <data className="p-region" data="Bavaria" />
            <data className="p-postal-code" data="83026" />
            <data className="p-country-name" data="Germany" />
          </div>
        </Hidden> 
    )
}
