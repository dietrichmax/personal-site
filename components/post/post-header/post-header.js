import Author from '@/components/post/post-author/post-author'
import PostTitle from '@/components/title/content-title'
import media from 'styled-media-query';
import styled from 'styled-components';
import Link from 'next/link'
import Date from '@/components/date/date' 
import PostReactions from "@/components/post/post-reactions/post-reactions" 
const _ = require("lodash");

const TagsWrapper = styled.div`
  display: block;
  margin-top: var(--space);
  margin-bottom: var(--space-sm);
`

const PostHeaderWrapper = styled.div`
`

const PostTitleWrapper = styled.div`
  border-bottom: 1px solid var(--thirdy-color);
  margin-bottom: var(--space-sm);
`
const PostMeta = styled.div`
  font-size: 1.3rem;
  margin-bottom: calc(var(--space-sm) *0.5);
  display: flex;
`;

const ReadingTime = styled.span`
  margin-left: var(--space-sm);
`

const ReadingTimeSymbol = styled.i`
`

const TagItem = styled.a`
  display: inline-block;
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;
  font-size: 1.3rem;
  padding: calc(var(--space-sm)*0.2) var(--space-sm);
  margin: calc(var(--space-sm)*0.5);
  background-color: var(--secondary-color);
  border-radius: var(--space-sm);
  :hover {
    background-color: ${props =>
      props.color ? props.color : '#798ad0'};
    color: white;
  }
`
export default function PostHeader({ postData }) {

  
  const { title, user, tags, date, id, readingTime } = postData

  return (
    <>
      <PostHeaderWrapper>

        <TagsWrapper>
          {tags.map((tag, i) => (              
            <Link key={i} href={`/articles/topics/${tag.slug}`} passHref>
              <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
            </Link>
          ))}
        </TagsWrapper>

        <PostTitleWrapper>  
          <PostTitle>{title}</PostTitle>   
        </PostTitleWrapper> 

        <PostMeta>
          <Date dateString={date} />
          <PostReactions postID={id} preview/>
          <ReadingTime><ReadingTimeSymbol className="las la-book-open" /> {readingTime} min read</ReadingTime>
        </PostMeta>

        <Author author={user} />
          
      </PostHeaderWrapper>
    </>
  )
}
