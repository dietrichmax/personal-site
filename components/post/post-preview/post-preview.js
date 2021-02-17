import Date from '@/lib/utils/date/date'
import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import Webmentions from "@/components/social/webmentions/webmentions"
import PostTags from "@/components/tags/tags"
import PostBody from "@/components/post/post-body/post-body"
import CoverImage from "@/components/post/post-image/cover-image"

const Card = styled.div`
  transition: 0.2s;
  margin-bottom: var(--space-lg);
  ${media.lessThan('medium')`
    margin: 0 auto var(--space) var(--space-sm);
  `}
`

const CardItemWrapper = styled.section`
  height: 100%;
`;

const CardItemImg = styled.div`
`;

const CardItemInfo = styled.div`
  position: relative;
  padding: 0 var(--space);
  ${media.lessThan('medium')`
   padding: 0;
  `}
`;

const CardItemTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  :hover {
    color: var(--thirdy-color);    
  }
`;

const CardItemMeta = styled.div`
  display: flex;
  font-size: .875rem;
`;

const CardItemDescription = styled.div`
  font-family: var(--secondary-font);
  font-size: 1rem;
  line-height: 1.75rem;
  margin: 0.75rem 0;
`;


const ReadingTime = styled.span`
  margin-left: var(--space-sm);
`

const ReadingTimeSymbol = styled.i`
`

export default function PostPreview({
  id,
  title,
  coverImage,
  date,
  dateUpdated,
  excerpt,
  author,
  slug,
  tags,
  readingTime
}) {

  //const backgroundImage = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.coverImage.formats.small.url}`
  
  return (
    <Card>
      <CardItemWrapper>
        <CardItemImg>
          {/*{coverImage.coverImage ? (
          <CoverImage slug={slug} title={title} caption={coverImage.caption} url={coverImage.coverImage.formats.medium.url}/>
          ) : null
          }*/}
        </CardItemImg>
        <CardItemInfo>
          <CardItemTitle>
            <Link as={`/articles/${slug}`} href="/articles/[slug]" passHref>
              <a title={title}>{title}</a>
            </Link>
          </CardItemTitle>
          <CardItemDescription>{excerpt}</CardItemDescription>
          <CardItemMeta>
            <Date dateString={dateUpdated ? dateUpdated : date} />
            <Webmentions preview slug={`/articles/${slug}`}/>
            <ReadingTime><ReadingTimeSymbol className="las la-book-open" /> {readingTime} min read</ReadingTime>
          </CardItemMeta>
          <PostTags tags={tags}/>
        </CardItemInfo>
      </CardItemWrapper>
    </Card>
  )
}
