import Link from 'next/link'
import Img from 'react-optimized-image';
import styled from 'styled-components';
import media from 'styled-media-query';

const Caption = styled.p`
  text-transform: uppercase;
  color: var(--gray);
  font-size: 10px;
  background-color: white;
  text-align: right;
`

const PostCoverImageWrapper = styled.div`
  display: block;
`

const PreviewCoverImageWrapper = styled.div`
  display: block;
`
const PreviewCoverImage = styled.img`
  border-top-left-radius: ${props =>
    props.hero ? "none" : "0.75rem" };
  border-top-right-radius: ${props =>
    props.hero ? "none" : "0.75rem" };
  width: 100%;
  height: ${props =>
    props.hero ? "400px" : '200px'};
  object-fit: cover;
  ${media.lessThan('large')`
    height: ${props =>
      props.hero ? "300px" : '200px'};
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

export default function CoverImage({ title, slug, caption, hero, hash, ext }) {
  
  const previewImageUrl = hero ? 
    `/api/image/w=1920&h=400/https%3A%2F%2Fapi.gis-netzwerk.com%2Fuploads%2F${hash}${ext}` : 
    `/api/image/w=400&h=200/https%3A%2F%2Fapi.gis-netzwerk.com%2Fuploads%2F${hash}${ext}`

  const postImageUrl =  `/api/image/w=1920&h=400/https%3A%2F%2Fapi.gis-netzwerk.com%2Fuploads%2F${hash}${ext}`
  
  return (
    <div className="">
      {slug ? (
        <PreviewCoverImageWrapper>
          <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a aria-label={title}>
                <PreviewCoverImage src={previewImageUrl} alt={title} title={title} hero={hero} />
              </a>
          </Link>
        </PreviewCoverImageWrapper>

      ) : (

        <PostCoverImageWrapper>
            <PostCoverImage src={postImageUrl} alt={title} title={title} />
            <Caption>Bildquelle: {caption}</Caption>
        </PostCoverImageWrapper>
        
      )}
    </div>
  )
}
