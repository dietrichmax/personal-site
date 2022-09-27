import React, { useState, useEffect } from "react"
import {
  getPostsCount,
  getPhotosCount,
  getTagsCount,
  getSubscribersCount,
  getNotesCount,
  getLocationsCount,
  getActivitiesCount,
  getLinksCount,
  getAllActivities,
  getThanks,
} from "src/data/external/cms"
import {
  getMatomoActions,
  getMatomoLiveCounter,
  getMatomoPageViews,
  getMatomoSumVisitDuration,
  getMatomoSEOStats,
  getMatomoVisitsSummary,
  getMatomoTopPageUrls,
  getMatomoConsent,
  getBiggestTrafficSource,
} from "@/src/data/external/analytics"
import { fetchWebmentions } from "@/src/data/external/webmentions"
import { getGitHubStats } from "@/src/data/external/github"

export default async (_, res) => {
  "Matomo"
  const lastViews = (await getMatomoPageViews()) || []
  const actions = (await getMatomoActions()) || []
  const visitDuration = (await getMatomoSumVisitDuration()) || []
  const seoStats = (await getMatomoSEOStats()) || []
  const visitsSummary = (await getMatomoVisitsSummary()) || []
  const liveViews = (await getMatomoLiveCounter()) || []
  const consentCount = (await getMatomoConsent()) || []
  const biggestTrafficSource = (await getBiggestTrafficSource()) || []

  ;("Github")
  const githubStats = (await getGitHubStats()) || []
  const { forkCount } = githubStats.user.repository
  const stars = githubStats.user.repository.stargazers.totalCount

  ;("Webmentions")
  const allWebmentions = (await fetchWebmentions()) || []
  const webmentionsCount = allWebmentions.length

  ;("Activities")
  const activities = (await getAllActivities()) || []
  let distance = 0
  let duration = 0
  let averageSpeed = 0
  let maxSpeed = []
  let elevationGain = 0
  let jumpCount = 0
  let topPosts = []

  activities.map((item) => {
    distance = distance + item.distance
    duration = duration + item.duration
    averageSpeed = averageSpeed + item.averageSpeed
    maxSpeed.push(item.maxSpeed)
    elevationGain = elevationGain + item.elevationGain
    jumpCount = jumpCount + item.jumpCount
  })
  ;("Top Pages")
  const topPageUrls = (await getMatomoTopPageUrls()) || []
  topPageUrls.map((post) => {
    topPosts.push({
      label: post.label,
      views: post.nb_hits,
      url: post.url,
    })
  })
  ;("Posts")
  const postsCount = (await getPostsCount()) || []
  const photosCount = (await getPhotosCount()) || []
  const tagsCount = (await getTagsCount()) || []
  const notesCount = (await getNotesCount()) || []
  const linksCount = (await getLinksCount()) || []
  const locationsCount = (await getLocationsCount()) || []
  const activitiesCount = await getActivitiesCount()
  const subscribersCount = (await getSubscribersCount()) || []
  const thanksCount = (await getThanks()) || []

  const posts = {
    count: {
      posts: postsCount,
      tags: tagsCount,
      notes: notesCount,
      photos: photosCount,
      links: linksCount,
      activities: activitiesCount,
      subscribers: subscribersCount,
      locations: locationsCount,
      thanks: thanksCount,
    },
    topPosts: topPosts,
  }

  const consentTrue = consentCount.find(
    (element) => element.label === "consent - true"
  ).nb_events
  const consentFalse = consentCount.find(
    (element) => element.label === "consent - false"
  ).nb_events

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=60"
  )

  return res.status(200).json({
    posts,
    activities: {
      distance: parseInt(distance / 1000),
      duration: parseInt(duration / 3600),
      averageSpeed: (averageSpeed / activitiesCount).toFixed(2),
      maxSpeed: Math.max(maxSpeed).toFixed(2),
      elevationGain: parseInt(elevationGain),
      jumpCount: jumpCount,
    },
    analytics: {
      matomo: {
        recentViews: lastViews,
        actions: actions,
        visitDuration: visitDuration,
        seoStats: seoStats,
        visitsSummary: visitsSummary,
        liveViews: liveViews,
        cookieConsent: {
          acceptedCount: consentTrue,
          deniedCount: consentFalse,
        },
        biggestTrafficSource: biggestTrafficSource,
      },
      github: {
        stars: stars,
        forks: forkCount,
      },
      webmentions: {
        webmentionCount: webmentionsCount,
      },
    },
  })
}
