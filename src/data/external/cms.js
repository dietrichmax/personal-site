export async function fetchStrapiAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
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
        created_at
        updated_at
        published_at
        title
        slug
        content
        excerpt
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
          url
        }
      }
    }
  `
  )
  return data?.posts
}

export async function getPostAndMorePosts(slug) {
  const data = await fetchStrapiAPI(
    `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      id
      created_at
      updated_at
      published_at
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
        url
        formats
      }
      syndicationLinks {
        name
        slug
      }
      positive_feedback_count
      negative_feedback_count
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
      vgwortpubliccode
      vgwortprivatecode
    }

    morePosts: posts(sort: "date:desc", limit: 3, where: $where_ne) {
      title
      slug
      created_at
      updated_at
      published_at
      positive_feedback_count
      negative_feedback_count
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
  while ((data = false)) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
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
  `
  )
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
      posts(sort: "published_at:desc") {
        id
        created_at
        updated_at
        published_at
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
          url
        }
      }
      note {
        id
        title
        created_at
        updated_at
        published_at
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
          formats
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
      photo {
        id
        created_at
        updated_at
        published_at
        title
        description
        photo {
          formats
          width
          height
          url
        }
        slug
        tags {
          name
          color
          slug
        } 
        syndicationLinks {
          name
          slug
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
          formats
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
        formats
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
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json
}

export async function getPostsCount() {
  const res = await fetch(`https://api.mxd.codes/posts/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json
}

export async function getTagsCount() {
  const res = await fetch(`https://api.mxd.codes/tags/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json
}

export async function getNotesCount() {
  const res = await fetch(`https://api.mxd.codes/notes/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json
}

export async function getLocationsCount() {
  const res = await fetch(`https://api.mxd.codes/locations/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json
}

export async function getRecipesCount() {
  const res = await fetch(`https://api.mxd.codes/recipes/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json
}

export async function getRoutesCount() {
  const res = await fetch(`https://api.mxd.codes/routes/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json
}

export async function getSubscribersCount() {
  const res = await fetch(`https://api.mxd.codes/subscribers/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json
}

export async function getPhotosCount() {
  const res = await fetch(`https://api.mxd.codes/photos/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json
}

export async function getActivitiesCount() {
  const res = await fetch(`https://api.mxd.codes/activities/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
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
        created_at
        updated_at
        published_at
        coverMedium {
          url
          name
          width
          height
          formats
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
  `
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
        },
      },
    }
  )
  return data.comments
}

export async function getNote(slug) {
  const data = await fetchStrapiAPI(
    `
  query NoteBySlug($where: JSON) {
    notes(where: $where) {
      id
      title
      created_at
      updated_at
      published_at
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
        formats
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
          slug,
        },
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
  `
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
        created_at
        updated_at
        published_at
        title
        link
        slug
        description
        tags {
          name
          color
          slug
        }
      }
    }
  `
  )
  return data?.links
}

export async function getLink(slug) {
  const data = await fetchStrapiAPI(
    `
  query LinkBySlug($where: JSON) {
    links(where: $where) {
      id
      created_at
      updated_at
      published_at
      title
      link
      slug
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
          slug,
        },
      },
    }
  )
  return data
}

// photos

export async function getAllPhotos() {
  const data = await fetchStrapiAPI(
    `
    {
      photos(sort: "created_at:desc") {
        id
        created_at
        updated_at
        published_at
        title
        description
        photo {
          formats
          width
          height
          url
        }
        slug
        tags {
          name
          color
          slug
        } 
        syndicationLinks {
          name
          slug
        }
      }
    }
  `
  )
  return data?.photos
}

export async function getPhoto(slug) {
  const data = await fetchStrapiAPI(
    `
  query PhotosBySlug($where: JSON) {
    photos(where: $where) {
      id
      created_at
      updated_at
      published_at
      title
      description
      photo {
        formats
        width
        height
        url
      }
      slug
      tags {
        name
        color
        slug
      } 
      syndicationLinks {
        name
        slug
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
  `
  )
  return data?.locations
}

export async function getRecentLocationData() {
  const data = await fetchStrapiAPI(
    `
    {
      locations(sort: "id:desc", limit: -1) {
        lat
        lon
        alt
        vel
      }
    }
  `
  )
  return data?.locations
}

export async function getNowData() {
  const data = await fetchStrapiAPI(
    `
    {
      now {
        content
      }
    }
  `
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
          description
          longDescription
          tags
          url
          startDate
          endDate
          logo {
            url
            formats
          }
        }
        interests {
          title
          description
        }
        profile {
          url
          formats
        }
      }
    }
  `
  )
  return data?.cv
}

export async function getAllActivities() {
  const data = await fetchStrapiAPI(
    `
    {
      activities(sort: "start_date:desc") {
        id
        created_at
        updated_at
        activityId
        activityName
        start_date
        distance
        duration
        elapsedDuration
        movingDuration
        elevationGain
        averageSpeed
        maxSpeed
        startLatitude
        startLongitude
        details
        temperature
        weather_description
        weather_icon
        weather_main
        sportTypeId
        grit     
        flow   
        jumpCount   
        caloriesEstimated  
        caloriesConsumed
        waterEstimated
        waterConsumed
        kudos_count
        comment_count
        achievement_count
        athlete_count
        type
        slug
      }
    }
  `
  )
  return data?.activities
}

export async function getActivity(slug) {
  const data = await fetchStrapiAPI(
    `
    query getActivityBySlug($where: JSON){
      activities(where: $where) {
        id
        created_at
        updated_at
        activityId
        activityName
        start_date
        distance
        duration
        elapsedDuration
        movingDuration
        elevationGain
        averageSpeed
        maxSpeed
        startLatitude
        startLongitude
        details
        temperature
        weather_description
        weather_icon
        weather_main
        sportTypeId
        grit     
        flow   
        jumpCount   
        caloriesEstimated  
        caloriesConsumed
        waterEstimated
        waterConsumed
        kudos_count
        comment_count
        achievement_count
        athlete_count
        type
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
