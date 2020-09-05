import Link from 'next/link'
import Img from 'react-optimized-image';
import styled from 'styled-components';

const Caption = styled.p`
  position: absolute;
  right: 0px;
  padding-right: 12px;
  text-transform: uppercase;
  color: var(--gray);
  font-size: 10px;
  background-color: white;
`

const PostCoverImageWrapper = styled.div`
  display: block;
`

const PreviewCoverImageWrapper = styled.div`
  display: block;
`
const PreviewCoverImage = styled.img`
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  width: 1920px;
  height: 300px;
  object-fit: cover;
`

const PostCoverImage = styled.img`
  width: 1920px;
  height: 300px;
  object-fit: cover;
`

export default function CoverImage({ title, url, slug, caption }) {
  const imageUrl = `${
    url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''
  }${url}`

  return (
    <div className="">
      {slug ? (
        <PreviewCoverImageWrapper>
          <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a aria-label={title}>
                <PreviewCoverImage src={imageUrl} alt={title} title={title} />
              </a>
          </Link>
        </PreviewCoverImageWrapper>

      ) : (

        <PostCoverImageWrapper>
            <PostCoverImage src={imageUrl} alt={title} title={title} />
            <Caption>Bildquelle: {caption}</Caption>
        </PostCoverImageWrapper>
        
      )}
    </div>
  )
}
