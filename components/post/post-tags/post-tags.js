import styled from 'styled-components';
import Link from 'next/link'
const _ = require("lodash");

const Tag = styled.a`
  background-color: ${props =>
    props.color ? props.color : '#798ad0'};
  padding: 5px;
  border-radius: 5px;
  font-size: 13px;
  text-transform: uppercase;
  margin: 5px 5px 5px 0;
  color: #fff;
`


export default function PostTags( tags ) {
  console.log(tags)
  return (
    <>
        {tags.map((tag) => (
          <Tag color={tag.color} title={tag.name} ><Link href={`/themen/${_.kebabCase(tag.name)}`}>{tag.name}</Link></Tag>
        ))}
    </>
  )
}
