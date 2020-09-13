import Author from '@/components/post/post-author/post-author'
import PostTitle from '@/components/title/content-title'
//import PostTags from '@/components/post/post-tags/post-tags'
import media from 'styled-media-query';
import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

const TagsWrapper = styled.div`
  display: block;
  margin-top: var(--space-sm);
`

const TagItem = styled.button`
  background-color: ${props =>
    props.color ? props.color : '#798ad0'};
  padding: calc(var(--space-sm)*0.5);
  border-radius: calc(var(--space-sm)*0.5);
  font-size: 13px;
  text-transform: uppercase;
  margin: calc(var(--space-sm)*0.5) var(--space-sm) calc(var(--space-sm)*0.5) 0;
  color: #fff;
  transition: 0.3s;
  cursor: pointer;
  border: none;
  outline: none;
  :hover {
    background-color: white;
    color: ${props =>
      props.color ? props.color : '#798ad0'};
  }
`

const PostHeaderWrapper = styled.div`
  max-width: 640px;
  margin: auto;
  margin-bottom: var(--space-sm);
  border-bottom: 1px solid var(--gray-light);
`

const DateWrapper = styled.div`
  max-width: 640px;
  margin: auto;
  ${media.lessThan('large')`
    padding-left: 1rem;
    padding-right: 1rem;
  `}
`

export default function PostHeader({ postData }) {

  
  const { title, user, tags } = postData
  
  return (
    <>
      <PostHeaderWrapper>

        <TagsWrapper>
          {tags.map((tag, i) => (
              <Link key={i} href={`/blog/themen/${tag.slug}`}>
                <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
              </Link>
          ))}
        </TagsWrapper>

        <PostTitle>{title}</PostTitle>

        <Author author={user} />
          
      </PostHeaderWrapper>
    </>
  )
}
