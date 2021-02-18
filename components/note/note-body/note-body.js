import markdownStyles from '@/styles/markdown-styles.module.css'
import styled from 'styled-components';
import ReactMarkdown from "react-markdown"
import renderers from "@/lib/utils/renderers"

const NoteContent = styled.section`
  position: relative;
`


export default function NoteBody({ content }) {

  return (
    <NoteContent>
      <ReactMarkdown
        className={markdownStyles['markdown']}
        children={content}
        renderers={renderers}
      />
    </NoteContent>
  )
}
