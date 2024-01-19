import {
  getAllPosts,
  getAllLinks,
  getAllRecipes,
  getAllActivities,
} from "src/data/external/cms"

export default async (_, res) => {
  const allPosts = (await getAllPosts()) || []
  const allLinks = (await getAllLinks()) || []
  const allActivities = (await getAllActivities()) || []

  const allContent = []

  allPosts.map((post) => {
    allContent.push({
      post: post,
      date: post.published_at,
      type: "article",
    })
  })

  allLinks.map((link) => {
    allContent.push({
      link: link,
      date: link.published_at,
      type: "link",
    })
  })

  allActivities.map((activity) => {
    allContent.push({
      activity: activity,
      date: activity.created_at,
      type: "activity",
    })
  })

  /*recipes.map((recipe) => {
    allContent.push({
      title: recipe.title,
      slug: `${config.siteUrl}/recipes/${recipe.slug}`,
      date: recipe.published_at,
      content: recipe.description
    })
  })*/

  const sortedContent = allContent.sort((a, b) => (a.date < b.date ? 1 : -1))

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=60"
  )

  return res.status(200).json(sortedContent)
}
