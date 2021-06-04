import markdownStyles from '@/styles/markdown-styles.module.css'
import styled from 'styled-components';
import ReactMarkdown from "react-markdown"
import renderers from "@/lib/utils/renderers"
import TableOfContents from "@/components/article/article-toc/table-of-contents"
import media from 'styled-media-query';
import Link from "next/link"
        
const PostContent = styled.section`
  grid-template-columns: repeat(8,minmax(0,1fr));
  gap: var(--space-sm);
  display: grid;
  margin: var(--space-sm) 0;
  ${media.lessThan('large')`
    display: block;
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
  background-color: #191f45;
  background-color: var(--primary-color);
`

const ContentWrapper = styled.div`
  grid-column: span 6/span 6;
`

const Sidebar = styled.div`
  grid-column: span 2/span 2;

`

export default function PostBody({ content }) {

  return (
    <>
      <PostContent>
        <ContentWrapper>
          <ReactMarkdown
            className={markdownStyles['markdown']}
            children={content}
            renderers={renderers}
          />
        </ContentWrapper>
        <Sidebar>
           <script src="https://cdn.purpleads.io/agent.js?publisherId=070fe3f7e022b7e286f5e80d6a9f7c82:809fd75a0cc95c1d02c5f0fa8b4382c6f8fb9187e1c4523bd06e4a81aee94e13fdfdf1812ef0cad0920e4935b15e21470403c8b90ead36efcd9594f02045bc1c" data-pa-tag async></script>
           {/*<TableOfContents content={content} />*/}
        </Sidebar>
      </PostContent>
      <EndOfPost><Square title="🦄"/><Square title="😄"/></EndOfPost>
    </>
  )
}
