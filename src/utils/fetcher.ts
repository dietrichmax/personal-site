export async function fetchGET(url: string) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    })
    const json = await res.json()
    return json
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPOST(url: string, body: JSON) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const json = await res.json()
    return json
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPUT(url: string, body: JSON) {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    return res.json()
  } catch (error) {
    console.error(error)
  }
}
