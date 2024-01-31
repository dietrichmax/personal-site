import { useState, useEffect } from "react"
import styled from "styled-components"
import media from "styled-media-query"
import config from "src/data/internal/SiteConfig"
import { formatDistance } from "date-fns"
import { Input } from "@/styles/templates/input"
import {
  FaRegQuestionCircle,
  FaRetweet,
  FaRegComment,
  FaRegStickyNote,
} from "react-icons/fa"
import { BsStar } from "react-icons/bs"
import { Button } from "@/styles/templates/button"
import Link from "next/link"

const WebMentionsWrapper = styled.section`
  margin-top: var(--space);
  border-top: 0.1rem solid var(--content-bg);
  padding: var(--space) 0 0 0;
`

const WebmentionsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: var(--space-sm);
`

const WebmentionsTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`

const WebmentionsInfo = styled.div`
  display: flex;
  align-items: center;
`

const WebmentionsInfoIcon = styled.i`
  margin-right: 0.125rem;
`

const WebmentionsContainer = styled.div`
  list-style: none;
  padding-inline-start: 0;
  margin-bottom: var(--space-sm);
`

const WebmentionComment = styled.li`
  margin-bottom: var(--space-sm);
  background-color: var(--content-bg);
  padding: var(--space-sm);
  border-radius: var(--border-radius);
`

const WebmentionAuthor = styled.div`
  margin-bottom: calc(var(--space-sm) * 0.5);
`

const WebmentionAuthorImgWrapper = styled.a`
  display: inline-block;
  vertical-align: middle;
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin-right: calc(var(--space-sm) * 0.5);
  margin-bottom: calc(var(--space-sm) * 0.5);
  border-radius: var(--border-radius);
  background-color: var(--content-bg);
  :hover {
    display: cursor;
  }
`

const WebmentionAuthorName = styled.span`
  font-weight: 600;
  display: inline-block;
  margin-right: calc(var(--space-sm) * 0.5);
`

const WebmentionDate = styled.time`
  font-size: 14px;
  ${media.lessThan("small")`
    display: none;
  `}
`

const WebmentionContent = styled.p`
  line-height: 1.5;
`

const SendWebmentions = styled.div`
  margin: var(--space-sm) auto;
`

const SendText = styled.p``

const WebmentionInput = styled(Input)`
  padding: 0.5rem 1rem;
  margin: var(--space-sm) auto;
  width: 60%;
  border: 2px solid var(--body-bg);
  background-color: var(--content-bg);
  color: var(--text-color);
  :invalid {
    border: 1px solid red;
  }
`

const WebmentionLike = styled.div`
  display: inline-block;
`

const Status = styled.div`
  font-size: 14px;
  color: ${(props) => (props.color ? props.color : "var(--text-color)")};
`

const WebmentionsPreview = styled.ol`
  display: inline-block;
  padding-inline-start: 0;
  list-style: none;
`

const WebmentionPreviewCount = styled.li`
  display: inline-block;
  margin-right: 0.5rem;
`

const WebmentionPreviewLabel = styled.span`
  display: none;
  ${media.lessThan("medium")`
  display: none;
  `}
`

const WebmentionsList = styled.ol`
  list-style: none;
  padding-inline-start: 0;
`

// Comments

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

export default function Webmentions({ slug, preview }) {
  const [webmentions, setWebmentions] = useState([])
  const [sourceUrl, setSourceUrl] = useState("")
  const [status, setStatus] = useState({})
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [reposts, setReposts] = useState([])
  const [mentions, setMentions] = useState([])
  const [commentText, setCommentText] = useState("")
  const [commentName, setCommentName] = useState("")
  const [sentComment, setSentComment] = useState(false)

  const url = config.siteUrl + slug
  const pageLimit = 1000

  const getWebmentionsForUrl = (webmentions, url) => {
    const commentsProperty = ["mention-of", "in-reply-to"]
    const likesProperty = ["like-of"]
    const repostsProperty = ["repost-of"]
    const mentionsProperty = ["mention-of"]

    const hasRequiredFields = (entry) => {
      const { author, published, content } = entry
      return author.name && published && content
    }
    const sanitize = (entry) => {
      const { content } = entry
      if (content["content-type"] === "text/html") {
        content.value = sanitizeHTML(content.value)
      }
      return entry
    }

    setComments(
      webmentions
        .filter((entry) => entry["wm-target"] === url)
        .filter((entry) => commentsProperty.includes(entry["wm-property"]))
        .filter(hasRequiredFields)
        .map(sanitize)
    )

    setLikes(
      webmentions
        .filter((entry) => entry["wm-target"] === url)
        .filter((entry) => likesProperty.includes(entry["wm-property"]))
    )

    setReposts(
      webmentions
        .filter((entry) => entry["wm-target"] === url)
        .filter((entry) => repostsProperty.includes(entry["wm-property"]))
    )

    setMentions(
      webmentions
        .filter((entry) => entry["wm-target"] === url)
        .filter((entry) => mentionsProperty.includes(entry["wm-property"]))
    )
  }

  const sendWebmention = () => {
    const endpoint = "https://webmention.io/mxd.codes/webmention"
    async function sendData() {
      const res = await fetch(endpoint, {
        method: "post",
        body: `source=${encodeURIComponent(
          sourceUrl
        )}&target=${encodeURIComponent(url)}`,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      })
      const json = await res.json()
      if (json.error) {
        setStatus({
          text: json.error_description,
          color: "red",
        })
      } else {
        setStatus({
          text: json.summary + ". Refresh in a minute to see your Webmention",
          color: "green",
        })
      }
    }
    sendData()
  }

  async function getWebmentions() {
    // get webmentions
    fetch(
      `https://webmention.io/api/mentions.jf2?target=${url}&per-page=${pageLimit}&page=0`
    )
      .then((response) => response.json())
      .then((result) => {
        setWebmentions(getWebmentionsForUrl(result.children, url))
      })
  }

  async function GetComments() {
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/comments?slug=${slug}`)
      .then((response) => response.json())
      .then((result) => {
        let strapiComments = []
        result.map((comment) => {
          strapiComments.push({
            "type": "entry",
            "url": `${url}#1${comment.id}`,
            "published": comment.published_at,
            "author": {
              name: comment.name || "anonym",
              photo: "https://cms.mxd.codes/uploads/mm_1559572612.jpg",
              type: "card",
              url: config.siteUrl,
            },
            "content": {
              text: comment.text,
            },
            "in-reply-to": url,
          })
        })
        const allComments = comments.concat(strapiComments)
        const sortedComments = allComments.sort(function (a, b) {
          return new Date(b.published) - new Date(a.published)
        })
        setComments(sortedComments)
      })
  }

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
      .then((response) => response.json())
      .then((data) => {
        setSentComment(true)
        comments.push({
          "type": "entry",
          "url": `${url}#comment${data.id}`,
          "published": data.published_at,
          "author": {
            name: data.name || "anonym",
            photo: "https://cms.mxd.codes/uploads/mm_1559572612.jpg",
            type: "card",
            url: config.siteUrl,
          },
          "content": {
            text: data.text,
          },
          "in-reply-to": url,
        })
        const sortedComments = comments.sort(function (a, b) {
          return new Date(b.published) - new Date(a.published)
        })
        setComments(sortedComments)
        setCommentName("")
        setCommentText("")
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    getWebmentions()
  }, [url])

  useEffect(() => {
    GetComments()
  }, [webmentions])

  const renderAuthorImg = (mention, i) => {
    return mention && mention.author ? (
      <WebmentionLike key={i}>
        <WebmentionAuthorImgWrapper
          className="u-url"
          href={mention.url ? mention.url : config.siteUrl}
          rel="noopener noreferrer nofollow"
          alt={`Link to profile of ${mention.author.name}`}
          title={mention.author.name}
        >
          <img
            src={
              mention.author.photo
                ? mention.author.photo
                : "https://cms.mxd.codes/uploads/xmm8_553245a18b.jpg"
            }
            height="50"
            width="50"
            className="u-photo"
            alt={`Image of ${mention.author.name}`}
            title={mention.author.name}
          />
        </WebmentionAuthorImgWrapper>
      </WebmentionLike>
    ) : (
      <WebmentionLike>
        <WebmentionAuthorImgWrapper
          className="u-url"
          href={mention.author.url}
          rel="noopener noreferrer nofollow"
          alt={`Link to profile of ${mention.author.name}`}
          title={mention.author.name}
        ></WebmentionAuthorImgWrapper>
      </WebmentionLike>
    )
  }

  return (
    <>
      {preview ? (
        likes.length > 0 ||
        reposts.length > 0 ||
        comments.length > 0 ||
        mentions.length > 0 ? (
          <WebmentionsPreview>
            {likes.length > 0 ? (
              <WebmentionPreviewCount title={`${likes.length} likes`}>
                <BsStar /> {likes.length}{" "}
                <WebmentionPreviewLabel>
                  {likes.length == 1 ? "like" : "likes"}
                </WebmentionPreviewLabel>
              </WebmentionPreviewCount>
            ) : null}
            {reposts.length > 0 ? (
              <WebmentionPreviewCount title={`${reposts.length} reposts`}>
                <FaRetweet /> {reposts.length}{" "}
                <WebmentionPreviewLabel>
                  {reposts.length == 1 ? "repost" : "reposts"}
                </WebmentionPreviewLabel>
              </WebmentionPreviewCount>
            ) : null}
            {comments.length > 0 ? (
              <WebmentionPreviewCount
                title={
                  comments.length == 1
                    ? `${comments.length} reply`
                    : `${comments.length} replies`
                }
              >
                <FaRegComment /> {comments.length}{" "}
                <WebmentionPreviewLabel>
                  {comments.length == 1 ? "reply" : "replies"}
                </WebmentionPreviewLabel>
              </WebmentionPreviewCount>
            ) : null}
            {mentions.length > 0 ? (
              <WebmentionPreviewCount title={`${mentions.length} mentions`}>
                <FaRegStickyNote /> {mentions.length}{" "}
                <WebmentionPreviewLabel>
                  {mentions.length == 1 ? "mention" : "mentions"}
                </WebmentionPreviewLabel>
              </WebmentionPreviewCount>
            ) : null}
          </WebmentionsPreview>
        ) : null
      ) : (
        <WebMentionsWrapper>
          <WebmentionsHeader>
            <WebmentionsTitle>
              {likes.length +
                reposts.length +
                comments.length +
                mentions.length}{" "}
              Webmentions
            </WebmentionsTitle>
            <WebmentionsInfo
              href="/webmention"
              target="_blank"
              rel="noopener noreferrer nofollow"
              title="What's this?"
              onClick={() => {
                !process.env.NODE_ENV === "development"
                  ? window._paq.push([
                      "trackEvent",
                      "WebMentionsInfo",
                      "Click on Info",
                    ])
                  : null
              }}
            >
              <Link href="/webmention" title="What is Webmention?">
                <FaRegQuestionCircle />
              </Link>
              {/* What’s this?*/}
            </WebmentionsInfo>
          </WebmentionsHeader>

          <SendWebmentions>
            <SendText>
              Have you published a response to this? Send me a webmention by
              letting me know the URL.
            </SendText>
            <WebmentionInput
              type="webmention"
              name="webmention"
              id="webmention-input"
              label="webmention-input"
              placeholder="URL / permalink of your response"
              onChange={(e) => setSourceUrl(e.target.value)}
            />
            <Button
              type="button"
              name="webmention"
              id="webmention-button"
              aria-label="Send Webmention"
              onClick={() => sendWebmention()}
              style={{ width: "100%" }}
            >
              Send Webmention
            </Button>
            <Status color={status.color}>{status.text}</Status>
          </SendWebmentions>
          {likes.length > 0 ||
          reposts.length > 0 ||
          comments.length > 0 ||
          mentions.length > 0 ? (
            <>
              {/* Comments */}
              {comments.length > 0 ? (
                <WebmentionsContainer>
                  <WebmentionsTitle
                    style={{
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {comments.length}{" "}
                    {comments.length == 1 ? "Reply" : "Replies"}
                  </WebmentionsTitle>
                  <WebmentionsList>
                    {comments.map((mention, i) => (
                      <WebmentionComment
                        key={i}
                        className="u-comment u-mention h-cite"
                      >
                        <WebmentionAuthor className="h-card p-author">
                          {renderAuthorImg(mention)}
                          <WebmentionAuthorName className="p-name">
                            {mention.author.name}
                          </WebmentionAuthorName>
                          <a
                            href={mention.url}
                            rel="noopener noreferrer nofollow"
                            title={mention.published}
                          >
                            <WebmentionDate className="dt-published">
                              {mention.published
                                ? `${formatDistance(
                                    new Date(mention.published),
                                    new Date()
                                  )} ago`
                                : null}
                            </WebmentionDate>
                          </a>
                        </WebmentionAuthor>
                        <WebmentionContent className="p-content u-comment">
                          {mention.content ? mention.content.text : null}
                        </WebmentionContent>
                      </WebmentionComment>
                    ))}
                  </WebmentionsList>
                </WebmentionsContainer>
              ) : null}
              {/* Likes */}

              {likes.length > 0 ? (
                <WebmentionsContainer>
                  <WebmentionsTitle
                    style={{
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {likes.length} {likes.length == 1 ? "Like" : "Likes"}
                  </WebmentionsTitle>

                  <WebmentionsList>
                    {likes.map((mention, i) => renderAuthorImg(mention, i))}
                  </WebmentionsList>
                </WebmentionsContainer>
              ) : null}
              {/* Reposts*/}
              {reposts.length > 0 ? (
                <WebmentionsContainer>
                  <WebmentionsTitle
                    style={{
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {reposts.length}{" "}
                    {reposts.length == 1 ? "Repost" : "Reposts"}
                  </WebmentionsTitle>
                  <WebmentionsList>
                    {reposts.map((mention, i) => renderAuthorImg(mention, i))}
                  </WebmentionsList>
                </WebmentionsContainer>
              ) : null}
              {/* Mentions*/}
              {mentions.length > 0 ? (
                <WebmentionsContainer>
                  <WebmentionsTitle
                    style={{
                      marginBottom: "var(--space-sm)",
                    }}
                  >
                    {mentions.length}{" "}
                    {mentions.length == 1 ? "Mention" : "Mentions"}
                  </WebmentionsTitle>
                  <WebmentionsList>
                    {mentions.map((mention, i) => renderAuthorImg(mention, i))}
                  </WebmentionsList>
                </WebmentionsContainer>
              ) : null}
            </>
          ) : (
            <WebmentionContent>
              Found no Webmentions yet. Be the first!
            </WebmentionContent>
          )}
          <CommentWrapper>
            <CommentTitle htmlFor="comment">
              Comment
              <CommentTitleSpan className="required"> *</CommentTitleSpan>
            </CommentTitle>
            <CommentInput
              id="comment"
              name="comment"
              type="text"
              placeholder="Hello there"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <CommentAuthorLabel htmlFor="author">
              Name
              <CommentTitleSpan className="required"> *</CommentTitleSpan>
            </CommentAuthorLabel>
            <CommentAuthorInput
              id="author"
              name="author"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
            />
            {sentComment ? (
              <div>Comment created!</div>
            ) : (
              <Submit onClick={() => sendComment()}>Post comment</Submit>
            )}
          </CommentWrapper>
        </WebMentionsWrapper>
      )}
    </>
  )
}
