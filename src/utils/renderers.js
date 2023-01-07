import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const ImageContainer = styled.img`
  width:100%,
  height: 100%,
  position: relative;
`

const renderers = {
  img: ({ src, alt, title }) => {
    const name = src.replace("/uploads/", "")
    const nameParts = name.split("_")
    nameParts.pop()
    const newName = `${nameParts.join(" ")}.png`

    //const data = getImage(newName)

    //console.log(data)
    return src.startsWith("/") ? (
      <img
        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`}
        alt={alt}
        title={title}
        href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`}
        //width={src.width}
        //height={src.height}
      />
    ) : (
      <ImageContainer src={src} alt={alt} title={title} />
    )
  },
  a: ({ children, href, title, alt }) => {
    return href.startsWith("/") ? (
      <Link className="external-link" href={href}>
        <a title={title} alt={alt}>
          {children}
        </a>
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
}

export default renderers
