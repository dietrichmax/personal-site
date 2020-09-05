async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )
  return data?.posts[0]
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(`
    {
      posts {
        slug
      }
    }
  `)
  return data?.allPosts
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 50, where: $where) {
        title
        slug
        excerpt
        date
        tags {
          name
          color
          slug
        }
        lang
        coverImage {
          caption
          coverImage {
            url
          }
        }
        author {
          name
          picture {
            url
          }
        }
      }
    }
  `,
    {
      variables: {
        where: {
          ...(preview ? {} : { status: 'published' }),
        },
      },
    }
  )
  return data?.posts
}

export async function getPostAndMorePosts(slug, preview) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      title
      slug
      content
  		tags {
        name
        color
        slug
			}
      lang
      date
      ogImage: coverImage {
        caption
        coverImage {
          url
        }
      }
      coverImage {
        caption
        coverImage {
          url
        }
      }
      author {
        name
        bio
        picture {
          url
        }
        socials {
          plattform
          link
        }
      }
    }

    morePosts: posts(sort: "date:desc", limit: 3, where: $where_ne) {
      title
      slug
  		tags {
        name
        color
        slug
			}
      lang
      excerpt
      date
      coverImage {
        caption
        coverImage {
          url
        }
      }
      author {
        name
        bio
        picture {
          url
        }
        socials {
          plattform
          link
        }
      }
    }
  }
  `,
    {
      preview,
      variables: {
        where: {
          slug,
          ...(preview ? {} : { status: 'published' }),
        },
        where_ne: {
          ...(preview ? {} : { status: 'published' }),
          slug_ne: slug,
        },
      },
    }
  )
  return data
}

export async function getPages(slug) {
  const data = await fetchAPI(
    `
  query AllPages($where: JSON, $where_ne: JSON) {
    pages(where: $where) {
      title
      slug
      content
      date
    }
  }
  `,
    {
      variables: {
        where: {
          slug
        },
        where_ne: {
          slug_ne: slug
        },
      },
    }
  )
  return data?.allPages
}

export async function getAllTags() {
  const data = await fetchAPI(`
    {
      tags {
        name
        color
        description
        slug
      }
    }
  `,
  )
  return data?.allTags
}


export async function getAllTagsWithSlug() {
  const data = fetchAPI(`
    {
      tags {
        slug
      }
    }
  `)
  return data?.allTags
}