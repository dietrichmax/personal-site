import styled from "styled-components"
import Link from "next/link"

const TagsWrapper = styled.div`
  display: block;
  padding-bottom: var(--space-sm);
`

const TagItem = styled.a`
  border-radius: var(--border-radius);
  display: inline-block;
  font-size: 0.75rem;
  margin: 0.25rem 1rem 0.5rem 0;
  padding: 3px calc(var(--space-sm) * 0.5);
  font-family: var(--secondary-font);
  background-color: var(--content-bg);
  color: var(--text-color);
  border: 1px solid var(--body-bg);
  :hover {
    color: var(--text-color);
    background-color: var(--body-bg);
  }
`

interface PostTags {
  tags: [
    {
      slug: string
      color: string
      name: string
    },
  ]
}
export default function PostTags({ tags }: PostTags) {
  const postTags = tags
  return (
    <TagsWrapper>
      {postTags.map((tag, i) => (
        <Link key={i} href={`/topics/${tag.slug}`} passHref legacyBehavior>
          <TagItem
            rel="tag"
            className="p-category"
            color={tag.color}
            title={tag.name}
          >
            {tag.name}
          </TagItem>
        </Link>
      ))}
    </TagsWrapper>
  )
}
