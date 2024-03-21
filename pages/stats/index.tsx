import Layout from "@/components/layout/layout"
import styled from "styled-components"
import SEO from "@/components/seo/seo"
import media from "styled-media-query"
import Link from "next/link"
import { Button } from "@/styles/templates/button"
import { Client } from "pg"
import {
  getMatomoActions,
  getMatomoPageViews,
  getMatomoSumVisitDuration,
  getMatomoVisitsSummary,
  getMatomoTopPageUrls,
  getMatomoConsent,
  getBiggestTrafficSource,
} from "@/src/data/external/analytics"
import { fetchWebmentions } from "@/src/data/external/webmentions"
import { getGitHubStats } from "@/src/data/external/github"
import PageTitle from "@/components/title/page-title"
import SubTitle from "@/components/title/sub-title"
import { useEffect, useState } from "react"
import { fetchGET } from "@/src/utils/fetcher"

const viewsBarHeight: number = 200

const Container = styled.div`
  max-width: var(--width-container);
  margin: auto;
  padding-right: var(--space);
  padding-left: var(--space);
  ${media.lessThan("medium")`
      margin-left: var(--space-sm);
        margin-right: var(--space-sm);
        padding: 0;
  `}
`

const Title = styled.p`
  margin-bottom: var(--space-sm);
  font-size: 1.5rem;
  font-weight: 600;
`

const Stats = styled.span`
  color: var(--secondary-color);
`

const GeneralStats = styled.div`
  max-width: 1200px;
  margin: var(--space-lg) auto;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  display: grid;
  gap: var(--space-sm);
  ${media.lessThan("large")`
    grid-template-columns: repeat(1,minmax(0,1fr));
  `}
`

const StatsGrid = styled.div`
  display: grid;
  gap: var(--space-sm);
  grid-template-columns: repeat(2, minmax(0, 1fr));
`

const TripleStatsGrid = styled.div`
  display: grid;
  gap: var(--space-sm);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  max-width: 1200px;
  margin: var(--space-lg) auto;
  ${media.lessThan("large")`
    grid-template-columns: repeat(1,minmax(0,1fr));
  `}
`

const GridStats = styled.p`
  padding-top: var(--space);
  display: block;
  color: var(--secondary-color);
  font-weight: 700;
  font-size: 1.5rem;
  text-transform: capitalize;
  ${media.lessThan("large")`
    font-size: 1rem;
  `}
`

const GridStatsDescription = styled.p`
  display: block;
  padding-bottom: var(--space);
  text-transform: capitalize;
  font-weight: 200;
  ${media.lessThan("large")`
    font-size: 0.75rem;
  `}
`

const StatsSmallGrid = styled.div`
  text-align: center;
  background-color: var(--content-bg);
  border-radius: 6px;
  box-shadow: var(--box-shadow);
`

const StatsLargeGrid = styled.div`
  text-align: center;
  background-color: var(--content-bg);
  grid-column: span 2 / span 2;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
`

const StatsGridMedium = styled.div`
  display: grid;
  gap: var(--space-sm);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-column: span 2 / span 2;
  overflow: hidden;
  padding-bottom: 2rem;
`
const GridMediumTitle = styled.p`
  grid-column: span 4 / span 4;
  font-size: 1.5rem;
  font-weight: 600;
`
const BottomStatsGrid = styled.div`
  text-align: center;
  background-color: var(--content-bg);
  border-radius: var(--space-sm);
  grid-column: span 1 / span 1;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  ${media.lessThan("large")`
    grid-column: span 2/span 2;
  `}
`

const ViewsContainer = styled.div`
  max-width: 1200px;
  margin: var(--space-lg) auto;
`

const RecentViewsContainer = styled.div`
  margin: 0 auto;
  height: ${viewsBarHeight}px;
  justify-content: center;
  display: flex;
`

const ColumnWrapper = styled.div`
  position: relative;
  margin-right: calc(var(--space-sm) * 0.3);
  width: 100%;
  border-top-right-radius: calc(var(--space-sm) * 0.5);
  border-top-left-radius: calc(var(--space-sm) * 0.5);
`

const ColumnTooltipText = styled.div`
  visibility: hidden;
  width: 150px;
  padding: 0.5rem;
  background-color: var(--content-bg);
  color: var(--text-color);
  text-align: center;
  border-radius: var(--border-radius);
  position: absolute;
  top: -40px;
  left: 10px;
  z-index: 1000;
  ${media.lessThan("large")`
    display: none;
  `}
`

interface ColumnProps {
  height: number
}

const Column = styled.div<ColumnProps>`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--secondary-color);
  height: ${(props) => (props.height ? `${props.height}px !important` : "0px")};
  border-top-right-radius: calc(var(--space-sm) * 0.5);
  border-top-left-radius: calc(var(--space-sm) * 0.5);
  &:hover {
    background-color: var(--primary-color);
    ${ColumnTooltipText} {
      visibility: visible;
    }
  }
`

const DateContainer = styled.div`
  margin: 0.15rem auto var(--space) auto;
  justify-content: center;
  display: flex;
  ${media.lessThan("large")`
    display: none;
  `}
`

const DateWrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
  margin-right: calc(var(--space-sm) * 0.3);
`

const DateContent = styled.p`
  font-size: 0.625rem;
  display: block;
  width: 100%;
  text-align: center;
`

const GitHubWrapper = styled.div`
  grid-column: span 2 / span 2;
  ${media.lessThan("large")`
    grid-column: span 1/span 1;
  `}
`

const GitHubButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const GitHubButtonLink = styled.a`
  margin-right: var(--space);
  margin-top: var(--space-sm);
`

const LanguageContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  margin: var(--space-lg) auto;
`

const LanguageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const LanguageColumn = styled.div`
  margin-right: calc(var(--space-lg) * 1.5);
  margin-bottom: var(--space);
`

const LanguageTitle = styled.p`
  display: block;
  font-weight: bold;
  font-size: 1rem;
`
const LanguageMoreStats = styled.a`
  display: block;
  margin-left: 2rem;
  font-size: 1rem;
`

const LanguageBar = styled.div`
  height: 1.5rem;
  display: flex;
  margin-bottom: var(--space);
`

interface LanguageBarChildProps {
  color: string
  width: string
}

const LanguageBarChild = styled.div<LanguageBarChildProps>`
  background-color: ${(props) =>
    props.color ? `${props.color}` : "var(--gray)"};
  height: 1.5rem;
  width: ${(props) => (props.width ? `${props.width}%` : "10%")};
`
const LanguageDot = styled.span`
  height: 1rem;
  width: 1rem;
  background-color: ${(props) =>
    props.color ? `${props.color}` : "var(--gray)"};
  border-radius: 50%;
  display: inline-block;
  margin-right: var(--space-sm);
`

const TopPageList = styled.ul`
  padding-inline-start: var(--space-sm);
`

const TopPageListItemLink = styled.a`
  text-decoration: none;
  box-shadow: 0px -3px 0px 0px var(--secondary-color) inset;
  transition: box-shadow 150ms ease-in-out;
  color: var(--text-color);
  cursor: pointer;
  &:hover {
    box-shadow: 0px -18px 0px 0px var(--secondary-color) inset;
  }
`

interface Dashboard {
  lastViews: unknown
  actions: any
  githubStats: any
  allWebmentions: Array<object>
  locationsCount: number
  visitsSummary: any
  activities: [
    {
      distance: number
      duration: number
      maxSpeed: number
      maxDistance: number
      maxElevationGain: number
      totalElevationGain: number
      jumpCount: number
      elevationGain: number
      movingDuration: number
    },
  ]
  topPosts: any
  consentCount: any
  biggestTrafficSource: any
}

interface Stats {
  cms: {
    thanks: number
    subscribersCount: number
    pagesCount: number
    postsCount: number
    linksCount: number
    photosCount: number
    commentsCount: number
    topicsCount: number
    activitiesCount: number
  }
  analytics: {
    currentVisitors: number
  }
}

export default function Dashboard({
  lastViews,
  actions,
  githubStats,
  allWebmentions,
  locationsCount,
  visitsSummary,
  topPosts,
  consentCount,
  biggestTrafficSource,
}: Dashboard) {
  const [stats, setStats] = useState<Stats>({
    cms: {
      thanks: 0,
      subscribersCount: 0,
      pagesCount: 0,
      postsCount: 0,
      linksCount: 0,
      photosCount: 0,
      commentsCount: 0,
      topicsCount: 0,
      activitiesCount: 0,
    },
    analytics: {
      currentVisitors: 0,
    },
  })

  const { forkCount } = githubStats.user.repository
  const stars: number = githubStats.user.repository.stargazers.totalCount
  const githubUrl: string = "https://github.com/dietrichmax"
  const forkUrl: string = `${githubStats.user.repository.url}/fork`
  const starUrl: string = githubStats.user.repository.url
  const repositoryCreatedAt: string = new Date(githubStats.user.repository.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  const repositoryPushedAt: string = new Date(githubStats.user.repository.pushedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })

  //.toLocaleDateString("en-US")
  /*const mostViewedPosts = []
  function getMostViewedPosts(topPosts) {
    async function getPostAttributes(post) {
      const postAttributes = await fetchStrapiAPI(
        {
          filters: {
            slug: {
              $eq: post.label.replace("/articles/",""),
            },
          },
          fields: [
            "title",
            "slug",
            "updatedAt",
            "createdAt",
            "description",
          ],
        },
        "posts"
      )
    return postAttributes[0]
  }
    topPosts.map(post => {
      const attributes = getPostAttributes(post)
      mostViewedPosts.push(attributes)
    })
      
  }*/

  const webmentionsCount: number = allWebmentions.length

  const α: number = 1.1
  const B: number = 100
  let pageViews = []
  let normalisedViews = []
  let recentViews = 0

  Object.entries(lastViews).forEach(
    (value) => (
      value[1].nb_pageviews
        ? (recentViews = recentViews + value[1].nb_pageviews)
        : null,
      pageViews.push({
        date: value[0],
        dateShort: value[0].substring(8),
        views: isNaN(value[1].nb_pageviews) ? 0 : value[1].nb_pageviews,
        normalisedViews:
          (1 - α) * isNaN(value[1].nb_pageviews)
            ? 0
            : value[1].nb_pageviews + α * B,
      }),
      normalisedViews.push(
        (1 - α) * isNaN(value[1].nb_pageviews)
          ? 0
          : value[1].nb_pageviews + α * B
      )
    )
  )
  const normalisedMax = Math.max.apply(Math, normalisedViews)

  const getTimeOnSite = (time: number) => {
    const minutes: number = Math.floor(time / 60)
    const seconds: number = time - minutes * 60
    const timeOnSite: string = `${minutes} min ${seconds} s`
    return timeOnSite
  }

  let distance: number = 0
  let duration: number = 0
  let maxSpeed: Array<number> = []
  let maxElevationGain: Array<number> = []
  let maxDistance: Array<number> = []
  let totalElevationGain: number = 0
  let jumpCount: number = 0

  /*activities.map((item) => {
    distance = distance + item.distance
    duration = duration + item.movingDuration
    maxSpeed.push(item.maxSpeed)
    maxDistance.push(item.distance)
    maxElevationGain.push(item.elevationGain)
    totalElevationGain = totalElevationGain + item.elevationGain
    jumpCount = jumpCount + item.jumpCount
  })*/

  const consentTrue = consentCount
    ? consentCount.find((element: any) => element.label === "consent - true")
    : 0

  const consentFalse = consentCount
    ? consentCount.find((element: any) => element.label === "consent - false")
    : 0

  async function getStats() {
    const res = await fetchGET("/api/stats")
    setStats(res)
  }

  useEffect(() => {
    getStats()
  }, [])

  return (
    <Layout>
      <SEO
        title="Site Stats"
        slug="stats"
        description="Statistics from Matomo, Strapi, Webmentions and more"
      />
      <PageTitle>Site Stats</PageTitle>
      <SubTitle>Statistics from Matomo, Strapi, Webmentions and more</SubTitle>
      <Container>
        <GeneralStats>
          <StatsGrid>
            <Title>Web Analytics</Title>
            <StatsLargeGrid>
              <GridStats>{stats.analytics.currentVisitors}</GridStats>
              <GridStatsDescription>
                Visitors in the last 5 minutes
              </GridStatsDescription>
            </StatsLargeGrid>
            <StatsSmallGrid>
              <GridStats>
                {actions.nb_pageviews
                  ? actions.nb_pageviews.toLocaleString("en")
                  : "-"}
              </GridStats>
              <GridStatsDescription>Page Views</GridStatsDescription>
            </StatsSmallGrid>
            <StatsSmallGrid>
              <GridStats>
                {visitsSummary.nb_visits
                  ? visitsSummary.nb_visits.toLocaleString("en")
                  : "-"}
              </GridStats>
              <GridStatsDescription>Sessions</GridStatsDescription>
            </StatsSmallGrid>
            <StatsSmallGrid>
              <GridStats>
                {visitsSummary.avg_time_on_site
                  ? getTimeOnSite(visitsSummary.avg_time_on_site)
                  : "-"}
              </GridStats>
              <GridStatsDescription>Avg time on site</GridStatsDescription>
            </StatsSmallGrid>
            <StatsSmallGrid>
              <GridStats>
                {visitsSummary.bounce_rate
                  ? visitsSummary.bounce_rate.toLocaleString("en")
                  : "-"}
              </GridStats>
              <GridStatsDescription>Bounce Rate</GridStatsDescription>
            </StatsSmallGrid>
            <StatsSmallGrid>
              <GridStats>
                {visitsSummary.sum_visit_length
                  ? (visitsSummary.sum_visit_length / 60)
                      .toFixed(0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : "-"}
              </GridStats>
              <GridStatsDescription>Min Visit duration</GridStatsDescription>
            </StatsSmallGrid>
            <StatsSmallGrid>
              <GridStats>{biggestTrafficSource[0].label}</GridStats>
              <GridStatsDescription>Top Traffic source</GridStatsDescription>
            </StatsSmallGrid>
          </StatsGrid>

          <StatsGrid>
            <Title>Content Stats</Title>
            <Link href="/articles" passHref legacyBehavior>
              <StatsLargeGrid title="See all Articles">
                <GridStats>{stats.cms.postsCount}</GridStats>
                <GridStatsDescription>Articles Written</GridStatsDescription>
              </StatsLargeGrid>
            </Link>
            <Link href="/links" passHref legacyBehavior>
              <StatsSmallGrid title="See Links">
                <GridStats>{stats.cms.linksCount}</GridStats>
                <GridStatsDescription>Links bookmarked</GridStatsDescription>
              </StatsSmallGrid>
            </Link>
            <Link href="/photos" passHref legacyBehavior>
              <StatsSmallGrid title="See all Photos">
                <GridStats>{stats.cms.photosCount}</GridStats>
                <GridStatsDescription>Photos posted</GridStatsDescription>
              </StatsSmallGrid>
            </Link>
            <Link href="/topics" legacyBehavior>
              <StatsSmallGrid title="See all Topics">
                <GridStats>{stats.cms.topicsCount}</GridStats>
                <GridStatsDescription>Different Topics</GridStatsDescription>
              </StatsSmallGrid>
            </Link>
            <StatsSmallGrid>
              <GridStats>{stats.cms.subscribersCount}</GridStats>
              <GridStatsDescription>
                Newsletter Subscribers
              </GridStatsDescription>
            </StatsSmallGrid>
            <Link href="/map" passHref legacyBehavior>
              <StatsSmallGrid>
                <GridStats>
                  {Number(locationsCount).toLocaleString("en")}
                </GridStats>
                <GridStatsDescription>Locations tracked</GridStatsDescription>
              </StatsSmallGrid>
            </Link>
            <StatsSmallGrid>
              <GridStats>{stats.cms.commentsCount}</GridStats>
              <GridStatsDescription>Comments posted</GridStatsDescription>
            </StatsSmallGrid>
          </StatsGrid>
        </GeneralStats>

        <GeneralStats>
          <StatsGridMedium>
            <GridMediumTitle>Interactions</GridMediumTitle>
            <BottomStatsGrid>
              <GridStats>{consentTrue.nb_events}</GridStats>
              <GridStatsDescription>Cookie consent given</GridStatsDescription>
            </BottomStatsGrid>
            <BottomStatsGrid>
              <GridStats>{consentFalse.nb_events}</GridStats>
              <GridStatsDescription>Cookie consent denied</GridStatsDescription>
            </BottomStatsGrid>
            <BottomStatsGrid>
              <GridStats>{stats.cms.thanks}</GridStats>
              <GridStatsDescription>Virtual Thanks</GridStatsDescription>
            </BottomStatsGrid>
            <BottomStatsGrid>
              <GridStats>{webmentionsCount}</GridStats>
              <GridStatsDescription>Webmentions</GridStatsDescription>
            </BottomStatsGrid>
          </StatsGridMedium>
        </GeneralStats>

        <ViewsContainer>
          <Title>
            {recentViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} page
            views in the past 30 days
          </Title>
          <RecentViewsContainer>
            {pageViews.map((item, i) => (
              <ColumnWrapper key={i}>
                <Column
                  height={Math.floor(
                    (item.normalisedViews / normalisedMax) * viewsBarHeight
                  )}
                >
                  <ColumnTooltipText>{`${item.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Views`}</ColumnTooltipText>
                </Column>
              </ColumnWrapper>
            ))}
          </RecentViewsContainer>
          <DateContainer>
            {pageViews.map((item, i) => (
              <DateWrapper key={i}>
                <DateContent title={item.date}>{item.dateShort}</DateContent >
              </DateWrapper>
            ))}
          </DateContainer>
        </ViewsContainer>

        <div>
          <Title>Most visited posts of all time</Title>
          <TopPageList>
            {topPosts.map((post, i: number) => (
              <li key={i}>
                <span>
                  {post.nb_hits
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  views:{" "}
                </span>
                <Link href={post.label} passHref legacyBehavior>
                  <TopPageListItemLink title={post.label}>
                    {post.label}
                  </TopPageListItemLink>
                </Link>
              </li>
            ))}
          </TopPageList>
        </div>
        <TripleStatsGrid>
          <GitHubWrapper>
            <Title>GitHub Repository</Title>
            <p>
              This site's repository has been starred <Stats>{stars}</Stats>{" "}
              times and forked <Stats>{forkCount}</Stats> times since {repositoryCreatedAt}. <br/> The last push is from {repositoryPushedAt}.
            </p>
            <GitHubButtonWrapper>
              <GitHubButtonLink href={githubUrl} title="GitHub - DaTurboD">
                <Button>Follow me on GitHub</Button>
              </GitHubButtonLink>
              <GitHubButtonLink href={forkUrl} title="Fork mxd-codes-frontend">
                <Button>Fork this repo</Button>
              </GitHubButtonLink>
              <GitHubButtonLink href={starUrl} title="Star mxd-codes-frontend">
                <Button>Star this repo</Button>
              </GitHubButtonLink>
            </GitHubButtonWrapper>
          </GitHubWrapper>
        </TripleStatsGrid>

        {/*<GeneralStats>
          <StatsGridMedium>
            <GridMediumTitle>Activity Stats</GridMediumTitle>
            <BottomStatsGrid title="See all Activities">
              <GridStats>{activitiesCount}</GridStats>
              <GridStatsDescription>Activities tracked</GridStatsDescription>
            </BottomStatsGrid>
            <BottomStatsGrid>
              <GridStats>{(distance / 1000).toFixed(0)}</GridStats>
              <GridStatsDescription>Total distance [km]</GridStatsDescription>
            </BottomStatsGrid>
            <BottomStatsGrid>
              <GridStats>
                {totalElevationGain
                  .toFixed(0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </GridStats>
              <GridStatsDescription>
                Total Elevation Gain [m]
              </GridStatsDescription>
            </BottomStatsGrid>
            <BottomStatsGrid>
              <GridStats>{(duration / 3600).toFixed(0)}</GridStats>
              <GridStatsDescription>Total duration [h]</GridStatsDescription>
            </BottomStatsGrid>
            <BottomStatsGrid>
              <GridStats>{jumpCount}</GridStats>
              <GridStatsDescription>Jump Count</GridStatsDescription>
            </BottomStatsGrid>
            <BottomStatsGrid>
              <GridStats>{(Math.max(...maxDistance) / 1000).toFixed(0)}</GridStats>
              <GridStatsDescription>Max Distance [km]</GridStatsDescription>
            </BottomStatsGrid>
            <BottomStatsGrid>
              <GridStats>{(Math.max(...maxElevationGain)).toFixed(0)}</GridStats>
              <GridStatsDescription>
                Max Elevation Gain [m]
              </GridStatsDescription>
            </BottomStatsGrid>
            <BottomStatsGrid>
              <GridStats>{(Math.max(...maxSpeed)).toFixed(0)}</GridStats>
              <GridStatsDescription>Max speed [km/h]</GridStatsDescription>
            </BottomStatsGrid>
          </StatsGridMedium>
                </GeneralStats>*/}

        {/*Check out how this site is built: <a href="https://github.com/DaTurboD/mxd-codes-frontend/blob/v2/pages/site-stats.js">site-stats.js</a>*/}
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const lastViews: unknown = (await getMatomoPageViews()) || []
  const actions = (await getMatomoActions()) || []
  const githubStats = (await getGitHubStats()) || []
  const visitDuration = (await getMatomoSumVisitDuration()) || []
  const allWebmentions = (await fetchWebmentions()) || []
  const visitsSummary = (await getMatomoVisitsSummary()) || []
  const topPosts = (await getMatomoTopPageUrls()) || []
  const consentCount: number = (await getMatomoConsent()) || []
  const biggestTrafficSource = (await getBiggestTrafficSource()) || []

  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  })
  await client.connect()
  const locationsCount = await client.query("SELECT COUNT(*) FROM locations;")
  await client.end()

  return {
    revalidate: 86400,
    props: {
      lastViews,
      actions,
      locationsCount: locationsCount.rows[0].count,
      githubStats,
      visitDuration,
      allWebmentions,
      visitsSummary,
      topPosts,
      consentCount,
      biggestTrafficSource,
    },
  }
}
