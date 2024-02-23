import strava from "strava-v3"

strava.config({
  access_token: process.env.STRAVA_ACCESS_TOKEN, //"Your apps access token (Required for Quickstart)",
  client_id: process.env.STRAVA_CLIENT_ID, //"Your apps Client ID (Required for oauth)",
  client_secret: process.env.STRAVA_CLIENT_SECRET, //"Your apps Client Secret (Required for oauth)",
  redirect_uri: process.env.STRAVA_REDIRECT_URI, //"Your apps Authorization Redirection URI (Required for oauth)",
})

export async function getStravaData() {
  const payload = await strava.athlete.listActivities({
    access_token: process.env.STRAVA_ACCESS_TOKEN,
  })
  console.log(payload)
  return payload
}

/*export async function fetchStravaAPI(query: string, { constiables } = {}) {
  const res = await fetch(`https://www.strava.com/api/v3/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa("login:password"),
    },
    cache: "force-cache",
    body: JSON.stringify({
      query,
      constiables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json.data
}*/
