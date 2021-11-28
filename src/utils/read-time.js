export default function readTime(content) {
  const WPS = 250 / 60

  var images = 0
  var codes = 0
  const regex = /\w/

  let words = content.split(" ").filter((word) => {
    if (word.includes("<img")) {
      images += 1
    } else if (word.includes("<code")) {
      codes += 1
    }
    return regex.test(word)
  }).length

  var imageAdjust = images * 4
  var imageSecs = 0
  var imageFactor = 12

  while (images) {
    imageSecs += imageFactor
    if (imageFactor > 3) {
      imageFactor -= 1
    }
    images -= 1
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60)

  return minutes
}
