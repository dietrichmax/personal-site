import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const ImageContainer = styled.img``

const renderers = {
  img: ({ src, alt, title }) => {
    return src.startsWith("/") ? (
      <ImageContainer
        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`}
        alt={alt}
        title={title}
        href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`}
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
