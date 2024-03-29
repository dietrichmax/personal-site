import styled from "styled-components"
import { config } from "@/src/data/internal/SiteConfig"

const Hidden = styled.div`
  display: none;
`

export default function hCard() {
  return (
    <Hidden>
      <div
        className="h-card p-author"
        itemProp="author publisher"
        itemScope
        itemType="http://schema.org/Person"
      >
        <a
          className="p-name u-url"
          rel="author"
          itemProp="name"
          href={config.siteUrl}
        >
          {config.siteTitleAlt}
          <data
            className="p-description"
            itemProp="description"
            value={config.siteDescription}
          />
          <data
            className="p-description"
            itemProp="url"
            value={config.siteUrl}
          />
          <time className="dt-btday" dateTime="--08-08" itemProp="birthDate" />
          <data className="p-locality" value="Wasserburg am Inn" />
          <data className="p-region" value="Bavaria" />
          <data className="p-postal-code" value="83512" />
          <data className="p-country-name" value="Germany" />
        </a>
      </div>
    </Hidden>
  )
}
