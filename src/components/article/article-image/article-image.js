import React, { useEffect } from "react"
import styled from "styled-components"
import Image from "next/image"
import Link from "next/link"
import media from "styled-media-query"

const CardItemImg = styled(Image)`
  cursor: pointer;
  width: ${(props) => (props.width ? `${props.width}px` : "350px")} !important;
  height: ${(props) =>
    props.height ? `${props.height}px` : "130px"} !important;
  object-fit: cover;
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
  ${media.lessThan("large")`
    height: ${(props) =>
      props.height ? `${props.height}px` : "200px"} !important;
    object-fit: cover;
  `}
`

const PostImg = styled(Image)`
  position: relative;
  object-fit: cover;
  width: ${(props) => (props.width ? `${props.width}px` : "1300px")} !important;
  height: ${(props) =>
    props.height ? `${props.height}px` : "450px"} !important;
  cursor: pointer;
  border-radius: var(--border-radius);
  ${media.lessThan("large")`
    height: ${(props) =>
      props.height ? `${props.height}px` : "200px"} !important;
    object-fit: cover;
  `}
`

export default function PostImage({ preview, postData }) {
  const { title, coverImage } = postData

  return (
    <>
      {" "}
      {preview ? (
        coverImage ? (
          <CardItemImg
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.url}`}
            alt={title}
            title={title}
            width="350"
            height="130"
            className="u-photo"
            placeholder="blur"
            blurDataURL={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.url}`}
          />
        ) : null
      ) : coverImage ? (
        <PostImg
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.url}`}
          alt={title}
          title={title}
          className="u-photo"
          width="1300"
          height="450"
          placeholder="blur"
          blurDataURL={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.url}`}
        />
      ) : null}
    </>
  )
}
