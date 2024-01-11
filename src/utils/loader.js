import Image from "next/image"
import React, { useCallback, useState } from "react"

const imgProxyLoader = ({ src, width, quality }) => {
  const options =
    `/size:${width}:::` +
    (quality ? `/quality:${quality}` : "") +
    `/plain/${src}`
  const result = process.env.NEXT_PUBLIC_IMGPROXY_URL + "/insecure" + options

  return result
}
const ImageWithFallback = ({ src, alt, fallbackSrc, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFallbackSrc = useCallback(() => setImgSrc(fallbackSrc), [])

  return (
    <Image
      {...rest}
      loader={imgSrc === fallbackSrc ? undefined : imgProxyLoader}
      src={imgSrc}
      alt={alt}
      onError={handleFallbackSrc}
    />
  )
}
