import markdownStyles from "@/styles/markdown-styles.module.css"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import renderers from "src/utils/renderers"

const NoteContent = styled.div`
  position: relative;
  max-width: var(--content-width);
`

export default function NoteBody({ content }) {
  return (
    <NoteContent>
      <ReactMarkdown
        className={markdownStyles["markdown"]}
        children={content}
        components={renderers}
      />
    </NoteContent>
  )
}
