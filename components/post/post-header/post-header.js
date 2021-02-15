import Author from '@/components/post/post-author/post-author'
import PostTitle from '@/components/title/post-title'
import media from 'styled-media-query';
import styled from 'styled-components';
import Link from 'next/link'
import Date from '@/components/date/date' 
import PostReactions from "@/components/post/post-reactions/post-reactions" 
import PostTags from "@/components/post/post-tags/post-tags"
const _ = require("lodash");


const PostHeaderWrapper = styled.div`
`

const PostTitleWrapper = styled.div`
  max-width: 800px;
  margin: var(--space-sm) 0;
`
const PostMeta = styled.div`
  font-size: .6em;
  margin-bottom: calc(var(--space-sm) *0.5);
  display: flex;
`;

const ReadingTime = styled.span`
  margin-left: var(--space-sm);
`

const ReadingTimeSymbol = styled.i`
`

export default function PostHeader({ postData }) {

  const { id, title, user, tags, date, dateUpdated, readingTime, slug } = postData

  return (
    <>
      <PostHeaderWrapper>
         
        <PostTags tags={tags}/>
        
        <PostTitleWrapper>  
          <PostTitle className="p-name">{title}</PostTitle>   
        </PostTitleWrapper> 

        <PostMeta>
          <Date className="dt-published" dateString={dateUpdated? dateUpdated : date} />
          <PostReactions postId={id} postSlug={slug} preview/>
          <ReadingTime><ReadingTimeSymbol className="las la-book-open" /> {readingTime} min read</ReadingTime>
        </PostMeta>

        {/*<Author author={user} />*/}
          
      </PostHeaderWrapper>
    </>
  )
}
