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
        published_at
        updated_at
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
          backgroundColor
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
      published_at
      updated_at
      date
      dateUpdated
      title
      slug
      excerpt
      content
      tags {
        name
        color
        slug
        backgroundColor
      }
      lang
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

    morePosts: posts(sort: "date:desc", limit: 3, where: $where_ne) {
      title
      slug
      date
      dateUpdated
      published_at
      updated_at
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

export async function getPostById(id) {
  const data = false
  while (data = false) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
}
  
  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch STRAPI API')
  }

  return json
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
        backgroundColor
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
      backgroundColor
      slug
      posts(sort: "date:desc") {
        id
        published_at
        updated_at
        date
        dateUpdated
        title
        slug
        content
        excerpt
        tags {
          name
          color
          slug
          backgroundColor
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
      published_at
      updated_at
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

// Get Recipes 

export async function getAllRecipes() {
  const data = await fetchStrapiAPI(`
    {
      recipes {
        title
        subtitle
        slug
        duration
        published_at
        updated_at
        description
        coverImage {
          url
        }
      }
    }
  `)
  return data?.recipes
}


export async function getRecipe(slug) {
  const data = await fetchStrapiAPI(
    `
  query RecipeBySlug($where: JSON) {
    recipes (where: $where) {
      title
      subtitle
      slug
      coverImage {
        url
      }
      description
      duration
      yield
      ingredients {
        amount
        ingredient
      }
      published_at
      updated_at
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

export async function getLocationsCount() {
  const res = await fetch(`https://api.mxd.codes/locations/count`, {
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

export async function getRecipesCount() {
  const res = await fetch(`https://api.mxd.codes/recipes/count`, {
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

export async function getRoutesCount() {
  const res = await fetch(`https://api.mxd.codes/routes/count`, {
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

export async function getActivitiesCount() {
  const res = await fetch(`https://api.mxd.codes/activities/count`, {
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
        id
        title
        slug
        published_at
        updated_at
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


export async function getComments(slug) {
  const data = await fetchStrapiAPI(
    `
    query CommentBySlug($where: JSON) { 
      comments(where: $where) {
        slug
        name
        email
        text
        published_at
      }
    }
  `,
  {
    variables: {
      where: {
        slug,
      }
    },
  })
  return data.comments
}

export async function getNote(id) {
  const data = await fetchStrapiAPI(
    `
  query NoteBySlug($where: JSON) {
    notes(where: $where) {
      id
      title
      date
      published_at
      updated_at
      slug
      lat
      lon
      temperature
      weather_main
      weather_description
      weather_icon
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
          id,
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
        id
        published_at
        updated_at
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

export async function getLink(id) {
  const data = await fetchStrapiAPI(
    `
  query LinkBySlug($where: JSON) {
    links(where: $where) {
      id
      published_at
      updated_at
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
    {
      variables: {
        where: {
          id,
        }
      },
    }
  )
  return data
}

export async function getLocationData() {
  const data = await fetchStrapiAPI(
    `
    {
      locations(sort: "id:desc") {
        lat
        lon
        acc
        alt
        batt
        bs
        cog
        rad
        t
        tid
        vac
        vel
        p
        conn
        topic
        inregions
        ssid
        bssid
        tst
      }
    }
  `,
  )
  return data?.locations
}

export async function getRecentLocationData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/locations?_sort=id:desc&_limit=100000`, {
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

export async function getNowData() {
  const data = await fetchStrapiAPI(
    `
    {
      now {
        content
      }
    }
  `,
  )
  return data?.now
}

export async function getCV() {
  const data = await fetchStrapiAPI(
    `
    {
      cv {
        title
        subtitle
        smallBio
        skills {
          name
          skillName {
            name
          }
        }
        education {
          type
          location
          date
          description
        }
        timeline {
          role
          company
          location
          date
          description
          longDescription
          tags
          url
        }
        interests {
          title
          description
        }
      }
    }
  `,
  )
  return data?.cv
}

export async function getAllActivities() {
  const data = await fetchStrapiAPI(
    `
    {
      activities(sort: "beginTimestamp:desc") {
        id
        created_at
        updated_at
        activityId
        activityName
        activityType
        beginTimestamp
        distance
        duration
        elapsedDuration
        movingDuration
        elevationGain
        elevationLoss
        averageSpeed
        maxSpeed
        startLatitude
        startLongitude
        endLatitude
        endLongitude
        details
        temperature
        weather_description
        weather_icon
        weather_main
        maxElevation
        minElevation
        sportTypeId
        grit     
        flow   
        jumpCount   
        caloriesEstimated  
        caloriesConsumed
        waterEstimated
        waterConsumed
      }
    }
  `,
  )
  return data?.activities
}

export async function getActivityBySlug(id) {
  const data = await fetchStrapiAPI(
    `
    query ActivityBySlug($where: JSON){
      activities(where: $where) {
        id
        created_at
        updated_at
        activityId
        activityName
        activityType
        beginTimestamp
        distance
        duration
        elapsedDuration
        movingDuration
        elevationGain
        elevationLoss
        averageSpeed
        maxSpeed
        startLatitude
        startLongitude
        endLatitude
        endLongitude
        details
        temperature
        weather_description
        weather_icon
        weather_main
        maxElevation
        minElevation
        sportTypeId
        grit     
        flow   
        jumpCount   
        caloriesEstimated  
        caloriesConsumed
        waterEstimated
        waterConsumed
      }
    }
  `,
  {
    variables: {
      where: {
        id,
      }
    },
  })

  return data
}

export async function getActivity(id) {
  const data = await fetchStrapiAPI(
    `
    query getActivity($where: JSON){
      activities(where: $where) {
        id
        created_at
        updated_at
        activityId
        activityName
        activityType
        beginTimestamp
        distance
        duration
        elapsedDuration
        movingDuration
        elevationGain
        elevationLoss
        averageSpeed
        maxSpeed
        startLatitude
        startLongitude
        endLatitude
        endLongitude
        details
        temperature
        weather_description
        weather_icon
        weather_main
        maxElevation
        minElevation
        sportTypeId
        grit     
        flow   
        jumpCount   
        caloriesEstimated  
        caloriesConsumed
        waterEstimated
        waterConsumed
      }
    }
  `,
    {
      variables: {
        where: {
          id,
        }
      },
    }
  )
  return data
}