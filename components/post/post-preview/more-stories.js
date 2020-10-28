import PostPreview from './post-preview'
import styled from 'styled-components';
import media from 'styled-media-query';

const ListWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  ${media.lessThan('medium')`
    margin: var(--space-lg) var(--space);
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
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        ))}
      </ListWrapper>
    </section>
  )
}
