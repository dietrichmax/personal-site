import { useState, useEffect } from "react"
import PostPreview from "@/src/components/article/article-preview/article-preview"
import styled from "styled-components"
import media from "styled-media-query"
import * as qs from "qs"
import { fetchGET } from "@/src/utils/fetcher"

const RecommendedPostsContainer = styled.ol`
  margin-bottom: var(--space);
  grid-column: span 2;
  display: grid;
  grid-gap: var(--space);
  grid-template-columns: auto auto auto;
  margin-left: var(--space);
  margin-right: var(--space);
  padding-inline-start: 0;
  ${media.lessThan("large")`
    grid-template-columns: repeat(2, minmax(auto, 1fr));
    grid-gap: var(--space-sm);
  `}
  ${media.lessThan("medium")`
    grid-template-columns: repeat(1, minmax(auto, 1fr));
    margin-left: var(--space-sm);
    margin-right: var(--space-sm);
  `}
`

const RecommendedPostTitle = styled.h3`
  margin-top: var(--space);
  margin-left: var(--space);
  padding-left: var(--space-sm);
  margin-bottom: var(--space-sm);
  grid-column: span 3;
  font-size: 1.5rem;
  font-weight: 600;
  ${media.lessThan("large")`
    margin-left: var(--space);
  `}
  ${media.lessThan("medium")`
    margin-left: var(--space-sm);
  `}
`

export default function RecommendedPosts({ post }) {
  const [sortedPosts, setSortedPosts] = useState([])

  // define maxPosts to display
  const maxPosts = 3

  function getRecommendedPosts(post, allPosts) {
    // filter out current post
    let posts = allPosts.filter(
      (aPost) => aPost.attributes.slug !== post.attributes.slug
    )

    // get tags of current posts
    const currentTags = post.attributes.tags.map((tag) => {
      return tag.attributes.name
    })

    // rate posts depending on tags
    posts.forEach((post) => {
      post.relevance = 0
      post.attributes.tags.data.forEach((tag) => {
        if (currentTags.includes(tag.attributes.name)) {
          post.relevance++
        }
      })
    })

    // sort posts by relevance
    const sortedPosts = posts.sort(function (a, b) {
      return b.relevance - a.relevance
    })
    return sortedPosts
  }

  useEffect(() => {
    const postQuery = qs.stringify({
      populate: {
        tags: "*",
      },
      fields: ["title", "slug", "description", "updatedAt"],
    })
    const getRelatedPosts = async () => {
      const posts = await fetchGET(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/posts?${postQuery}`
      )
      return posts.data
    }
    getRelatedPosts().then((data) =>
      setSortedPosts(getRecommendedPosts(post, data))
    )
  }, [])

  if (sortedPosts) {
    return (
      <>
        <RecommendedPostTitle>Continue Reading</RecommendedPostTitle>
        <RecommendedPostsContainer>
          {sortedPosts.slice(0, maxPosts).map((post, i) => (
            <PostPreview key={i} postData={post.attributes} />
          ))}
        </RecommendedPostsContainer>
      </>
    )
  } else
    return (
      <>
        <RecommendedPostTitle>
          Loading Recommended Posts...
        </RecommendedPostTitle>
      </>
    )
}
