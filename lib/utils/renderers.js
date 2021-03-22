import Image from "next/image"
import Link from "next/link"

const renderers={
  image: ({ src, alt, title }) => {
    return (
      src.startsWith("/") ?
      <a 
        href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`} 
        title={title} 
      >
      
        <img
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`} 
          alt={alt} 
          title={title} 
          href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`} 
          className="got you"
        />
      </a>
      :
      <a 
        href={src} 
        title={title} 
      >
      
        <img
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`} 
          alt={alt} 
          title={title} 
          href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`} 
        />
      </a>
    )
  },
  link: ({ children, href, title, alt }) => {
    return (
      href.startsWith("/") ?
      <Link className="external-link" href={href}><a title={title} alt={alt} >{children}</a></Link> :
      <a className="internal-link" href={href} title={title} alt={alt} >{children}</a>
    ) 
  },
}
  
export default renderers
