import markdownStyles from '@/styles/markdown-styles.module.css'
import styled from 'styled-components';
import ReactMarkdown from "react-markdown"
import renderers from "@/lib/utils/renderers"

const NoteContent = styled.div`
  position: relative;
  max-width: var(--content-width);
  padding: var(--space-sm);
`


export default function NoteBody({ content }) {

  return (
    <NoteContent>
      <ReactMarkdown
        className={markdownStyles['markdown']}
        children={content}
        renderers={renderers}
        style={{paddingBottom:'var(--space-sm)'}}
      />
    </NoteContent>
  )
}
