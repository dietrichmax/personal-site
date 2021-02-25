import PostPreview from './post-preview'
import styled from 'styled-components';
import media from 'styled-media-query';
import getReadTime from "@/lib/utils/read-time"

const ListWrapper = styled.div`
  max-width: 1200px;
  padding-left: var(--space);
  padding-right: var(--space);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
  display: grid;
  ${media.lessThan('medium')`
    padding: 0;
    display: block;
`}
`;


const Arrow = styled.div``

export default function MoreStories({ posts}) {

  return (
    <section>
      <ListWrapper className="h-feed">
        {posts.map((post) => (
          <PostPreview
            postData={post}
          />
        ))}
      </ListWrapper>
    </section>
  )
}
