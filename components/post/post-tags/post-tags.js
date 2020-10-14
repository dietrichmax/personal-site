import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

export const TagsWrapper = styled.a`
  display: block;
  margin-top: var(--space);
`

export const TagItem = styled.a`
  background-color: ${props =>
    props.color ? props.color : '#798ad0'};
  padding: 5px;
  border-radius: 5px;
  font-size: 13px;
  text-transform: uppercase;
  margin: 15px 10px 5px 0;
  color: #fff;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    background-color: white;
    color: ${props =>
      props.color ? props.color : '#798ad0'};
  }
`

export default function PostTags( tags ) {
  const  postTags = []
  Object.values(tags).forEach((value) => (
    console.log(value[1]),
    postTags.push({
      name: value.name,
      color: value.color,
      slug: value.slug,
    })
  ));
  //console.log(postTags)
  return (
    <>
        <TagsWrapper>
          {postTags .map((tag, i) => (
              <Link key={i} href={`/blog/themen/${tag.slug}`}>
                <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
              </Link>
          ))}
        </TagsWrapper>
    </>
  )
}
