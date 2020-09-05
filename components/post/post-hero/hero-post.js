import Date from '../../date/date'
import CoverImage from '../post-image/cover-image'
import Link from 'next/link'
import styled from 'styled-components';
import PostPreview from '../post-preview/post-preview'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
}) {
  return (
    <PostPreview
      key={slug}
      title={title}
      coverImage={coverImage}
      date={date}
      author={author}
      slug={slug}
      excerpt={excerpt}
      tags={tags}
    />
  )
}
