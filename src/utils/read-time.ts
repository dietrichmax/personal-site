export default function readTime(content) {
  const WPS: number = 250 / 60

  let images: number = 0
  let codes: number = 0
  const regex = /\w/

  let words = content.split(" ").filter((word) => {
    if (word.includes("<img")) {
      images += 1
    } else if (word.includes("<code")) {
      codes += 1
    }
    return regex.test(word)
  }).length

  var imageAdjust: number = images * 4
  var imageSecs: number = 0
  var imageFactor: number = 12

  while (images) {
    imageSecs += imageFactor
    if (imageFactor > 3) {
      imageFactor -= 1
    }
    images -= 1
  }

  const minutes: number = Math.ceil(
    ((words - imageAdjust) / WPS + imageSecs) / 60
  )

  return minutes
}
