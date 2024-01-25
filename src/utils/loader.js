const createHmac = require("create-hmac")

export default function imgproxyLoader({
  src,
  width,
  height,
  quality,
  processOption,
}) {
  const KEY = process.env.NEXT_PUBLIC_IMGPROXY_KEY
  const SALT = process.env.NEXT_PUBLIC_IMGPROXY_SALT

  const urlSafeBase64 = (str) => {
    return Buffer.from(str)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
  }

  const hexDecode = (hex) => Buffer.from(hex, "hex")

  const sign = (salt, target, secret) => {
    const hmac = createHmac("sha256", hexDecode(secret))
    hmac.update(hexDecode(salt))
    hmac.update(target)
    return urlSafeBase64(hmac.digest())
  }

  src = src.startsWith("http")
    ? src
    : process.env.NEXT_PUBLIC_STRAPI_API_URL +
      src.replace(process.env.NEXT_PUBLIC_STRAPI_API_URL, "")

  const path =
    `/size:${width ? width : 0}:${height ? height : 450}` +
    `/resizing_type:auto` +
    (quality ? `/quality:${quality}` : "") +
    `/sharpen:0.5` +
    `/plain/${src}@webp`

  const host = process.env.NEXT_PUBLIC_IMGPROXY_URL
  const signature = sign(SALT, path, KEY)
  const imgUrl = `${host}/${signature}${path}`

  return imgUrl
}
