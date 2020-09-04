import Link from 'next/link'
import Img from 'react-optimized-image';
import styled from 'styled-components';

const Caption = styled.a`
  position: absolute;
  right: 0px;
  padding-right: 12px;
  text-transform: uppercase;
  color: var(--gray);
  font-size: 10px;
  background-color: white;
`

const CoverImageWrapper = styled.div`
  display: block;
`


export default function CoverImage({ title, url, slug, caption }) {
  const imageUrl = `${
    url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''
  }${url}`

  return (
    <div className="">
      {slug ? (
        <CoverImageWrapper>
          <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a aria-label={title}>
                <img src={imageUrl} alt={title} title={title} style={{width:'1920px',height:'400px',objectFit:'cover'}} />
              </a>
          </Link>
        </CoverImageWrapper>

      ) : (

        <CoverImageWrapper>
          <div>
            <img src={imageUrl} alt={title} title={title} style={{width:'1920px',height:'400px',objectFit:'cover'}}/>
            <Caption>Bildquelle: {caption}</Caption>
          </div>
        </CoverImageWrapper>
        
      )}
    </div>
  )
}
