import Date from '../date/date'
import CoverImage from '../post/post-image/cover-image'
import Link from 'next/link'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <div>
        <CoverImage title={title} url={coverImage.coverImage.url} slug={slug} caption={coverImage.caption}/>
      </div>
      <div>
        <div>
          <h3 >
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a>{title}</a>
            </Link>
          </h3>
          <div>
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p>{excerpt}</p>
        </div>
      </div>
    </section>
  )
}
