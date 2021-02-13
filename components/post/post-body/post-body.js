import markdownStyles from './markdown-styles.module.css'
import styled from 'styled-components';
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import Link from "next/Link"


const PostContent = styled.section`
  padding-bottom: var(--space);
  border-bottom: 1px solid var(--secondary-color);
`

const renderers = {
  /*image: image => {
    return <Image src={image.src} alt={image.alt} height={image.width} width={image.height} quality="90" />
  },*/
  link: link => {
    return ( 
      link.href.startsWith("/") ?
      <Link href={link.href} passHref> 
        <a alt={link.alt} title={link.title}>{link.children}</a>
      </Link> :
      <a alt={link.alt} title={link.title}>{link.children}</a>
    )
  },
}

export default function PostBody({ content }) {

  return (
    <PostContent>
      <ReactMarkdown
        className={markdownStyles['markdown']}
        children={content}
        renderers={renderers}
      />
    </PostContent>
  )
}
