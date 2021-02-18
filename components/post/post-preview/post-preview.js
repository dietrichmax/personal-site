import Link from 'next/link'
import styled from 'styled-components';
import media from "styled-media-query"
import PostTags from "@/components/tags/tags"
import PostMeta from "@/components/post/post-meta/post-meta"

const Card = styled.div`
  transition: 0.2s;
  margin-bottom: var(--space);
  padding-bottom: var(--space);
  border-bottom: 1px dashed var(--gray-extra-light);
  ${media.lessThan('medium')`
    margin: 0 var(--space-sm) var(--space) var(--space-sm);
  `}
`

const CardItemWrapper = styled.section`
  height: 100%;
`;

const CardItemImg = styled.div`
`;

const CardItemInfo = styled.div`
  position: relative;
  ${media.lessThan('medium')`
   margin: 0;
  `}
`;

const CardItemTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

const CardItemDescription = styled.div`
  font-size: 1.125rem;
  line-height: 1.75rem;
  margin: 0.75rem 0;
`;


export default function PostPreview({ postData }) {
  
  const { title, excerpt, slug, tags } = postData

  
  return (
    <Card>
      <CardItemWrapper>
        <CardItemImg>
        </CardItemImg>
        <CardItemInfo>
          <CardItemTitle>
            <Link as={`/articles/${slug}`} href="/articles/[slug]" passHref>
              <a title={title}>{title}</a>
            </Link>
          </CardItemTitle>
          <CardItemDescription>{excerpt}</CardItemDescription>
          <PostMeta postMetaData={postData} />
          <PostTags tags={tags}/>
        </CardItemInfo>
      </CardItemWrapper>
    </Card>
  )
}
