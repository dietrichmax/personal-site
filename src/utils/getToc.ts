export function getToc(markdown: string) {
  const regXHeader = /#{1,6}.+/g
  const regexReplaceCode = /(```.+?```)/gms
  const regexRemoveLinks = /\[(.*?)\]\(.*?\)/g

  const markdownWithoutLinks = markdown.replaceAll(regexRemoveLinks, "")
  const markdownWithoutCodeBlocks = markdownWithoutLinks.replaceAll(
    regexReplaceCode,
    ""
  )

  const titles = markdownWithoutCodeBlocks.match(regXHeader)

  const toc = []
  let globalID = 0

  
  if (titles) {
    titles.map((tempTitle) => {
      const level = tempTitle.match(/#/g).length - 1
      const title = tempTitle.replace(/#/g, "")
      const anchor = `#${title.replace(/ /g, "-").replaceAll(":","").replaceAll(",","").substring(1).toLowerCase()}`
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
