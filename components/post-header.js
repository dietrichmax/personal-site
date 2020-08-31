import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date, author, tags }) {
  return (
    <>
      <div className="">
        <CoverImage title={title} url={coverImage.coverImage.url} caption={coverImage.caption}/>
      </div>
      
      {tags.map((tag) => (
              <span>{tag.name}{' '}</span>
            ))}
      <PostTitle>{title}</PostTitle>
      <div className="">
        <Avatar name={author.name} picture={author.picture} bio={author.bio} />
      </div>
      <Date dateString={date} />
    </>
  )
}
