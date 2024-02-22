import { useState, useEffect } from "react"
import { fetchGET } from "./fetcher"
import styled from "styled-components"
import { FaLink } from "@react-icons/all-files/fa/FaLink"
import * as MDX from "@/styles/mdx-styles"
import SyntaxHighlighter from "@/src/utils/SyntaxHighlighter"
import dynamic from "next/dynamic"
import { fetchStrapiAPI } from "../data/external/cms"
import * as qs from "qs"
import Image from "next/image"

const MapComponent = dynamic(
  () => import("@/components/mdxComponents/maps/openlayers/simplemap"),
  {
    ssr: false,
  }
)
const MarkerPopupMap = dynamic(
  () => import("@/components/mdxComponents/maps/openlayers/MarkerPopupMap"),
  {
    ssr: false,
  }
)
const LiveMap = dynamic(
  () => import("@/components/mdxComponents/maps/leaflet/liveMap"),
  { ssr: false }
)
const LeafletGeojsonDemo = dynamic(
  () => import("@/components/mdxComponents/maps/leaflet/LeafletGeojsonDemo"),
  {
    ssr: false,
  }
)
const SimpleLeafletDemo = dynamic(
  () => import("@/components/mdxComponents/maps/leaflet/simplemap"),
  {
    ssr: false,
  }
)
const VectorLayerMapGeojson = dynamic(
  () =>
    import("@/components/mdxComponents/maps/openlayers/VectorLayerMapGeojson"),
  {
    ssr: false,
  }
)

const PlaceHolderImage = styled.div`
  position: relative;
  padding: 50px 0;
  background-color: var(--content-bg);
  text-align: center;
`

const PermaLink = styled.span`
  cursor: pointer;
  margin-left: var(--space-sm);
  font-size: 14px;
`

const StyledA = styled(MDX.A)``

const DefaultCode = styled.code`
  padding: 5px;
  background-color: #111b27;
  color: #e3eaf2;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
`

interface MarkdownImage {
  src: any
}

const MarkdownImage = ({ src }) => {
  const [data, updateData] = useState<any>()

  useEffect(() => {
    const filteredSrc = src.replace(process.env.NEXT_PUBLIC_STRAPI_API_URL, "")

    const getData = async () => {
      const query =
      {
        filters: {
          url: {
            $containsi: filteredSrc,
          },
        },
        populate: "*",
      }
      const imageData = await fetchGET(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload/files?${qs.stringify(query)}`
      )
      const obj = imageData[0]
      const title = obj.name.replace(".png", "")
      const alt = obj.alternativeText === null ? title : obj.alternativeText
      const img = {
        src: src,
        title: title,
        alt: alt,
        height: obj.width,
        width: obj.height,
      }
      console.log(img)
      updateData(img)
    }
    getData()
  }, [])

  if (data) {
    return (
      <img
        src={data.src}
        title={data.title}
        alt={data.alt}
        width={data.width}
        height={data.height}
      />
    )
  } else {
    return (
      <PlaceHolderImage>
        {"Sorry, somehow the image is not available :("}
      </PlaceHolderImage>
    )
  }
}

const renderers = {
  p: ({ children }) => {
    return <MDX.P>{children}</MDX.P>
  },
  /*img: (props) => {
    return <MarkdownImage src={props.src} />
  },*/

  a: ({ children, href, title, alt }) => {
    return href.startsWith("/") ? (
      <StyledA className="internal-link" href={href} title={title}>
        {children}
      </StyledA>
    ) : (
      <MDX.A
        className="external-link"
        href={href}
        title={title}
        rel="nofollow noopener"
      >
        {children}
      </MDX.A>
    )
  },
  h2: ({ children }) => {
    const anchor = `${children.replaceAll(" ", "-").toLowerCase()}`
    return (
      <MDX.H2 style={{ cursor: "pointer" }} title={children}>
        <a id={anchor} href={`#${anchor}`}>
          {children}
        </a>
        <PermaLink>
          <FaLink />
        </PermaLink>
      </MDX.H2>
    )
  },
  h3: ({ children }) => {
    const anchor = `${children.replaceAll(" ", "-").toLowerCase()}`
    return (
      <MDX.H3 style={{ cursor: "pointer" }} title={children}>
        <span id={anchor} />
        <a href={`#${anchor}`}>{children}</a>
        <PermaLink>
          <FaLink />
        </PermaLink>
      </MDX.H3>
    )
  },
  h4: ({ children }) => {
    const anchor = `${children.replaceAll(" ", "-").toLowerCase()}`
    return (
      <h4 style={{ cursor: "pointer" }} title={children}>
        <span id={anchor} />
        <a href={`#${anchor}`}>{children}</a>
        <PermaLink>
          <FaLink />
        </PermaLink>
      </h4>
    )
  },
  h5: ({ children }) => {
    const anchor = `${children.replaceAll(" ", "-").toLowerCase()}`
    return (
      <h5 style={{ cursor: "pointer" }} title={children}>
        <span id={anchor} />
        <a href={`#${anchor}`}>{children}</a>
        <PermaLink>
          <FaLink />
        </PermaLink>
      </h5>
    )
  },
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "")
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} code={children} />
    ) : (
      <DefaultCode className={className} {...props}>
        {children}
      </DefaultCode>
    )
  },
  ul: ({ children }) => {
    return <MDX.UL>{children}</MDX.UL>
  },
  ol: ({ children }) => {
    return <MDX.OL>{children}</MDX.OL>
  },
  pre: ({ children }) => {
    return <MDX.PRE>{children}</MDX.PRE>
  },
  blockquote: ({ children }) => {
    return <MDX.Blockquote>{children}</MDX.Blockquote>
  },
  MapComponent: ({}) => {
    return <MapComponent />
  },
  MarkerPopupMap: ({}) => {
    return <MarkerPopupMap />
  },
  LeafletGeojsonDemo: ({}) => {
    return <LeafletGeojsonDemo />
  },
  SimpleLeafletDemo: ({}) => {
    return <SimpleLeafletDemo />
  },
  VectorLayerMapGeojson: ({}) => {
    return <VectorLayerMapGeojson />
  },
  LiveMap: ({}) => {
    return <LiveMap />
  },
}

export default renderers
