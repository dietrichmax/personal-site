export async function fetchGET(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPOST(url, body) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export async function fetchPUT(url, body) {
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
