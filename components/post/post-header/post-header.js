import Author from '@/components/post/post-author/post-author'
import PostTitle from '@/components/title/content-title'
//import PostTags from '@/components/post/post-tags/post-tags'
import media from 'styled-media-query';
import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

const TagsWrapper = styled.div`
  display: block;
  margin-top: var(--space);
  margin-bottom: var(--space);
`

const TagItem = styled.a`
  display: inline-block;
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.4rem;
  padding: calc(var(--space-sm)*0.2) var(--space-sm);
  margin-right: var(--space-sm);
  background-color: var(--primary-color);
  color: var(--gray-light);
  border-radius: var(--space-sm);
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
              <Link key={i} href={`/articles/topics/${tag.slug}`}>
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
