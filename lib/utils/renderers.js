const renderers = {
    image: image => {
      return <img class="test" src={image.src} alt={image.alt}/>
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