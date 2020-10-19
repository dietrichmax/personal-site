import Link from 'next/link'
import styled from 'styled-components';
import media from 'styled-media-query';
import config from "../../../lib/data/SiteConfig";
//import Img from '@/components/images/image';

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
const PreviewCoverImage = styled.img`
  border-top-left-radius: ${props =>
    props.hero ? "none" : "0.75rem" };
  border-top-right-radius: ${props =>
    props.hero ? "none" : "0.75rem" };
  width: ${props =>
    props.hero ? "100%" : "400px" };;
  height: ${props =>
    props.hero ? "400px" : '200px'};
  object-fit: cover;
  ${media.lessThan('large')`
    height: 200px !important;
    object-fit: cover;
  `}
`

const PostCoverImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  ${media.lessThan('large')`
    height: 200px;
  `}
`

export default function CoverImage({ title, url, slug, caption, hero }) {
  
  const imageUrl = url ? `${url.startsWith('/') ? "https://api.mxd.codes" : ''}${url}` : config.siteLogo

  return (
    <div className="">
      {slug ? (
        <PreviewCoverImageWrapper>
          <Link as={`/articles/${slug}`} href="/articles/[slug]">
              <a aria-label={title}>
                <PreviewCoverImage className="lazyload" data-src={imageUrl} alt={title} title={title} hero={hero} />
              </a>
          </Link>
        </PreviewCoverImageWrapper>

      ) : (

        <PostCoverImageWrapper>
            <PostCoverImage className="lazyload" data-src={imageUrl} alt={title} title={title} />
            <Caption>Bildquelle: {caption} (bearbeitet)</Caption>
        </PostCoverImageWrapper>
        
      )}
    </div>
  )
}
