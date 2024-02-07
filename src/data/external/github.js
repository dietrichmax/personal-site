export async function getGitHubStats() {
  const headers = {
    Authorization: `bearer ${process.env.DASHBOARD_GITHUB_PAK}`,
  }
  const body = {
    query: `query {
                user(login: "dietrichmax") {
                  name
                  repository(name: "mxd-codes-frontend") {
                        id
                        createdAt
                        url
                        forkCount
                        stargazers {
                            totalCount
                        }
                        pushedAt
                      }
                    }
                }`,
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
    cache: 'force-cache'
  })
  const data = await response.json()
  return data.data
}
