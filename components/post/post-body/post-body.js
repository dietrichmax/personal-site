import markdownStyles from './markdown-styles.module.css'
import styled from 'styled-components';
import media from 'styled-media-query';

const PostWrapper = styled.div`
  max-width: 640px;
  margin: auto;
  ${media.lessThan('large')`
    padding-left: 1rem;
    padding-right: 1rem;
  `}
`

const PostContent = styled.div`
`



export default function PostBody({ content }) {
  return (
    <PostWrapper>
      <PostContent
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </PostWrapper>
  )
}
