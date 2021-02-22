import markdownStyles from '@/styles/markdown-styles.module.css'
import styled from 'styled-components';
import ReactMarkdown from "react-markdown"
//import renderers from "@/lib/utils/renderers"
import Image from "next/image"
import Link from "next/link"

const renderers = {
  image: image => {
    return <Image class="test" src={image.src} alt={image.alt} layout="responsive"/>
  },
  link: link => {
    return ( 
      link.href.startsWith("/") ?
      <Link href={link.href} passHref> 
        <a alt={link.alt} title={link.title}>{link.children}</a>
      </Link> :
      <a href={link.href} alt={link.alt} title={link.title}>{link.children}</a>
    )
  },
}
        
const PostContent = styled.section`
  margin: var(--space) 0;
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
    <EndOfPost><Square title="🦄"/><Square title="😄"/></EndOfPost>
    </PostContent>
  )
}
