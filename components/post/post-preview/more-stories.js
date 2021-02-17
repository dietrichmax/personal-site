import PostPreview from './post-preview'
import styled from 'styled-components';
import media from 'styled-media-query';
import getReadTime from "@/lib/utils/read-time"

const ListWrapper = styled.div`
  max-width: 1200px;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(49%, 1fr));
  padding-left: var(--space);
  padding-right: var(--space);
  ${media.lessThan('medium')`
    padding-left: 0;
    display: block;
`}
`;


const Arrow = styled.div``

export default function MoreStories({ posts}) {
  return (
    <section>
      <ListWrapper>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            id={post.id}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            dateUpdated={post.dateUpdated}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
            readingTime={getReadTime(post.content)}
          />
        ))}
      </ListWrapper>
    </section>
  )
}
