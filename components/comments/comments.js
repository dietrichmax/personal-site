import React, { useState, useEffect } from "react"
import styled from 'styled-components';
import media from 'styled-media-query';
import { getComments } from '@/lib/data/external/cms'
import { parseISO, formatDistance } from 'date-fns'



export default function PostComments({ slug }) {
  const [comments, setComments] = useState([])
console.log(comments)

  useEffect(() => {
    async function fetchStrapiAPI(query, { variables } = {}) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      })
      
      const json = await res.json()
      if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch STRAPI API')
      }
    
      setComments(json.data.comments)
    }
    fetchStrapiAPI(
      `
      query CommentBySlug($where: JSON) { 
        comments(sort: "created_at:desc",  where: $where) {
          slug
          name
          email
          text
          created_at
        }
      }
    `,
    {
      variables: {
        where: {
          slug,
        }
      },
    })
  }, []);


  return (
    comments.length > 0 ?
      <Comments> 
        <CommentsTitle>Comments</CommentsTitle>
        {comments.map((comment,i) => (
          <Comment key={i} authorName={comment.name} className="p-comment h-cite comment">
            <CommentAuthor className="p-author h-card author" >
              <CommentAuthorName className="p-name u-url">{comment.name}</CommentAuthorName>
                <CommentDate className="dt-published">{comment.created_at ? `${formatDistance(parseISO(comment.created_at), new Date())} ago` : null}</CommentDate>
              </CommentAuthor>
              <CommentContent className="e-content comment-content">{comment.text? comment.text : null}</CommentContent>
          </Comment>
        ))}
      </Comments>
    : null
  )
}

const Comments = styled.ol`
  list-style: none;
  padding-inline-start: 0;
  border-top: 0.1rem solid var(--gray-light);
  margin: var(--space) 0;
  padding-top: var(--space-sm);
`
const CommentsTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;    
  margin-bottom: var(--space-sm);
`

const Comment = styled.li`
  margin-bottom: var(--space-sm);
  font-family: var(--secondary-font);
  background-color: var(--content-bg);
  border-bottom: ${props => (props.authorName == "Max" ? "2px solid var(--thirdy-color)"  : "none")};
  padding: var(--space-sm);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
`


const CommentAuthor = styled.div`  
  margin-bottom: calc(var(--space-sm)*.5);
`


const CommentAuthorName = styled.a`
  font-weight: 600;  
  display: inline-block;
  margin-right: calc(var(--space-sm)*.5);
`

const CommentDate = styled.time`
  font-size: 14px;
  ${media.lessThan('small')`
    display: none;
  `}
`

const CommentContent = styled.p`
  font-family: var(--secondary-font);
`