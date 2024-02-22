import { fetchGET } from "@/src/utils/fetcher"
import * as qs from "qs"

interface Res {
  data: [
    {
      id: number
      attributes: any
      meta: object
    },
  ]
  error: {
    status: number // HTTP status
    name: string // Strapi error name ('ApplicationError' or 'ValidationError')
    message: string // A human readable error message
    details: object // // error info specific to the error type
  }
}

export async function fetchStrapiAPI(query: object, endpoint: string) {
  const res: Res = await fetchGET(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/${endpoint}?${qs.stringify(query)}`
  )
  if (res.error) {
    console.log(res.error.details)
    throw new Error(
      `${res.error.status}: \n ${res.error.name} \n ${res.error.message}`
    )
  }
  return res.data
}

export async function getAllPosts() {
  const data = fetchStrapiAPI(
    {
      sort: ["createdAt:desc"],
      fields: ["title", "slug", "updatedAt", "publishedAt", "createdAt", "description"],
      pagination: {
        page: 1,
        pageSize: 100,
      },
    },
    "posts"
  )
  return data
}

export async function getAllPostSlugs() {
  const data = fetchStrapiAPI(
    {
      fields: ["slug"],
      pagination: {
        page: 1,
        pageSize: 100,
      },
    },
    "posts"
  )
  return data
}

export async function getAllPhotos() {
  const data = fetchStrapiAPI(
    {
      sort: ["createdAt:desc"],
      populate: {
        photo: {
          poulate: ["formats"],
        },
      },
      fields: ["title", "slug", "updatedAt", "publishedAt", "createdAt"],
    },
    "photos"
  )
  return data
}

export async function getAllPhotoSlugs() {
  const data = fetchStrapiAPI(
    {
      fields: ["slug"],
    },
    "photos"
  )
  return data
}

export async function getAllLinks() {
  const data = fetchStrapiAPI(
    {
      sort: ["createdAt:desc"],
      fields: [
        "title",
        "link",
        "slug",
        "updatedAt",
        "publishedAt",
        "createdAt",
        "description",
      ],
    },
    "links"
  )
  return data
}

export async function getAllLinkSlugs() {
  const data = fetchStrapiAPI(
    {
      fields: ["slug"],
    },
    "links"
  )
  return data
}

export async function getPostBySlug(slug: string) {
  const data = fetchStrapiAPI(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
      fields: [
        "title",
        "slug",
        "description",
        "updatedAt",
        "createdAt",
        "content",
      ],
    },
    "posts"
  )
  return data
}

export async function getPhotoBySlug(slug: string) {
  const data = fetchStrapiAPI(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
      fields: ["title", "slug", "updatedAt", "publishedAt", "description"],
    },
    "photos"
  )
  return data
}

export async function getLinkBySlug(slug: string) {
  const data = fetchStrapiAPI(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
      fields: [
        "title",
        "link",
        "slug",
        "updatedAt",
        "publishedAt",
        "description",
      ],
    },
    "links"
  )
  return data
}

export async function getAllTagSlugs() {
  const data = fetchStrapiAPI(
    {
      fields: ["slug"],
      pagination: {
        page: 1,
        pageSize: 100,
      },
    },
    "tags"
  )
  return data
}

export async function getTagBySlug(slug: string) {
  const data = fetchStrapiAPI(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
      fields: [
        "name",
        "description",
        "color",
        "slug",
        "updatedAt",
        "createdAt",
      ],
    },
    "tags"
  )
  return data
}

export async function getAllPageSlugs() {
  const data = fetchStrapiAPI(
    {
      fields: ["slug"],
    },
    "pages"
  )
  return data
}

export async function getPageBySlug(slug: string) {
  const data = fetchStrapiAPI(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      fields: [
        "title",
        "description",
        "content",
        "slug",
        "updatedAt",
        "publishedAt",
      ],
    },
    "pages"
  )
  return data
}

export async function getCV() {
  const data = fetchStrapiAPI(
    {
      populate: {
        skills: {
          populate: "*",
        },
        education: {
          populate: "*",
        },
        timeline: {
          populate: "*",
        },
        interests: {
          populate: "*",
        },
      },
      fields: ["title", "subTitle", "smallBio"],
    },
    "cv"
  )
  return data
}

export async function getAbout() {
  const data = fetchStrapiAPI(
    {
      fields: [
        "title",
        "intro",
        "bioShort",
        "BioMedium",
        "BioLong",
        "publishedAt",
      ],
    },
    "about"
  )
  return data
}

export async function getAllSubscribers() {
  const data = fetchStrapiAPI(
    {
      fields: [
        "name",
        "email"
      ],
      pagination: {
        page: 1,
        pageSize: 10000,
      },
    },
    "subscribers"
  )
  return data
}
