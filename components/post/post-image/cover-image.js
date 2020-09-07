import Link from 'next/link'
import Img from 'react-optimized-image';
import styled from 'styled-components';
import media from 'styled-media-query';
const Jimp = require('jimp');

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
  height: 220px;
  object-fit: cover;
  ${media.lessThan('large')`
    height: 200px;
  `}
`

const PostCoverImage = styled.img`
  width: 1920px;
  height: 300px;
  object-fit: cover;
  ${media.lessThan('large')`
    height: 200px;
  `}
`

export default function CoverImage({ title, url, slug, caption }) {
  
  const imageUrl = `${url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${url}`

  const image = await Jimp.read(imageUrl);
  
  await image.resize(150, 150);
  
  await image.writeAsync(`test/${Date.now()}_150x150.png`);

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
