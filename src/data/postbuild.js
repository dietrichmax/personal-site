async function main({ source, target, endpoint }) {
  const endpoint = "https://webmention.io/mxd.codes/webmention"
  async function sendData() {
    const res = await fetch(endpoint, {
      method: "post",
      body: `source=${encodeURIComponent(source)}&target=${encodeURIComponent(
        target
      )}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    })
    const json = await res.json()
    if (json.error) {
      setStatus(json.error)
    }
    setStatus(json.statusText)
  }
  sendData()
}
sendWebmention()
