import { fetchGET } from "@/src/utils/fetcher"
import type { NextApiRequest, NextApiResponse } from "next"
import * as qs from "qs"
import { getStravaData } from "@/src/data/external/strava"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getStravaData()

  res.status(200).json({
    strava: "test",
  })
}
