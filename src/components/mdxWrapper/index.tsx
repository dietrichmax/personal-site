import styled from "styled-components"
import renderers from "@/src/utils/renderers"
import { MDXRemote } from "next-mdx-remote"

const ContentWrapper = styled.div`
  font-family: var(--secondary-font);
  max-width: var(--content-width);
  line-height: 1.65;
  hyphens: auto;
  padding-bottom: var(--space-sm);
`

interface MDXWrapper {
  content: any
}

export default function MDXWrapper({ content }: MDXWrapper) {
  return (
    <ContentWrapper className="markdown">
      <MDXRemote
        {...content}
        components={renderers}
        className="e-content"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      />
    </ContentWrapper>
  )
}
