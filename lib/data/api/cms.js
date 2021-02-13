export async function fetchStrapiAPI(query, { variables } = {}) {
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
    throw new Error('Failed to fetch STRAPI API')
  }

  return json.data
}


// Get Config Data

export async function getConfigData() {
  const data = fetchStrapiAPI(`
    {
      config {
        siteTitle
        siteTitleShort
        siteTitleAlt
        siteDescription
        loading
        homePath
        siteRss
        dateFormat
        copyright
        defaultLang
        themeColor
        backgroundColor
        loading
        github
        twitter
        linkedin
        instagram
        siteLogo {
          url
        }
      }
    }
  `)
  return data
}

// Get Posts

export async function getAllPosts() {
  const data = await fetchStrapiAPI(
    `
    {
      posts(sort: "date:desc") {
        id
        title
        slug
        content
        excerpt
        date
	      dateUpdated
        tags {
          name
          color
          slug
        }
        lang
        coverImage {
          caption
          coverImage {
            formats
          }
        }
      }
    }
  `,
  )
  return data?.posts
}


export async function getPostAndMorePosts(slug) {
  const data = await fetchStrapiAPI(
    `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      id
      title
      slug
      excerpt
      content
      tags {
        name
        color
        slug
      }
      lang
      date
      dateUpdated
      coverImage {
        caption
        coverImage {
          formats
        }
      }
      ogImage: coverImage {
        caption
        coverImage {
          url
        }
      }
      user {
        username
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

    morePosts: posts(sort: "date:desc", limit: 10, where: $where_ne) {
      title
      slug
      date
      dateUpdated
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
        where_ne: {
          slug_ne: slug,
        },
      },
    }
  )
  return data
}

// Get Tags

export async function getAllTags() {
  const data = await fetchStrapiAPI(
    `
    {
      tags {
        name
        description
        color
        slug
      }
    }
  `,)
  return data?.tags
}

export async function getTag(slug) {
  const data = await fetchStrapiAPI(
    `
  query TagBySlug($where: JSON) {
    tags(where: $where) {
      name
      description
      color
      slug
      posts(sort: "date:desc") {
        id
        title
        slug
        content
        excerpt
        date
	      dateUpdated
        tags {
          name
          color
          slug
        }
        lang
        coverImage {
          caption
          coverImage {
            formats
	        }
        }
      }
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
  return data
}



// Get Pages 

export async function getPage(slug) {
  const data = await fetchStrapiAPI(
    `
  query PageBySlug($where: JSON) {
    pages(where: $where) {
      title
      description
      content
      date
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
  return data
}


export async function getAllPages() {
  const data = fetchStrapiAPI(`
    {
      pages {
        slug
      }
    }
  `)
  return data?.allPages
}

// sitemap

export async function getAllSitemapPosts() {
  const data = fetchStrapiAPI(`
    {
      posts {
        slug
      }
    }
  `)
  return data
}

export async function getAllSitemapPages() {
  const data = fetchStrapiAPI(`
    {
      pages {
        slug
      }
    }
  `)
  return data
}
  
export async function getAllSitemapTags() {
  const data = fetchStrapiAPI(`
    {
      tags {
        slug
      }
    }
  `)
  return data
}
  

// get count of content types

export async function getPostsCount() {
  const res = await fetch(`https://api.mxd.codes/posts/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch STRAPI API')
  }

  return json
}

export async function getTagsCount() {
const res = await fetch(`https://api.mxd.codes/tags/count`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})

const json = await res.json()
if (json.errors) {
  console.error(json.errors)
  throw new Error('Failed to fetch STRAPI API')
}

return json
}

export async function getSubscribersCount() {
const res = await fetch(`https://api.mxd.codes/subscribers/count`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})

const json = await res.json()
if (json.errors) {
  console.error(json.errors)
  throw new Error('Failed to fetch STRAPI API')
}

return json
}

// notes

export async function getAllNotes() {
  const data = await fetchStrapiAPI(
    `
    {
      notes(sort: "date:desc") {
        date
        content
      }
    }
  `,
  )
  return data?.notes
}


export async function getAllBlogrolls() {
  const data = await fetchStrapiAPI(
    `
    {
      blogrolls {
        name
        websiteUrl
        bio
        profilePictureUrl
      }
    }
  `,
  )
  return data?.blogrolls
}
