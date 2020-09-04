import Date from '../../date/date'
import CoverImage from '../post-image/cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
}) {
  return (
    <div>
      <div>
        <div >
          <CoverImage slug={slug} title={title} url={coverImage.coverImage.url} caption={coverImage.caption}/>
        </div>
        <div>
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a>{title}</a>
            </Link>
          <div>
            <Date dateString={date} />
          </div>
          <p>{excerpt}</p>
        </div>
        <div>
          {tags.map((tag, i) => (
                <span key={i}>{tag.name}</span>
              ))}
        </div>
      </div>
    </div>
  )
}
