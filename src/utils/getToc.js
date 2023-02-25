export function getToc(markdown) {
  const regXHeader = /#{1,6}.+/g
  const regexReplaceCode = /(```.+?```)/gms
  const regexRemoveLinks = /\[(.*?)\]\(.*?\)/g

  const markdownWithoutCodeBlocks = markdown
    .replace(regexRemoveLinks, "")
    .replace(regexReplaceCode, "")
  const titles = markdownWithoutCodeBlocks.match(regXHeader)

  const toc = []
  let globalID = 0

  if (titles) {
    titles.map((tempTitle, i) => {
      const level = tempTitle.match(/#/g).length - 1
      const title = tempTitle.replace(/#/g, "").trim("")
      const anchor = `#${title.replace(/ /g, "-").toLowerCase()}`
      level === 1 ? (globalID += 1) : globalID

      toc.push({
        level: level,
        id: globalID,
        title: title,
        anchor: anchor,
      })
    })
  }

  return toc
}
