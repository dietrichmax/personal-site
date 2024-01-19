import styled from "styled-components"
import TableOfContents from "src/components/article/article-toc/table-of-contents"
import media from "styled-media-query"
import MDXWrapper from "@/components/mdxWrapper"

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
        <ContentWrapper className="markdown">
          <MDXWrapper content={content} />
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
