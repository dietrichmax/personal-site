export async function getGitHubStats() {
    const headers = { Authorization: `bearer ${process.env.GITHUB_PAK}` }
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
    })
    const data = await response.json()
    const { forkCount } = data.data.user.repository
    const stars = data.data.user.repository.stargazers.totalCount
    return data.data
}
