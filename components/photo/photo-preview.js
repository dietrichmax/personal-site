import styled from 'styled-components';
import PostTags from "@/components/tags/tags"
import HCard from "@/components/microformats/h-card"
import PostMeta from '@/components/post/post-meta/post-meta'
import { Card } from "@/styles/templates/card"
import Image from "next/image"
import Link from 'next/link'

const PhotoContainer = styled.div`
  padding: calc(var(--space-sm)*0.5) var(--space-sm);
`


const PhotosTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: var(--space-sm);
  cursor: pointer;
`

const PhotosContent = styled.p`
  max-width: 700px;
  font-family: var(--secondary-font);
  font-size: .875rem;
  margin-bottom: var(--space);
`

const Photo= styled(Image)`
  object-fit: cover;
  object-position: bottom;
`

const PhotoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`

export default function PhotoPreview({ photo }) {

  return (       
    <Link
        href={`/photos/${photo.slug}`}
        className="u-url"
        rel="bookmark"
        passHref
    > 
      <Card className="h-entry">   
        <HCard /> 
        <PhotoWrapper>
            <Photo
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${photo.photo[0].formats.small.url}`}
                alt={`Cover medium of photo ${photo.date}`}
                layout="fill"
                className="u-photo" 
            /> 
        </PhotoWrapper>
        <PhotoContainer>
            <PhotosTitle className="p-name">{photo.title}</PhotosTitle>
            <PhotosContent className="e-content">{photo.description}</PhotosContent>
            <PostTags tags={photo.tags} />
            <PostMeta post={photo} slug={`/photos/${photo.slug}`}/>
        </PhotoContainer>
      </Card>
    </Link>
  )
}
