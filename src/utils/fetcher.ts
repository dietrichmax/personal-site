interface FetchOptions {
  parameter?: string
  headers?: any
  cache?: RequestCache
}

export async function fetchGET(url: string, options?: FetchOptions) {
  const method = options && options.parameter ? options.parameter : "GET"
  const headers =
    options && options.headers
      ? options.headers
      : {
          "Content-Type": "application/json",
        }
  const cache = options && options.cache ? options.cache : "force-cache"
  try {
    const res: Response = await fetch(url, {
      method: method,
      headers: headers,
      cache: cache,
      next: { revalidate: 86400 },
    })
    const json = await res.json()
    return json
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPOST(
  url: string,
  body: JSON,
  options?: FetchOptions
) {
  const method = options && options.parameter ? options.parameter : "POST"
  const headers =
    options && options.headers
      ? options.headers
      : { "Content-Type": "application/json" }
  try {
    const res: Response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    })
    const json = await res.json()
    return json
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPUT(
  url: string,
  body: JSON,
  options?: FetchOptions
) {
  const method = options && options.parameter ? options.parameter : "PUT"
  const headers =
    options && options.headers
      ? options.headers
      : { "Content-Type": "application/json" }
  try {
    const res: Response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    })
    return res.json()
  } catch (error) {
    console.error(error)
  }
}
