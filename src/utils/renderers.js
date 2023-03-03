import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
`

const PlaceHolderImage = styled.div`
  padding: 50px 0;
  width: 670px;
  background-color: var(--content-bg);
  text-align: center;
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
      console.log(img)
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
    return <PlaceHolderImage>Loading Image...</PlaceHolderImage>
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
    return <h2 id={anchor}>{children}</h2>
  },
  h3: ({ children }) => {
    const anchor = `${children[0].replace(/ /g, "-").toLowerCase()}`
    return <h2 id={anchor}>{children}</h2>
  },
  h4: ({ children }) => {
    const anchor = `${children[0].replace(/ /g, "-").toLowerCase()}`
    return <h2 id={anchor}>{children}</h2>
  },
  h5: ({ children }) => {
    const anchor = `${children[0].replace(/ /g, "-").toLowerCase()}`
    return <h2 id={anchor}>{children}</h2>
  },
  h6: ({ children }) => {
    const anchor = `${children[0].replace(/ /g, "-").toLowerCase()}`
    return <h2 id={anchor}>{children}</h2>
  },
}

export default renderers
