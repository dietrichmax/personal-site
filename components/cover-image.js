import Link from 'next/link'
import Img from 'react-optimized-image';

export default function CoverImage({ title, url, slug, caption }) {
  const imageUrl = `${
    url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''
  }${url}`

  return (
    <div className="">
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
            <a aria-label={title}>
              <img src={imageUrl} alt={title} title={title} />
            </a>
        </Link>
      ) : (
        <div>
          <img src={imageUrl} alt={title} title={title} style={{width:'1920px',height:'400px'}}/>
          Bildquelle: {caption}
        </div>
      )}
    </div>
  )
}
