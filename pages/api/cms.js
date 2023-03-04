export default async (req, res) => {
  const cmsURL = process.env.NEXT_PUBLIC_PRIVATE_STRAPI_API_URL
  const path = req.url.replace("api/cms?_", "")
  const url = new URL(cmsURL + path)

  switch (req.method) {
    case "GET":
      const fetchResponse = await fetch(url.href, {
        method: req.method,
        headers: { "Content-Type": "application/json" },
      })
      const fetchData = await fetchResponse.json()
      //console.log(data)
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=604800, stale-while-revalidate=86400"
      )
      return res.status(200).json(fetchData)

    case "PUT":
      const putResponse = await fetch(url.href, {
        method: req.method,
        headers: { "Content-Type": "application/json" },
        ...req.body,
      })
      if (putResponse) {
        return res.status(200).json({ ok: true })
      } else {
        return res.status(500).json({ Error: "Couldn't get data" })
      }
    case "POST":
      const postReponse = await fetch(url.href, {
        method: req.method,
        headers: { "Content-Type": "application/json" },
        ...req.body,
      })
      if (postReponse) {
        return res.status(200).json({ ok: true })
      } else {
        return res.status(500).json({ Error: "Couldn't get data" })
      }
  }
}
