import markdownStyles from '@/styles/markdown-styles.module.css'
import styled from 'styled-components';
import ReactMarkdown from "react-markdown"
import renderers from "@/lib/utils/renderers"

const PostContent = styled.section`
  margin: var(--space-sm) 0;
`

export default function PostBody({ content }) {

  return (
    <PostContent>
      <ReactMarkdown
        className={markdownStyles['markdown']}
        children={content}
        renderers={{
          renderers,
        }}
      />
    </PostContent>
  )
}
