import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"
import { FaLink } from "react-icons/fa"

const PlaceHolderImage = styled.div`
  padding: 50px 0;
  width: 670px;
  background-color: var(--content-bg);
  text-align: center;
`

const PermaLink = styled.span`
  cursor: pointer;
  margin-left: var(--space-sm);
  font-size: 14px;
`

const MarkdownImage = ({ src }) => {
  const [data, updateData] = useState()

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/upload/files?_url=${src}`
      )
      const json = await resp.json()
      const obj = json[0]
      const ratio = obj.height / obj.width
      const contentWidth = 670
      const title = obj.name.replace(".png", "")
      const alt = obj.alternativeText.length > 0 ? obj.alternativeText : title
      const img = {
        src: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${obj.url}`,
        title: obj.name.replace(".png", ""),
        alt: alt,
        height: obj.height,
        width: obj.width,
        ratio: ratio,
        contentWidth: 670,
        contentHeight: ratio * contentWidth,
      }
      updateData(img)
    }
    getData()
  }, [])

  if (data) {
    return (
      <a href={data.src} title={data.title} alt={data.alt}>
        <Image
          src={data.src}
          title={data.title}
          alt={data.alt}
          width={data.contentWidth}
          height={data.contentHeight}
        />
      </a>
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
  img: (props) => {
    return <MarkdownImage src={props.src} />
  },

  a: ({ children, href, title, alt }) => {
    return href.startsWith("/") ? (
      <Link className="external-link" href={href} title={title} alt={alt}>
        {children}
      </Link>
    ) : (
      <a
        className="internal-link"
        href={href}
        title={title}
        alt={alt}
        rel="nofollow noopener"
      >
        {children}
      </a>
    )
  },
  h2: ({ children }) => {
    const anchor = `${children[0].replace(/ /g, "-").toLowerCase()}`
    return (
      <h2 style={{ cursor: "pointer" }} title={children}>
        <span id={anchor} />
        <a href={`#${anchor}`}>{children}</a>
        <PermaLink>
          <FaLink />
        </PermaLink>
      </h2>
    )
  },
  h3: ({ children }) => {
    const anchor = `${children[0].replace(/ /g, "-").toLowerCase()}`
    return (
      <h3 style={{ cursor: "pointer" }} title={children}>
        <span id={anchor} />
        <a href={`#${anchor}`}>{children}</a>
        <PermaLink>
          <FaLink />
        </PermaLink>
      </h3>
    )
  },
  h4: ({ children }) => {
    const anchor = `${children[0].replace(/ /g, "-").toLowerCase()}`
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
    const anchor = `${children[0].replace(/ /g, "-").toLowerCase()}`
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
}

export default renderers
