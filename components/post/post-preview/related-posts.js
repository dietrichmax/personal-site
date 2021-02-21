import PostPreview from './post-preview'
import styled from 'styled-components';
import media from 'styled-media-query';
import Link from "next/link";
import { parseISO, format } from 'date-fns'

const RelatedPostsWrapper = styled.section`    
  margin-top: var(--space);
  margin-bottom: var(--space);
  max-width: 800px;
`

const MorePostsTitle = styled.p`
  margin-bottom: var(--space-sm);
  font-size: 1.25rem;
  font-weight: 600;
`

const ArticlesList = styled.ol`
  padding: 0;
  margin: 0;
  list-style-type: none;
`
const ArticlesItem = styled.li`
  margin: var(--space-sm) 0;
  display: flex;
  padding-inline-start: 0;
  font-family: var(--secondary-font);
  :hover {
      color: var(--link-color-hover);
  }
  ${media.lessThan('medium')`
    display: block;
`}
`

const ArticleDate = styled.span`
    font-size: 1rem;
    margin-right: var(--space);
    color: var(--gray);
    font-weight: 200;
    min-width: 6rem;
    ${media.lessThan('medium')`
        display: block;
        font-size: .75em;
        order: +1;
    `}
`
const ArticleTitle = styled.a`
  font-size: 1rem;
  margin-right: var(--space);
  ${media.lessThan('medium')`
      display: block;
  `}
`

export default function RelatedPosts({ relatedPosts }) {

  return (
    <RelatedPostsWrapper>
        
        <MorePostsTitle>
            <Link href="/articles" title="More Articles">Other things I've written:</Link>
        </MorePostsTitle>
        <ArticlesList>
            {relatedPosts.map((post) => (
                <ArticlesItem className="h-entry">
                        <ArticleDate className="dt-published">{format(parseISO(post.dateUpdated ? post.dateUpdated : post.date), "dd-MM-yyyy")}</ArticleDate>
                        <Link className="u-url" href={post.slug} passHref>
                          <ArticleTitle className="p-name" title={post.title}>{post.title}</ArticleTitle>  
                        </Link>
                </ArticlesItem>
            ))}
      </ArticlesList>
    </RelatedPostsWrapper>
  )
}
