import markdownStyles from './markdown-styles.module.css'
import styled from 'styled-components';

const PostContent = styled.div`
  padding-bottom: calc(var(--space-lg)*1.5);
  border-bottom: 1px solid var(--secondary-color);
`



export default function PostBody({ content }) {

  return (
      <PostContent
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
  )
}
