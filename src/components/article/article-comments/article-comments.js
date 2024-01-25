import { useEffect, useState } from "react"
import { Button } from "@/styles/templates/button"
import styled from "styled-components"
import media from "styled-media-query"
import { formatDistance } from "date-fns"

const CommentWrapper = styled.div`
  border-top: 0.1rem solid var(--content-bg);
  border-bottom: 0.1rem solid var(--content-bg);
  margin: var(--space) 0;
  padding: var(--space) 0 var(--space) 0;
  display: flex;
  flex-direction: column;
`

const CommentTitle = styled.label`
  font-size: 1.5rem;
  font-weight: 600;
`

const CommentTitleSpan = styled.span`
  color: #c0392b;
`

const CommentInput = styled.textarea`
  padding: calc(var(--space-sm) * 0.5) var(--space-sm);
  margin-top: var(--space-sm);
  height: 200px;
  max-width: var(--content-width);
  background-color: var(--content-bg);
  border: none;
  color: var(--text-color);
  font-family: var(--secondary-font);
  line-height: 1.65;
  margin-bottom: var(--space);
  &:focus {
    border: none;
  }
`

const CommentAuthorLabel = styled.label``

const CommentAuthorInput = styled.input`
  padding: calc(var(--space-sm) * 0.5) var(--space-sm);
  margin-top: var(--space-sm);
  max-width: var(--content-width);
  background-color: var(--content-bg);
  border: none;
  color: var(--text-color);
  font-family: var(--secondary-font);
  line-height: 1.65;
  margin-bottom: var(--space);
  &:focus {
    border: none;
  }
`

const Submit = styled(Button)`
  max-width: var(--content-width);
`

const CommentsWrapper = styled.div`
  margin-bottom: var(--space);
`

const Comment = styled.div`
  margin-bottom: var(--space-sm);
  background-color: var(--content-bg);
  padding: var(--space-sm);
  border-radius: var(--border-radius);
`

const CommentAuthor = styled.div`
  margin-bottom: var(--space-sm);
`

const CommentAuthorName = styled.span`
  font-weight: 600;
  display: inline-block;
  margin-right: calc(var(--space-sm) * 0.5);
`

const CommentDate = styled.time`
  font-size: 14px;
  ${media.lessThan("small")`
    display: none;
  `}
`

export default function Comments({ slug }) {
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState("")
  const [commentName, setCommentName] = useState("")
  const [sentComment, setSentComment] = useState(false)

  async function GetComments() {
    fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/comments?slug=${slug.replace("/articles", "")}`
    )
      .then((response) => response.json())
      .then((data) => setComments(data))
  }

  useEffect(() => {
    GetComments()
  }, [slug])

  const sendComment = () => {
    const newComment = {
      slug: slug,
      name: commentName,
      text: commentText,
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    }

    fetch("https://cms.mxd.codes/comments", requestOptions)
      .then(function (response) {
        if (!response.ok) {
          console.log(response.statusText)
        } else {
          setSentComment(true)
          setComments([...comments, newComment])
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <CommentWrapper>
      <CommentsWrapper>
        {comments.map((comment) => {
          return (
            <Comment>
              <CommentAuthor>
                <CommentAuthorName>{comment.name}</CommentAuthorName>
                <a
                  href={comment.slug}
                  rel="noopener noreferrer nofollow"
                  title={comment.updated_at}
                >
                  <CommentDate className="dt-published">
                    {comment.updated_at
                      ? `${formatDistance(
                          new Date(comment.updated_at),
                          new Date()
                        )} ago`
                      : null}
                  </CommentDate>
                </a>
              </CommentAuthor>
              {comment.text}
            </Comment>
          )
        })}
      </CommentsWrapper>

      <CommentTitle htmlFor="comment">
        Comment
        <CommentTitleSpan className="required"> *</CommentTitleSpan>
      </CommentTitle>
      <CommentInput
        id="comment"
        name="comment"
        type="text"
        placeholder="Hello there"
        onChange={(e) => setCommentText(e.target.value)}
      />
      <CommentAuthorLabel htmlFor="author">
        Name
        <CommentTitleSpan className="required"> *</CommentTitleSpan>
      </CommentAuthorLabel>
      <CommentAuthorInput
        id="author"
        name="author"
        onChange={(e) => setCommentName(e.target.value)}
      />
      {sentComment ? (
        <div>Comment created!</div>
      ) : (
        <Submit onClick={() => sendComment()}>Post comment</Submit>
      )}
    </CommentWrapper>
  )
}
