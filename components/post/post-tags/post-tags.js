import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

export const TagsWrapper = styled.div`
  display: block;
`

export const TagItem = styled.a`
  display: inline-block;
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;
  font-size: .6em;
  background-color: ${props =>
    props.color ? props.color : '#798ad0'};
  color: white;
  padding: calc(var(--space-sm)*0.5) var(--space-sm);
  margin-right: var(--space);
  border-radius: var(--space-sm);
  :hover {
    color: ${props =>
      props.color ? props.color : '#798ad0'};
      background-color: white;
  }
`

export default function PostTags( tags, post) {
  const postTags = tags.tags

  return (
    <>
        <TagsWrapper layout={post}>
          {postTags.map((tag, i) => (
            <Link key={i} href={`/articles/topics/${tag.slug}`} passHref>
              <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
            </Link>
          ))}
        </TagsWrapper>
    </>
  )
}
