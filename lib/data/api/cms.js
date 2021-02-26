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

// Get Header Nav

export async function getHeaderNav() {
  const data = fetchStrapiAPI(`
    {
      headerNav {
        links {
          name
          slug
        }
      }
    }
  `)
  return data
}

// Get Footer Nav

export async function getFooterNav() {
  const data = fetchStrapiAPI(`
    {
      footerNav {
        links {
          name
          slug
        }
      }
    }
  `)
  return data
}
// Get About Data

export async function getAbout() {
  const data = fetchStrapiAPI(`
    {
      about {
        title
        image {
          url
        }
        intro
        bioShort
        bioMedium
        bioLong
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
        syndicationLinks {
          name
          slug
        }
        tags {
          name
          color
          slug
        }
        lang
        coverImage {
          coverImage {
            url
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
        coverImage {
          url
        }
      }
      syndicationLinks {
        name
        slug
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
          coverImage {
            url
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


// get count of content types

export async function getLinksCount() {
  const res = await fetch(`https://api.mxd.codes/links/count`, {
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

export async function getNotesCount() {
  const res = await fetch(`https://api.mxd.codes/notes/count`, {
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
        title
        slug
        date
        coverMedium {
          url
          name
          width
          height
        }
        category
        content
        ofUrl
        publishOnTwitter
        publishOnInstagram
        publishOnReddit      
        syndicationLinks {
          name
          slug
        }
        tags {
          name
          color
          slug
        }
      }
    }
  `,
  )
  return data?.notes
}

export async function getNote(date) {

  const data = await fetchStrapiAPI(
    `
  query NoteBySlug($where: JSON) {
    notes(where: $where) {
      title
      date
      slug
      coverMedium {
        url
        name
        width
        height
      }
      content
      ofUrl
      category
      publishOnTwitter
      publishOnInstagram
      publishOnReddit
      syndicationLinks {
        name
        slug
      }
      tags {
        name
        color
        slug
      }
    }
  }
  `,
    {
      variables: {
        where: {
          date,
        }
      },
    }
  )
  return data
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
        feedUrl
      }
    }
  `,
  )
  return data?.blogrolls
}

// links

export async function getAllLinks() {
  const data = await fetchStrapiAPI(
    `
    {
      links(sort: "date:desc") {
        title
        link
        date
        description
        tags {
          name
          color
          slug
        }
      }
    }
  `,
  )
  return data?.links
}
