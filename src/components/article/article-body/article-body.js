import markdownStyles from "@/styles/markdown-styles.module.css"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"
import renderers from "src/utils/renderers"
import TableOfContents from "src/components/article/article-toc/table-of-contents"
import media from "styled-media-query"

const PostContent = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: var(--space-sm);
  margin: var(--space-sm) 0;
  ${media.lessThan("medium")`  
    display: flex;
    flex-direction: column-reverse;
  `}
`

const EndOfPost = styled.div`
  display: flex;
`

const Square = styled.span`
  display: block;
  content: "";
  margin-right: var(--space-sm);
  width: 10px;
  height: 10px;
  background-color: var(--secondary-color);
`

const ContentWrapper = styled.div`
  position: relative;
  grid-column: span 6 / span 6;
`

const Sidebar = styled.div`
  grid-column: span 2 / span 2;
`

//const test = require("~static/docs/markdown.md");
export default function PostBody({ content, toc }) {
  return (
    <>
      <PostContent>
        <ContentWrapper className="e-content">
          <ReactMarkdown
            className={markdownStyles["markdown"]}
            children={content}
            components={renderers}
            style={{ width: "100%", height: "100%", position: "relative" }}
          />
        </ContentWrapper>
        {toc && toc.length > 0 ? (
          <Sidebar>
            <TableOfContents toc={toc} />
          </Sidebar>
        ) : null}
      </PostContent>
      <EndOfPost>
        <Square title="🦄" />
        <Square title="😄" />
      </EndOfPost>
    </>
  )
}
