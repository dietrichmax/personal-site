//import { createHmac } from 'crypto';
const createHmac = require("create-hmac")

export default function imgproxyLoader({ src, width, height, quality, blur }) {
  const KEY = process.env.NEXT_PUBLIC_IMGPROXY_KEY
  const SALT = process.env.NEXT_PUBLIC_IMGPROXY_SALT

  const sharpen = "0.5"
  const format = "webp"

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

  const url = process.env.NEXT_PUBLIC_STRAPI_API_URL + src.replace(process.env.NEXT_PUBLIC_STRAPI_API_URL, "")
  //const encodedURL = urlSafeBase64(url);
  
  const path =
    `/size:${width ? width : 0}:${height ? height : 0}` +
    `/resizing_type:fill` +
    (quality ? `/quality:${quality}` : "") +
    `/sharpen:${sharpen}]` +
    `/plain/${url}` +
    `@${format}`

  const host = process.env.NEXT_PUBLIC_IMGPROXY_URL
  const signature = sign(SALT, path, KEY)

  const imgUrl = `${host}/${signature}${path}`

  return imgUrl
}
