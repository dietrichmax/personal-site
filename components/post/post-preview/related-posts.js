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
  letter-spacing: 3px;
  font-size: 0.6em;
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
  padding-inline-start: 0;
  :hover {
      color: var(--link-color-hover);
  }
  ${media.lessThan('medium')`
    display: block;
`}
`

const ArticleDate = styled.span`
    font-size: 0.6em;
    margin-right: var(--space);
    min-width: 6rem;
    ${media.lessThan('medium')`
        display: block;
        font-size: .5em;
        order: +1;
    `}
`
const ArticleTitle = styled.a`
  font-size: 0.7em;
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
