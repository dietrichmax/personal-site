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
  
export default renderers
