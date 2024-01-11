//import { createHmac } from 'crypto';
const createHmac = require("create-hmac")

export default function imgproxyLoader({ src, width, height, quality, blur }) {
  const KEY = "2e545d427987ce3f7af0120536b0fb56f13986f88a323f62533f418151a074"
  const SALT = "84fa3020f5abcb553e8d44cb8a5bed3e589d99e8f30fdb6aa0dd741930c288"

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
  const path =
    `/size:${width ? width : 0}:${height ? height : 0}` +
    `/resizing_type:fill` +
    (quality ? `/quality:${quality}` : "") +
    `/sharpen:0.5` +
    `/plain/${
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
      src.replace(process.env.NEXT_PUBLIC_STRAPI_API_URL, "")
    }` +
    `@webp`

  const host = process.env.NEXT_PUBLIC_IMGPROXY_URL
  const signature = sign(SALT, path, KEY)

  const imgUrl = `${host}/${signature}${path}`

  return imgUrl
}
