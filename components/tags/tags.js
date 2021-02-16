import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

const TagsWrapper = styled.div`
  display: block;
`

const TagItem = styled.a`
  font-family: var(--secondary-font);
  border-radius: 3px;
  display: inline-block;
  font-size: 16px;
  margin-right: var(--space-sm);
  :before {
    content: "#";
    margin-right: 2px;
    font-weight: 600;
    color: ${props => props.color ? props.color : '#798ad0'};
  }
  :hover {
    color: ${props => props.color ? props.color : '#798ad0'};
    background-color: var(--gray-extra-light);
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
