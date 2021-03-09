import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

const TagsWrapper = styled.div`
  display: block;
`

const TagItem = styled.a`
  border-radius: var(--border-radius);
  display: inline-block;
  font-size: .75rem;
  margin-right: var(--space-sm);    
  margin-top: .25rem;
  padding: 3px calc(var(--space-sm)*0.5);
  background-color: var(--primary-color);
  color: var(--content-bg);
  font-family: var(--secondary-font);
  :hover {
    color: ${props => props.color ? props.color : 'var(--primary-color'};
    background-color: ${props => props.bgColor ? props.bgColor : '#798ad0'};
  }
`

export default function PostTags( tags ) {
  const postTags = tags.tags

  return (
    <>
        <TagsWrapper>
          {postTags.map((tag, i) => (
            <Link key={i} href={`/articles/topics/${tag.slug}`} passHref>
              <TagItem rel="tag" className="p-category" color={tag.color} bgColor={tag.backgroundColor} title={tag.name}>{tag.name}</TagItem>
            </Link>
          ))}
        </TagsWrapper>
    </>
  )
}
