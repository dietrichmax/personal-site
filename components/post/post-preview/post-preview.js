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
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="w-full">
          <CoverImage slug={slug} title={title} url={coverImage.coverImage.url} caption={coverImage.caption}/>
        </div>
        <div class="px-6 py-4">
            <Link as={`/blog/${slug}`} href="/blog/[slug]">
              <a class="font-bold text-xl mb-2 hover:underline">{title}</a>
            </Link>
          <div className="text-lg mb-4">
            <Date dateString={date} />
          </div>
          <p class="text-gray-700 text-base">{excerpt}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
          {tags.map((tag) => (
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag.name}</span>
              ))}
        </div>
      </div>
    </div>
  )
}
