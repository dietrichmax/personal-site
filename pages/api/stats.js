import React, { useState, useEffect } from "react"
import {
  getPostsCount,
  getTagsCount,
  getSubscribersCount,
  getNotesCount,
  getLocationsCount,
  getActivitiesCount,
  getLinksCount,
  getAllActivities
} from "src/data/external/cms"
import {
    getMatomoActions,
    getMatomoLiveCounter,
    getMatomoPageViews,
    getMatomoAllVisits,
    getMatomoSumVisitDuration,
    getMatomoSEOStats,
    getMatomoVisitsSummary,
    getMatomoConsentEvent
} from "src/data/external/analytics"

export default async (_, res) => {

  const postsCount = (await getPostsCount()) || []
  const tagsCount = (await getTagsCount()) || []
  const notesCount = (await getNotesCount()) || []
  const linksCount = (await getLinksCount()) || []
  const locationsCount = (await getLocationsCount()) || []
  const activitiesCount = await getActivitiesCount()
  const subscribersCount = (await getSubscribersCount()) || []
  const activities = (await getAllActivities()) || []
  const lastViews = (await getMatomoPageViews()) || []

  let distance = 0
  let duration = 0
  let averageSpeed = 0
  let maxSpeed = []
  let elevationGain = 0
  let jumpCount = 0
  
  activities.map((item) => {
    distance = distance + item.distance
    duration = duration + item.duration
    averageSpeed = averageSpeed + item.averageSpeed
    maxSpeed.push(item.maxSpeed)
    elevationGain = elevationGain + item.elevationGain
    jumpCount = jumpCount + item.jumpCount
  })

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=120, stale-while-revalidate=60'
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
    },
    activities: {
      distance: parseInt(distance/1000),
      duration: parseInt(duration/3600),
      averageSpeed: (averageSpeed/activitiesCount).toFixed(2),
      maxSpeed: Math.max(maxSpeed).toFixed(2),
      elevationGain: parseInt(elevationGain),
      jumpCount: jumpCount

    }
  });
};