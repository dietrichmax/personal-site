import Date from '@/components/date/date'
import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostReactions from "@/components/post/post-reactions/post-reactions"

const Card = styled.div`
  margin: 0 auto var(--space) auto;
  border-radius: 0.75rem;
  transition: 0.2s;
  ${media.lessThan('medium')`
    margin: var(--space);
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
  color: var(--text-color);
  font-size: 1.25em;
  line-height: 46px;
  font-weight: 700;
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border-dark);
  
  :hover {
    color: var(--thirdy-color);    
  }
`;

const CardItemMeta = styled.div`
  display: flex;
  font-size: .6em;
  margin-top: var(--space-sm);
  margin-bottom: var(--space-sm);
  color: var(--text-color);
`;

const CardItemDescription = styled.div`
  margin-top: var(--space-sm);
  margin-bottom: var(--space-sm);
  font-family: var(--secondary-font);
  font-size: 0.75em;
`;

const TagsWrapper = styled.div`
  display: block;
  margin-bottom: var(--space-sm);
`

const TagItem = styled.a`
  display: inline-block;
  text-transform: uppercase;
  transition: 0.2s;
  font-size: .6em;
  border: 1px solid var(--text-color);
  cursor: pointer;
  padding: calc(var(--space-sm)*0.2) var(--space-sm);
  margin: calc(var(--space-sm)*0.5);
  border-radius: var(--space-sm);
  :hover {
    background-color: ${props =>
      props.color ? props.color : '#798ad0'};
    color: white;
  }
`

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
          <CardItemMeta>
            <Date dateString={dateUpdated ? dateUpdated : date} />
            <PostReactions preview postId={id} postSlug={slug}/>
            <ReadingTime><ReadingTimeSymbol className="las la-book-open" /> {readingTime} min read</ReadingTime>
          </CardItemMeta>
          <CardItemDescription>{excerpt}</CardItemDescription>
          <TagsWrapper>
            {tags.map((tag, i) => (
              <Link key={i} href={`/articles/topics/${tag.slug}`} passHref>
                <TagItem color={tag.color} title={tag.name}>{tag.name}</TagItem>
              </Link>
            ))}
          </TagsWrapper>
        </CardItemInfo>
      </CardItemWrapper>
    </Card>
  )
}
