import styled from 'styled-components';
import PostTags from "@/components/tags/tags"
import HCard from "@/components/microformats/h-card"
import PostMeta from '@/components/post/post-meta/post-meta'
import { Card } from "@/styles/templates/card"
import Image from "next/image"
import Link from 'next/link'
import media from "styled-media-query"

const PreviewContainer = styled.div`
  ${media.lessThan('small')`
    display: block;
  `}
`

const PhotoContainer = styled.div`
  padding: 0 var(--space-sm);
  width: 50%;
  ${media.lessThan('small')`
    calc(var(--space-sm)*0.5) 0
    width: 100%
  `}
`


const PhotosTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: var(--space-sm);
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`

const PhotosContent = styled.p`
  max-width: 700px;
  font-family: var(--secondary-font);
  font-size: .875rem;
  margin-bottom: var(--space-sm);
`

const Photo= styled(Image)`
  object-fit: cover;
  object-position: bottom;
`

const PhotoWrapper = styled.div`
  position: relative;
  cursor: pointer;
  height: 200px;
  width: 50%;
  ${media.lessThan('small')`
   width: 100%
  `}
`

export default function PhotoPreview({ photo }) {

  return (       
    <Card className="h-entry">   
      <HCard /> 
      <PreviewContainer>
        <PhotoWrapper> 
          <Link href={`/photos/${photo.slug}`} className="u-url" passHref>
            <Photo
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${photo.photo[0].formats.thumbnail.url}`}
              alt={`Cover medium of photo ${photo.date}`}
              layout="fill"
              className="u-photo" 
            /> 
          </Link>
        </PhotoWrapper>
        <PhotoContainer>
          <PhotosTitle>
            <Link href={`/photos/${photo.slug}`} className="u-url">
              <a className="p-name" rel="bookmark">{photo.title}</a>
            </Link>
          </PhotosTitle>
          <PhotosContent className="e-content">{photo.description}</PhotosContent>
          <PostTags tags={photo.tags} />
          <PostMeta post={photo} slug={`/photos/${photo.slug}`}/>
        </PhotoContainer>
      </PreviewContainer>
    </Card>
  )
}
