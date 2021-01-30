import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

export const TagsWrapper = styled.div`
  display: block;
  margin: var(--space) var(--space) var(--space-lg) var(--space);
  padding: var(--space-lg);
  text-align: center;
`

export const TagItem = styled.a`
  display: inline-block;
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;
  font-size: 1.3rem;
  padding: calc(var(--space-sm)*0.2) var(--space-sm);
  margin: calc(var(--space-sm)*0.5);
  background-color: var(--gray-light);
  border-radius: var(--space-sm);
  :hover {
    background-color: ${props =>
      props.color ? props.color : '#798ad0'};
    color: white;
  }
`

export default function PostTags( tags, post) {
  const postTags = tags.tags

  return (
    <>
        <TagsWrapper layout={post}>
          {postTags.map((tag, i) => (
            <Link key={i} href={`/articles/topics/${tag.slug}`}>
              <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
            </Link>
          ))}
        </TagsWrapper>
    </>
  )
}
