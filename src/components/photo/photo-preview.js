import styled from "styled-components"
import PostTags from "src/components/tags/tags"
import HCard from "src/components/microformats/h-card"
import PostMeta from "src/components/post/post-meta/post-meta-preview"
import { Card } from "@/styles/templates/card"
import Image from "next/legacy/image"
import Link from "next/link"
import media from "styled-media-query"

const PreviewContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%,
  ${media.lessThan("small")`
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
    background: rgba(0, 0, 0, 0.8);
  }
  ${media.lessThan("small")`
    padding: calc(var(--space-sm)*0.5) 0;
    width: 100%;
  `}
`

const PhotosTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: var(--space-sm);
  cursor: pointer;
  color: var(--gray);
  :hover {
    text-decoration: underline;
  }
`

const PhotosContent = styled.p`
  max-width: 700px;
  font-family: var(--secondary-font);
  font-size: 0.875rem;
  color: var(--gray);
  margin-bottom: var(--space-sm);
`

const Photo = styled(Image)`
  position: relative;
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
`

export default function PhotoPreview({ photo }) {
  const slug = `/photos/${photo.slug}`

  return (
    <Card className="h-entry">
      <HCard />
      <PreviewContainer>
        <Link href={slug} className="u-url" passHref>
          <PhotoWrapper>
            <Photo
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${
                photo.photo[0].formats.content
                  ? photo.photo[0].formats.content.url
                  : photo.photo[0].url
              }`}
              alt={`Photo of ${photo.title}`}
              title={`Photo of "${photo.title}"`}
              layout="fill"
              className="u-photo"
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
        <PostMeta post={photo} slug={slug} />
      </PreviewContainer>
    </Card>
  )
}
