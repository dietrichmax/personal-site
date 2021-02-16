import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

export const TagsWrapper = styled.div`
  display: block;
`

export const TagItem = styled.a`
  background: var(--gray-extra-light);
  border-radius: 3px;
  display: inline-block;
  font-size: 12px;
  line-height: 1.6;
  margin: 4px 8px 4px 0;
  padding: 2px 6px;
  :hover {
    background-color: ${props => props.color ? props.color : '#798ad0'};
    color: white;
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
