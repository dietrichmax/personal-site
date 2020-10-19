import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

const TagsWrapper = styled.div`
  display: block;
  margin: 0 var(--space) var(--space-lg) var(--space);
  padding: var(--space-lg);
  text-align: center;
  background-color: #fff;
  border: 1px solid var(--gray-light);
`

const TagItem = styled.a`
  display: inline-block;
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.3rem;
  padding: calc(var(--space-sm)*0.2) var(--space-sm);
  margin: calc(var(--space-sm)*0.5);
  background-color: var(--primary-color);
  color: var(--gray-light);
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
            <Link key={i} href={`/blog/themen/${tag.slug}`}>
              <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
            </Link>
          ))}
        </TagsWrapper>
    </>
  )
}