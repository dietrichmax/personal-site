export async function fetchStravaAPI(query: string, { variables } = {}) {
  const res = await fetch(`https://www.strava.com/api/v3/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa("login:password"),
    },
    cache: "force-cache",
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch STRAPI API")
  }

  return json.data
}