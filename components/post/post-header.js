import Avatar from '../author/avatar'
import Date from '../date/date'
import CoverImage from '../image/cover-image'
import PostTitle from '../title/content-title'
import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

const Tags = styled.a`
  background-color: ${props =>
    props.color ? props.color : '#798ad0'};
  padding: 5px;
  border-radius: 5px;
  font-size: 13px;
  text-transform: uppercase;
  margin: 5px 5px 5px 0;
  color: #fff;
`

const PostHeaderWrapper = styled.div`
  max-width: 1140px;
  margin: auto;
`

export default function PostHeader({ title, coverImage, date, author, tags }) {
  
  return (
    <>
      <CoverImage title={title} url={coverImage.coverImage.url} caption={coverImage.caption}/>
      <PostHeaderWrapper>
        {tags.map((tag) => (
          <Tags color={tag.color} title={tag.name} ><Link href={`/themen/${_.kebabCase(tag.name)}`} >{tag.name}</Link></Tags>
        ))}
  
        <PostTitle>{title}</PostTitle>
        
        <Avatar name={author.name} picture={author.picture} bio={author.bio} socials={author.socials}/>

        <Date dateString={date} />
      </PostHeaderWrapper>
    </>
  )
}
