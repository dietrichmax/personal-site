import styled from "styled-components"
import dynamic from "next/dynamic"
import HCard from "@/src/components/microformats/h-card"
import { Card } from "@/styles/templates/card"
import Image from "next/image"
import Link from "next/link"
import media from "styled-media-query"

const PreviewContainer = styled.div`
  display: flex;
  width: 100%;
  ${media.lessThan("small")`
    display: block;
  `}
`

const Photo = styled(Image)`
  position: fixed;
  object-fit: cover;
  object-position: bottom;
  transition: 0.5s;
  :hover {
    transform: scale(1.02);
  }
`

const PhotoWrapper = styled.div`
  cursor: pointer;
  height: auto;
  width: 100%;
  min-height: 400px;
`

const DynamicPostMeta = dynamic(
  () => import("@/src/components/post/post-meta/post-meta-preview"),
  {
    loading: () => <p>Loading...</p>,
  }
)

interface PhotoPreview {
  photo: any
}

export default function PhotoPreview({ photo }) {
  return (
    <Card className="h-entry">
      <HCard />
      <PreviewContainer>
        <Link href={`/photos/${photo.slug}`} className="u-url" passHref>
          <PhotoWrapper>
            <Photo
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${photo.photo.data[0].attributes.url}`}
              alt={`Photo of ${photo.title}`}
              title={`Photo of "${photo.title}"`}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="u-photo"
              blurDataURL={photo.photo.data[0].attributes.blurhash}
              placeholder="blur"
            />
          </PhotoWrapper>
        </Link>
        {/*<PhotoContainer>
          <PhotosTitle>
            <Link href={slug} className="u-url">
              <a className="p-name" rel="bookmark">{photo.title}</a>
            </Link>
          </PhotosTitle>
          <PhotosContent className="e-content">{photo.description}</PhotosContent>
          <PostTags tags={photo.tags} />
          <PostMeta post={photo} slug={`/photos/${photo.slug}`}/>
        </PhotoContainer>*/}
        <DynamicPostMeta post={photo} slug={photo.slug} />
      </PreviewContainer>
    </Card>
  )
}
