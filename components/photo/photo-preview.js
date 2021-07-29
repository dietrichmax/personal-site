import styled from 'styled-components';
import PostTags from "@/components/tags/tags"
import HCard from "@/components/microformats/h-card"
import PostMeta from '@/components/post/post-meta/post-meta-preview'
import { Card } from "@/styles/templates/card"
import Image from "next/image"
import Link from 'next/link'
import media from "styled-media-query"

const PreviewContainer = styled.div`
  display: flex;
  width: 100%;
  ${media.lessThan('small')`
    display: block;
  `}
`

const PhotoContainer = styled.div`
  position: absolute;
  padding: var(--space-sm);    
  opacity: 0;
  transition: 0.2s;
  height: 100%;
  width: 100%;
  :hover {
    opacity: 1;
    height: 200px;
    width: 100%;
    padding: var(--space-sm);
    position: absolute;
    background: rgba(0,0,0,0.8);
  }
  ${media.lessThan('small')`
    padding: calc(var(--space-sm)*0.5) 0;
    width: 100%;
  `}
`


const PhotosTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: var(--space-sm);
  cursor: pointer;
  color: var(--secondary-color);
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
  width: 100%;
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
