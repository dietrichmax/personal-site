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
  width: 100%;
  border-radius: var(--border-radius);
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


export default function PostImage({ preview, previewLarge, postData }) {

const { title, slug, coverImage } = postData

  return (
    <> {preview ?
      coverImage.coverImage ? (
        <Link href={`/articles/${slug}`} aria-label={title}>
          <CardItemImg 
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.coverImage.url}`}
            alt={title} 
            title={title} 
            width={previewLarge ? "550" : "350"}
            height={previewLarge ? "200" : "130"}
          />
        </Link>
      ) : ( null ) : (
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
