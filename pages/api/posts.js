import { getAllPosts, getAllNotes, getAllLinks, getAllBlogrolls, getAllRecipes } from '@/lib/data/api/cms'

export default async (_, res) => {
  const allPosts = (await getAllPosts()) || []
  const allNotes = (await getAllNotes()) || []
  const allLinks = (await getAllLinks()) || []
  const allRecipes = (await getAllRecipes()) || []

  const publishOn = (note) => {
    const endpoints = []
    note.publishOnTwitter ? endpoints.push(`https://brid.gy/publish/twitter`) : null
    return endpoints
  }

  const allContent = []

  allPosts.map((post) => {
    allContent.push({
      id: post.id,
      published_at: post.published_at,
      updated_at: post.updated_at,
      title: post.title,
      slug: post.slug,
      date: post.date,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags,
      type: "article"
    })
  })


  allNotes.map((note) => {
    const endpoints = publishOn(note)
    allContent.push({
      id: note.id,
      published_at: note.published_at,
      updated_at: note.updated_at,
      title: note.title,
      slug: note.id,
      coverMedium: note.coverMedium,
      date: note.date,
      content: note.content,
      category: note.category,
      ofUrl: note.ofUrl,
      syndicationLinks: note.syndicationLinks,
      endpoints: endpoints,
      type: "note"
    })
  })

  allLinks.map((link) => {
    allContent.push({
      id: link.id,
      published_at: link.published_at,
      updated_at: link.updated_at,
      title: link.title,
      slug: `${link.link}`,
      date: link.date,
      description: link.description,
      link: link.link,
      tags: link.tags,
      type: "link"
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
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json(
    sortedContent
  );
};