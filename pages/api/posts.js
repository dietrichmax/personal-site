import { getAllPosts, getAllNotes, getAllLinks, getAllBlogrolls, getAllRecipes } from '@/lib/data/api/cms'

export default async (_, res) => {
  const allPosts = (await getAllPosts()) || []
  const allNotes = (await getAllNotes()) || []
  const allLinks = (await getAllLinks()) || []
  const allRecipes = (await getAllRecipes()) || []


  async function getViews(slug) {
    const url = `${process.env.NEXT_PUBLIC_MATOMO_URL}/?module=API&method=Actions.getPageUrl&pageUrl=https://mxd.codes/${slug}&idSite=1&period=range&date=2011-01-01,${new Date().toISOString().slice(0,10)}&format=JSON&token_auth=${process.env.NEXT_PUBLIC_MATOMO_API_KEY}`

    const response = await fetch(url, {});
    const json = await response.json();
    return json[0].nb_visits
  }

  const allContent = []

  allPosts.map((post) => {
    allContent.push({
      title: post.title,
      slug: post.slug,
      date: post.date,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags,
      views: getViews(`articles/${post.slug}`),
      type: "article"
    })
  })


  allNotes.map((note) => {
    allContent.push({
      id: note.id,
      title: note.title,
      slug: note.id,
      coverMedium: note.coverMedium,
      date: note.date,
      content: note.content,
      category: note.category,
      ofUrl: note.ofUrl,
      syndicationLinks: note.syndicationLinks,
      type: "note"
    })
  })

  allLinks.map((link) => {
    allContent.push({
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
      date: recipe.created_at,
      content: recipe.description
    })
  })*/

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json(
    allContent
  );
};