import Link from 'next/link'
import styled from 'styled-components';
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig";
import Image from 'next/image'

const Caption = styled.p`
  text-transform: uppercase;
  color: var(--gray);
  font-size: 10px;
  text-align: right;
  margin-right: var(--space-sm);
`

const PostCoverImageWrapper = styled.div`
`

const PreviewCoverImageWrapper = styled.div`
  
  margin-left: var(--space);
  margin-right: var(--space);
  display: block;
`
const PreviewCoverImage = styled(Image)`
  width: 526px; 
  height: 205px;
  object-fit: cover;
  ${media.lessThan('large')`
    height: 200px;
    object-fit: cover;
  `}
`

const PostCoverImage = styled(Image)`
  text-align: center;
  height: 400px;
  margin-left: var(--space);
  margin-right: var(--space);
  object-fit: cover;
  ${media.lessThan('large')`
    height: 200px;
  `}
`

export default function CoverImage({ title, url, slug, caption, hero }) {
  
  const imageUrl = url ? `${url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${url}` : config.siteLogo

  return (
    <div className="">
      {slug ? (
        <PreviewCoverImageWrapper>
          <Link as={`/articles/${slug}`} href="/articles/[slug]" aria-label={title}>
            <PreviewCoverImage 
              src={imageUrl} 
              alt={title} 
              title={title} 
              width="526"
              height="205"
            />
          </Link>
        </PreviewCoverImageWrapper>

      ) : (

        <PostCoverImageWrapper>
            <PostCoverImage 
              src={imageUrl} 
              alt={title} 
              title={title} 
              width="1920"
              height="400"
            />
            <Caption>Bildquelle: {caption} (modified)</Caption>
        </PostCoverImageWrapper>
        
      )}
    </div>
  )
}
