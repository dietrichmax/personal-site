import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

const TagsWrapper = styled.div`
  display: block;
`

const TagItem = styled.a`
  border-radius: var(--border-radius);
  display: inline-block;
  font-size: .875rem;
  margin-right: var(--space-sm);    
  margin-top: .25rem;
  padding: 3px calc(var(--space-sm)*0.5);
  background-color: var(--content-bg);
  font-family: var(--secondary-font);
  :before {
    content: "# ";
    color: ${props => props.color ? props.color : '#798ad0'};
  }
  :hover {
    color: ${props => props.color ? props.color : '#798ad0'};
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
