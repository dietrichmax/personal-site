import Author from '../post-author/post-author'
import CoverImage from '../post-image/cover-image'
import PostTitle from '../../title/content-title'
import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

const TagsWrapper = styled.a`
  display: block;
  margin-top: 1rem;
`

const Tags = styled.a`
  background-color: ${props =>
    props.color ? props.color : '#798ad0'};
  padding: 5px;
  border-radius: 5px;
  font-size: 13px;
  text-transform: uppercase;
  margin: 15px 10px 5px 0;
  color: #fff;
`

const PostHeaderWrapper = styled.div`
  max-width: 640px;
  margin: auto;
`

export default function PostHeader({ title, coverImage, date, author, tags }) {
  
  return (
    <>
      <CoverImage title={title} url={coverImage.coverImage.url} caption={coverImage.caption}/>
      <PostHeaderWrapper>

        <TagsWrapper>
          {tags.map((tag) => (
            <Tags color={tag.color} title={tag.name} ><Link href={`/themen/${_.kebabCase(tag.name)}`}>{tag.name}</Link></Tags>
          ))}
        </TagsWrapper>

        <PostTitle>{title}</PostTitle>
          
        <Author name={author.name} picture={author.picture} bio={author.bio} socials={author.socials} date={date} />

      </PostHeaderWrapper>
    </>
  )
}
