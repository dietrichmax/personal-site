import React, { useState, useEffect } from "react"
import ModalImage from "react-modal-image"
import Link from "next/link"
import styled from "styled-components"

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
`

const titleElements = ["h1", "h2", "h3", "h4", "h5", "h6"]

const renderers = {
  img: (props) => {
    const src = props.src
    const alt = props.alt
    const title = props.alt.replace(".png", "").toLowerCase()
    return props.src.startsWith("/") ? (
      <ModalImage
        {...props}
        small={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`}
        large={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`}
        layout="responsive"
        loading="lazy"
        hideDownload="true"
        hideZoom="true"
      />
    ) : (
      <ModalImage
        {...props}
        small={src}
        large={src}
        layout="responsive"
        href={src}
        loading="lazy"
      />
    )
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
