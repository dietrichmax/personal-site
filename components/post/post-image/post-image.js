import React,  { useEffect } from "react"
import styled from 'styled-components';
import Image from "next/image"
import Link from "next/link"
import media from "styled-media-query"

const CardItemImg = styled(Image)`
  cursor: pointer;
  width: ${props => props.width ? `${props.width}px` : '350px'};
  height: ${props => props.height ? `${props.height}px` : '130px'};
  object-fit: cover;
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
  ${media.lessThan('large')`
    height: 200px;
    object-fit: cover;
  `}
`

const PostImg = styled(Image)`
  box-shadow: 0 20px 30px rgba(0,0,0,0.1);
  position: relative;
  object-fit: cover;
  max-width: 1300px;
  height: 450px;
  cursor: pointer;
  border-radius: var(--border-radius);
  ${media.lessThan('large')`
    height: 200px;
    object-fit: cover;
  `}
`

const ImagePlaceholder = styled.div`
  background-color: var(--primary-color);
  box-shadow: 0 20px 30px rgba(0,0,0,0.1);
  transition: 0.2s;
  color: #fff;
  font-family: var(--secondary-font);
  display: flex;
  vertical-align: center;
  justify-content: space-around;
  cursor: pointer;
  width: 1300px; 
  height: 450px;
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
  ${media.lessThan('large')`
    height: 200px;
    object-fit: cover;
  `}
`


export default function PostImage({ preview, previewLarge, postData }) {

const { title, slug, coverImage } = postData

  return (
    <> {preview ?
      coverImage.coverImage ? (
          <CardItemImg 
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.coverImage.url}`}
            alt={title} 
            title={title} 
            width="350"
            height="130"
          />
      ) : ( null ) : (
        coverImage.coverImage ? (
          <Link href={`/articles/${slug}`} aria-label={title} passHref>
          <PostImg 
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.coverImage.url}`}
            alt={title} 
            title={title} 
            width="1300"
            height="450"
          /> 
          </Link>
        ) : (
            <Link as={`/articles/${slug}`} href="/articles/[slug]" aria-label={title} passHref>
              <ImagePlaceholder title={title} />
            </Link>
            )
    )}
    </>
  )
}
