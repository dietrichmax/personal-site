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

// Get Posts

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

export async function getAllPostsForHome() {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 6, where: $where) {
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
    }
  `,
    {
      variables: {
        where: {
          ...({ status: 'published' }),
        },
      },
    }
  )
  return data?.posts
}

export async function getAllPostsForBlog() {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 12, where: $where) {
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
      }
    }
  `,
    {
      variables: {
        where: {
          ...({ status: 'published' }),
        },
      },
    }
  )
  return data?.posts
}

export async function getPostAndMorePosts(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
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
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
          status: 'published',
        },
        where_ne: {
          status: 'published',
          slug_ne: slug,
        },
      },
    }
  )
  return data
}

// Get Tags

export async function getAllTagsForHome() {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      tags(where: $where) {
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
  const data = await fetchAPI(
    `
  query TagBySlug($where: JSON) {
    tags(where: $where) {
      name
      description
      color
      slug
      posts(sort: "date:desc") {
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

// Get Pages 

export async function getPage(slug) {
  const data = await fetchAPI(
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


export async function getAllPagesWithSlug() {
  const data = fetchAPI(`
    {
      pages {
        slug
      }
    }
  `)
  return data?.allPages
}

// get jobs

export async function getJob(slug) {
  const data = await fetchAPI(
    `
  query JobBySlug($where: JSON) {
    jobs(sort: "date:desc", where: $where) {
      title
      location
      jobDescription
      workingTime
      date
      contractType
      slug
      vacationDays
      company {
        name
        logo {
          url
        }
        size
        websiteUrl
      }
      workingHours
      salary
      location
      applicationLink
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
          status: 'published',
        },
      },
    }
  )
  return data
}


export async function getAllJobsWithSlug() {
  const data = fetchAPI(`
    {
      jobs {
        slug
      }
    }
  `)
  return data?.allPages
}

export async function getAllJobsForJobboard() {
  const data = await fetchAPI(
    `
    query Jobs($where: JSON){
      jobs(sort: "date:desc", limit: 20, where: $where) {
        title
        location
        jobDescription
        workingTime
        date
        contractType
        slug
        vacationDays
        company {
          name
          logo {
            url
          }
          size
          websiteUrl
        }
        workingHours
        salary
        location
        applicationLink
      }
    }
  `,
    {
      variables: {
        where: {
          ...({ status: 'published' }),
        },
      },
    }
  )
  return data?.jobs
}

export async function getAllJobsForHome() {
  const data = await fetchAPI(
    `
    query Jobs($where: JSON){
      jobs(sort: "date:desc", limit: 9, where: $where) {
        title
        location
        jobDescription
        workingTime
        date
        contractType
        slug
        vacationDays
        company {
          name
          logo {
            url
          }
          size
          websiteUrl
        }
        workingHours
        salary
        location
        applicationLink
      }
    }
  `,
    {
      variables: {
        where: {
          ...({ status: 'published' }),
        },
      },
    }
  )
  return data?.jobs
}

// Get Header Nav Items
/*export async function getHeaderNavItem() {
  const data = fetchAPI(`
    {
      headerNavItems {
        items {
          name
          slug
        }
      }
    }
  `)
  return data?.headerNavItem
}*/

// Get Footer Nav Items
export async function getFooterNavItem() {
  const data = fetchAPI(`
    {
      footerNavItem {
        items {
          name
          slug
        }
      }
    }
  `)
  return data?.footerNavItem
}

// Get Footer Sub-Nav Items
export async function getFooterSubNavItem() {
  const data = fetchAPI(`
    {
      footerSubNavItem {
        items {
          name
          slug
        }
      }
    }
  `)
  return data?.footerSubNavItem
}