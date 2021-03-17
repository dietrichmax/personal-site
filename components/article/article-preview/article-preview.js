import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostTags from "@/components/tags/tags"
import { parseISO, format } from 'date-fns'
import config from "@/lib/data/SiteConfig";
import Date from '@/components/date/date'
import PreviewImage from "@/components/article/article-image/article-image"
import HCard from "@/components/microformats/h-card"
import PostMeta from '@/components/post/post-meta/post-meta'

const Card = styled.li`
  position: relative;
  transition: 0.2s;
  box-shadow: 0 2px 2px rgba(0,0,0,.09);
  background-color: var(--content-bg);
  border-radius: var(--border-radius);
`

const CardItemWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardItemInfo = styled.div`
  position: relative;
  padding: 0 var(--space-sm) var(--space-sm) var(--space-sm);
  ${media.lessThan('medium')`
   margin: 0;
  `}
`;

const CardItemTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  margin-top: 0.75rem;
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
  padding-left: var(--space-sm);
  padding-right: var(--space-sm);
`

const CardReadMoreRead = styled.a`
  color: var(--text-color);
  display: inline-block;
  border-bottom: 1px solid var(--post-color);
  cursor: pointer;
  :hover {
    color: var(--post-color-hover);
  }
`

const NotesDate = styled.p`
  font-family: var(--secondary-font);
  margin-bottom: 0;
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
  font-size: 12px;
  width: 100%;
  padding: 0.125rem 0.5rem;
  background-color: var(--gray-light);
  mix-blend-mode: luminosity;
  ${media.lessThan('medium')`

  `}
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
          <CardItemDescription className="p-summary">{excerpt} <Link href={slug} passHref><CardReadMoreRead>Continue reading...</CardReadMoreRead></Link>
          </CardItemDescription>
        </CardItemInfo>
        <CardMeta>
          <TagsWrapper><PostTags tags={tags}/></TagsWrapper>
        </CardMeta>
      </CardItemWrapper>
      <PostMeta post={postData} slug={slug}/>
    </Card>
  )
}
