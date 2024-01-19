import styled from "styled-components"
import renderers from "src/utils/renderers"
import { MDXRemote } from "next-mdx-remote"

const ContentWrapper = styled.div`
  font-family: var(--secondary-font);
  max-width: var(--content-width);
  line-height: 1.65;
  hyphens: auto;
  padding-bottom: var(--space-sm);
`

export default function MDXWrapper({ content }) {
  return (
    <ContentWrapper className="markdown">
      <MDXRemote
        {...content}
        components={renderers}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      />
    </ContentWrapper>
  )
}
