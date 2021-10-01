import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostTags from "@/components/tags/tags"
import PreviewImage from "@/components/article/article-image/article-image"
import HCard from "@/components/microformats/h-card"
import PostMeta from '@/components/post/post-meta/post-meta-preview'
import { Card } from "@/styles/templates/card"


const CardItemWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 1rem 0 1rem;
`;

const CardItemInfo = styled.div`
  position: relative;
  ${media.lessThan('medium')`
   margin: 0;
  `}
`;

const CardItemTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  :hover {
    text-decoration: underline;
  }
`;

const CardItemDescription = styled.div`
  line-height: 1.5;
  margin: 0.75rem 0;
  font-size: .875rem;
  font-family: var(--secondary-font);
`;


const TagsWrapper = styled.div`

`


const CardMeta = styled.div`
  padding-bottom: var(--space-sm);
`

const CardReadMoreRead = styled.a`
  display: inline-block;
  color: var(--text-color);
  border-bottom: 1px solid var(--secondary-color);
  cursor: pointer;
  :hover {
    border-bottom: 1px solid transparent;
  }
`

export default function PostPreview({ postData, preview }) {
  
  const { title, excerpt, tags, dateUpdated, date, published_at, updated_at } = postData

  const slug = `/articles/${postData.slug}`

  return (
    <Card className="h-entry">
      <CardItemWrapper>
        { preview ? <PreviewImage postData={postData}/> : null}
        <CardItemInfo>
          <CardItemTitle>
            <Link href={slug} passHref>
              <a className="p-name u-url" rel="bookmark" title={title}>{title}</a>
            </Link>
            <HCard /> 
          </CardItemTitle>
          <CardItemDescription className="p-summary">{excerpt} <Link href={slug} passHref><CardReadMoreRead title={title}>Continue reading...</CardReadMoreRead></Link>
          </CardItemDescription>
        </CardItemInfo>
        <CardMeta>
          <TagsWrapper><PostTags className="p-categories" tags={tags}/></TagsWrapper>
        </CardMeta>
      </CardItemWrapper>
      <PostMeta post={postData} slug={slug}/>
    </Card>
  )
}
