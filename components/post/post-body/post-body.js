import markdownStyles from './markdown-styles.module.css'
import styled from 'styled-components';

const PostWrapper = styled.div`
  max-width: 640px;
  margin: auto;
`

export default function PostBody({ content }) {
  return (
    <PostWrapper>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </PostWrapper>
  )
}
