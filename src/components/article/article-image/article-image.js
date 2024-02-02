import { useEffect, useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import media from "styled-media-query"

const CardItemImg = styled(Image)`
  cursor: pointer;
  width: ${(props) => (props.width ? `${props.width}px` : "350px")} !important;
  height: ${(props) =>
    props.height ? `${props.height}px` : "130px"} !important;
  object-fit: cover;
  border-top-right-radius: var(--border-radius);
  border-top-left-radius: var(--border-radius);
  ${media.lessThan("large")`
    height: ${(props) =>
      props.height ? `${props.height}px` : "200px"} !important;
    object-fit: cover;
  `}
`

const PostImg = styled(Image)`
  position: relative;
  object-fit: cover;
  width: 1300px;
  height: 450px;
  cursor: pointer;
  border-radius: var(--border-radius);
  ${media.lessThan("large")`
    height: 250px;
    width: 100%;
    object-fit: cover;
  `}
`

export default function PostImage({ preview, postData }) {
  const { title, coverImage } = postData
  const [windowSize, setWindowSize] = useState({
    width: 1300,
    height: undefined,
  })

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      const width = window.innerWidth >= 1300 ? 1300 : window.innerWidth
      setWindowSize({
        width: width,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener("resize", handleResize)

    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      {" "}
      {preview ? (
        coverImage ? (
          <CardItemImg
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage.url}`}
            alt={title}
            title={title}
            width={350}
            height={130}
            className="u-photo"
            priority
          />
        ) : null
      ) : coverImage ? (
        <PostImg
        src={`${coverImage.url}`}
          alt={title}
          title={title}
          className="u-photo"
          width={windowSize.width}
          height={450}
          priority
        />
      ) : null}
    </>
  )
}
