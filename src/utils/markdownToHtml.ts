const showdown = require("showdown")

export default async function markdownToHtml(markdown: string) {
  const converter = new showdown.Converter()

  return converter.makeHtml(markdown)
}
