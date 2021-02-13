import PostPreview from './post-preview'
import styled from 'styled-components';
import media from 'styled-media-query';
import Link from "next/link";
import { parseISO, format } from 'date-fns'

const RelatedPostsWrapper = styled.section`    
  margin-top: var(--space);
  margin-bottom: var(--space);
`



const MorePostsTitle = styled.p`
  letter-spacing: 3px;
  font-size: 1.5rem;
  color: var(--gray);
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
`

const ArticlesList = styled.ol`
  padding: 0;
  margin: 0;
  list-style-type: none;
`
const ArticlesItem = styled.li`
  margin: var(--space-sm) 0;
  display: flex;
  :hover {
      color: var(--link-color-hover);
  }
  ${media.lessThan('medium')`
    display: block;
`}
`

const ArticleDate = styled.span`
    font-weight: 200;
    color: var(--gray);
    margin-right: var(--space);
    width: 9rem;
    ${media.lessThan('medium')`
        display: block;
        order: +1;
        font-size: 0.9em;
    `}
`
const ArticleTitle = styled.a`
    font-size: 1.5rem;
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
                <ArticlesItem>
                        <ArticleDate>{format(parseISO(post.dateUpdated ? post.dateUpdated : post.date), "dd-MM-yyyy")}</ArticleDate>
                        <Link href={post.slug} passHref>
                          <ArticleTitle title={post.title}>{post.title}</ArticleTitle>  
                        </Link>
                </ArticlesItem>
            ))}
      </ArticlesList>
    </RelatedPostsWrapper>
  )
}
