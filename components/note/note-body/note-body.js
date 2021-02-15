import markdownStyles from '@/components/post/post-body/markdown-styles.module.css'
import styled from 'styled-components';
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import Link from "next/link"


const NoteContent = styled.section`
  position: relative;
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
      <a href={link.href} alt={link.alt} title={link.title}>{link.children}</a>
    )
  },
}

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
