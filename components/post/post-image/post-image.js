import React,  { useEffect } from "react"
import styled from 'styled-components';
import Image from "next/image"
import Link from "next/link"
import media from "styled-media-query"

const CardItemImg = styled(Image)`
  cursor: pointer;
  width: 526px; 
  height: 205px;
  object-fit: cover;
  border-radius: var(--border-radius);
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
  border-radius: var(--border-radius);
  ${media.lessThan('large')`
    height: 200px;
    object-fit: cover;
  `}
`

const ImagePreviewPlaceholder = styled.div`
  background-color: var(--primary-color);
  transition: 0.2s;
  color: var(--gray-extra-light);
  font-family: var(--secondary-font);
  display: flex;
  vertical-align: center;
  justify-content: space-around;
  cursor: pointer;
  width: 526px; 
  height: 205px;
  border-radius: var(--border-radius);
  :hover {
    background-color: #fff;
    color: var(--primary-color);
  }
  ${media.lessThan('large')`
    height: 200px;
    object-fit: cover;
  `}
`

const FallbackPreviewTitle = styled.p`
  font-size: 1.5rem;
  margin: auto;
  padding: var(--space-sm);
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
  border-radius: var(--border-radius);
  ${media.lessThan('large')`
    height: 200px;
    object-fit: cover;
  `}
`


export default function PostImage({ preview, postData }) {

const { title, excerpt, slug, tags, coverImage } = postData


  return (
    <> {preview ?
      coverImage.coverImage ? (
        <Link href={`/articles/${slug}`} aria-label={title}>
          <CardItemImg 
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.coverImage.formats.medium.url}`}
            alt={title} 
            title={title} 
            width="544"
            height="201"
          />
        </Link>
      ) : (
          <Link href={`/articles/${slug}`} aria-label={title}>
            <ImagePreviewPlaceholder title={title}>
              <FallbackPreviewTitle>{title}</FallbackPreviewTitle>
            </ImagePreviewPlaceholder>
          </Link>
      ) : (
        coverImage.coverImage ? (
          <PostImg 
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.coverImage.url}`}
            alt={title} 
            title={title} 
            width="1300"
            height="450"
          /> 
        ) : (
            <Link as={`/articles/${slug}`} href="/articles/[slug]" aria-label={title} passHref>
              <ImagePlaceholder title={title} />
            </Link>
            )
    )}
    </>
  )
}
