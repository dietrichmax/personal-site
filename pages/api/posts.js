import { getAllPosts, getAllNotes, getAllLinks, getAllBlogrolls, getAllRecipes, getAllActivities } from 'src/data/external/cms'

export default async (_, res) => {
  const allPosts = (await getAllPosts()) || []
  const allNotes = (await getAllNotes()) || []
  const allLinks = (await getAllLinks()) || []
  const allActivities = (await getAllActivities()) || []
  const allRecipes = (await getAllRecipes()) || []

  const publishOn = (note) => {
    const endpoints = []
    note.publishOnTwitter ? endpoints.push(`https://brid.gy/publish/twitter`) : null
    return endpoints
  }

  
  const allContent = []

  allPosts.map((post) => {
    allContent.push({
      post: post,
      date: post.published_at,
      type: "article"
    })
  })


  allNotes.map((note) => {
    const endpoints = publishOn(note)
    allContent.push({
      note: note,
      date: note.published_at,
      endpoints: endpoints,
      type: "note"
    })
  })

  allLinks.map((link) => {
    allContent.push({
      link: link,
      date: link.published_at,
      type: "link"
    })
  })

  allActivities.map((activity) => {
    allContent.push({
      activity: activity,
      date: activity.created_at,
      type: "activity"
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
    'Cache-Control',
    'public, s-maxage=120, stale-while-revalidate=60'
  );

  return res.status(200).json(
    sortedContent
  );
};