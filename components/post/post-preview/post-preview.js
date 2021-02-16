import Date from '@/lib/utils/date/date'
import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostReactions from "@/components/post/post-reactions/post-reactions"
import PostTags from "@/components/post/post-tags/post-tags"
import PostBody from "@/components/post/post-body/post-body"

const Card = styled.div`
  margin: 0 auto var(--space) auto;
  border-radius: 0.75rem;
  transition: 0.2s;
  ${media.lessThan('medium')`
    margin: var(--space-sm);
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
  font-size: 1.25rem;
  :hover {
    color: var(--thirdy-color);    
  }
`;

const CardItemMeta = styled.div`
  display: flex;
  font-size: 14px;
  margin: calc(var(--space-sm)*0.5) 0;
  font-family: var(--secondary-font);
`;

const CardItemDescription = styled.div`
  font-family: var(--secondary-font);
  font-size: 1rem;
  margin: calc(var(--space-sm)*0.5) 0;
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
        {/*<CardItemImg>
          {coverImage.coverImage ? (
          <CoverImage slug={slug} title={title} caption={coverImage.caption} url={coverImage.coverImage.url}/>
          ) : null
          }
        </CardItemImg>*/}
        <CardItemInfo>
          <CardItemTitle>
            <Link as={`/articles/${slug}`} href="/articles/[slug]" passHref>
              <a title={title}>{title}</a>
            </Link>
          </CardItemTitle>
          <CardItemDescription>{excerpt}</CardItemDescription>
          <CardItemMeta>
            <Date dateString={dateUpdated ? dateUpdated : date} />
            <PostReactions preview postId={id} postSlug={slug}/>
            <ReadingTime><ReadingTimeSymbol className="las la-book-open" /> {readingTime} min read</ReadingTime>
          </CardItemMeta>
          <PostTags tags={tags}/>
        </CardItemInfo>
      </CardItemWrapper>
    </Card>
  )
}
