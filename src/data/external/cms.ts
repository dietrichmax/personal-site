import { fetchGET } from "@/src/utils/fetcher"

export async function fetchStrapiAPI(query: string, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
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
      posts(sort: "published_at:desc") {
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

// Get related Posts

export async function getRelatedPosts() {
  const data = await fetchStrapiAPI(
    `
    {
      posts {
        title
        slug
        updated_at
        excerpt
        tags {
          name
        }
      }
    }
  `
  )
  return data?.posts
}

export async function getPostBySlug(slug) {
  const data = await fetchStrapiAPI(
    `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      created_at
      updated_at
      published_at
      title
      slug
      excerpt
      content
      tags {
        name
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

export async function getPostById(id) {
  const json = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts/${id}`
  )
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch Post by ID")
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
        updated_at
        published_at
        title
        slug
        excerpt
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

export async function getLinksCount() {
  const json = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/links/count`
  )
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch Links count")
  }

  return json
}

export async function getCommentsCount() {
  const json = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/comments/count`
  )
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI Comments count")
  }

  return json
}

export async function getPostsCount() {
  const json = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/posts/count`
  )
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch Posts count")
  }

  return json
}

export async function getTagsCount() {
  const json = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/tags/count`
  )
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch Tags count")
  }

  return json
}

export async function getRecipesCount() {
  const json = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/recipes/count`
  )
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch Recipes count")
  }

  return json
}

export async function getRoutesCount() {
  const json = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/routes/count`
  )
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch Routes count")
  }

  return json
}

export async function getSubscribersCount() {
  const json = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/subscribers/count`
  )
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch Subscribers count")
  }

  return json
}

export async function getPhotosCount() {
  const json = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/photos/count`
  )
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch Photos count")
  }

  return json
}

export async function getActivitiesCount() {
  const json = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/activities/count`
  )
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch activities count")
  }

  return json
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

export async function getThanks() {
  const data = await fetchStrapiAPI(
    `
    {
      thank {
        thanks
      } 
    }
  `
  )
  return data?.thank
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