import Link from 'next/link'
import styled from 'styled-components';
import media from 'styled-media-query';
import config from "../../../data/SiteConfig";
import Img from '@/components/images/image';

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
  display: block;
`
const PreviewCoverImage = styled(Img)`
  border-top-left-radius: ${props =>
    props.hero ? "none" : "0.75rem" };
  border-top-right-radius: ${props =>
    props.hero ? "none" : "0.75rem" };
  max-width: ${props =>
    props.hero ? "100%" : "400px" };;
  height: ${props =>
    props.hero ? "400px" : '200px'};
  object-fit: cover;
  ${media.lessThan('large')`
    height: 200px !important;
    object-fit: cover;
  `}
`

const PostCoverImage = styled(Img)`
  width: 100%;
  height: 400px;
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
          <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a aria-label={title}>
                <PreviewCoverImage src={imageUrl} alt={title} title={title} hero={hero} />
              </a>
          </Link>
        </PreviewCoverImageWrapper>

      ) : (

        <PostCoverImageWrapper>
            <PostCoverImage src={imageUrl} alt={title} title={title} />
            <Caption>Bildquelle: {caption} (bearbeitet)</Caption>
        </PostCoverImageWrapper>
        
      )}
    </div>
  )
}
