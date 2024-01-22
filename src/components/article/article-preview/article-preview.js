import Link from "next/link"
import dynamic from "next/dynamic"
import styled from "styled-components"
import media from "styled-media-query"
import PreviewImage from "src/components/article/article-image/article-image"
import HCard from "src/components/microformats/h-card"
import { Card } from "@/styles/templates/card"
import Webmentions from "src/components/social/webmentions/webmentions"

const CardItemWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--space-sm) var(--space);
`

const CardItemInfo = styled.div`
  position: relative;
  padding-bottom: var(--space-sm);
  ${media.lessThan("medium")`
   margin: 0;
  `}
`

const CardItemTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: var(--space-sm);
  :hover {
    text-decoration: underline;
  }
`

const CardItemDescription = styled.div`
  line-height: 1.5;
  margin: 0.75rem 0 1.5rem 0;
  font-size: 0.875rem;
  font-family: var(--secondary-font);
`

const CardMeta = styled.div`
  padding-bottom: var(--space-sm);
`

const CardReadMoreRead = styled.p`
  display: inline-block;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius);
  color: #fff;
  background: var(--secondary-color);
  font-family: var(--primary-font);
  :hover {
    color: var(--text-color);
  }
`

const Socials = styled.div`
  font-size: 0.75rem;
`

const DynamicPostMeta = dynamic(
  () => import("src/components/post/post-meta/post-meta-preview"),
  {
    loading: () => <p>Loading...</p>,
  }
)

export default function PostPreview({ postData, preview }) {
  const { title, excerpt, tags, dateUpdated, date, published_at, updated_at } =
    postData

  const slug = `/articles/${postData.slug}`

  return (
    <Card className="h-entry">
      <CardItemWrapper>
        {preview ? <PreviewImage postData={postData} /> : null}
        <CardItemInfo>
          <CardItemTitle>
            <Link
              href={slug}
              passHref
              className="p-name u-url"
              rel="bookmark"
              title={title}
            >
              {title}
            </Link>
            <HCard />
          </CardItemTitle>
          <Socials>
            <Webmentions slug={slug} preview />
          </Socials>
          <CardItemDescription className="p-summary">
            {excerpt}{" "}
          </CardItemDescription>
          <Link href={slug} passHref legacyBehavior>
            <CardReadMoreRead title={title}>
              Continue reading...
            </CardReadMoreRead>
          </Link>
        </CardItemInfo>
        <CardMeta>
          {/*<TagsWrapper>
            <PostTags className="p-categories" tags={tags} backgroundColor="red"/>
          </TagsWrapper>*/}
        </CardMeta>
        <DynamicPostMeta post={postData} slug={slug} />
      </CardItemWrapper>
    </Card>
  )
}
