import Author from '@/components/post/post-author/post-author'
import PostTitle from '@/components/title/post-title'
import media from 'styled-media-query';
import styled from 'styled-components';
import Link from 'next/link'
import Date from '@/lib/utils/date/date' 
import Webmentions from "@/components/social/webmentions/webmentions" 
import PostTags from "@/components/tags/tags"
const _ = require("lodash");


const PostHeaderWrapper = styled.div`
`

const PostTitleWrapper = styled.div`
  max-width: 800px;
`
const PostMeta = styled.div`
  font-size: 0.875rem;;
  display: flex;
  margin: calc(var(--space-sm)*0.5) 0;
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
        
        <PostTitleWrapper>  
          <PostTitle className="p-name">{title}</PostTitle>   
        </PostTitleWrapper> 

        <PostMeta>
          <Date className="dt-published" dateString={dateUpdated? dateUpdated : date} /><span>{dateUpdated? "(Updated)" : null}</span>
          <Webmentions slug={`/articles/${slug}`} preview/>
          <ReadingTime><ReadingTimeSymbol className="las la-book-open" /> {readingTime} min read</ReadingTime>
        </PostMeta>
         
         <PostTags tags={tags}/>

        {/*<Author author={user} />*/}
          
      </PostHeaderWrapper>
    </>
  )
}
