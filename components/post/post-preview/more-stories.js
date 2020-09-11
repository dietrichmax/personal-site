import PostPreview from './post-preview'
import styled from 'styled-components';
import media from 'styled-media-query';

const ListWrapper = styled.div`
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--space);
  padding-left: var(--space);
  ${media.greaterThan('small')`
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  `}
  ${media.greaterThan('medium')`
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  `}
`;


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
