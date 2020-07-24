import _ from 'underscore'

export function getPostsFromQuery (posts) {
  if (posts) {
    return posts.edges
      .map(edge => edge.node)
      .map(node => Object.assign({}, node.frontmatter, node.fields, { excerpt: node.excerpt }))
  }

  return []
}

export function getCategoriesFromQuery(categories) {
  if (categories) {
    return _.uniq(
      categories.edges
        .map(edge => edge.node)
        .map(node => Object.assign({}, node.frontmatter))
        .map(c => c.category)
        .sort()
    )
  }
  return []
}

export function getTagsFromQuery (tags) {
  if (tags) {
    return _.uniq(
      tags.edges
        .map(edge => edge.node)
        .map(node => Object.assign({}, node.frontmatter))
        .reduce((acc, e) => acc.concat(e.tags), [])
        .sort()
    )
  }

  return []
}

export function makeElipsedText (text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "..."
  } else {
    return text;
  }
}