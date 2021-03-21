import {
  getPostsCount,
  getTagsCount,
  getSubscribersCount,
  getNotesCount,
  getLocationsCount,
  getActivitiesCount,
  getLinksCount,
} from "@/lib/data/api/cms"

export default async (_, res) => {
  const postsCount = (await getPostsCount()) || []
  const tagsCount = (await getTagsCount()) || []
  const notesCount = (await getNotesCount()) || []
  const linksCount = (await getLinksCount()) || []
  const locationsCount = (await getLocationsCount()) || []
  const activitiesCount = await getActivitiesCount()
  const subscribersCount = (await getSubscribersCount()) || []


  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    posts: {
      count: {
        posts: postsCount,
        tags: tagsCount,
        notes: notesCount,
        links: linksCount,
        activities: activitiesCount,
        subscribers: subscribersCount,
        locations: locationsCount,
      }
    }
  });
};