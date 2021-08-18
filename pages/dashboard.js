import React, { useState, useEffect } from "react"
import Layout from "@/components/layout/layout"
import config from "../lib/data/internal/SiteConfig"
import styled from "styled-components"
import SEO from "@/components/seo/seo"
import { useRouter } from "next/router"
import media from "styled-media-query"
import Link from "next/link"
import ReactTooltip from 'react-tooltip';
import { Button } from "@/styles/templates/button"
import {
    getMatomoActions,
    getMatomoLiveCounter,
    getMatomoPageViews,
    getMatomoAllVisits,
    getMatomoSumVisitDuration,
    getMatomoSEOStats,
    getMatomoVisitsSummary
} from "@/lib/data/external/analytics"
import {
  getPostsCount,
  getTagsCount,
  getSubscribersCount,
  getNotesCount,
  getLocationsCount,
  getActivitiesCount,
  getLinksCount,
  getPhotosCount,
  getAllActivities
} from "@/lib/data/external/cms"
import { fetchWebmentions } from "@/lib/data/external/webmentions"
import { getGitHubStats } from "@/lib/data/external/github"
import PageTitle from "@/components/title/page-title"
import codeStats from "@/lib/data/internal/count_total.json"
import SubTitle from '@/components/title/sub-title'
import { formatDistance } from 'date-fns'
import { getAllExtensions } from "showdown"

const StyledReactTooltip = styled(ReactTooltip)`
  background-color: var(--content-bg);
  color: var(--text-color);
`

const Container = styled.div`
    max-width: 1200px;
    margin: auto;
    padding-right: var(--space);
    padding-left: var(--space);
    ${media.lessThan('medium')`
        margin-left: var(--space-sm);
        margin-right: var(--space-sm);
        padding: 0;
  `}
`

const Title = styled.p`
    margin-bottom: var(--space-sm);
`

const Stats = styled.span`
    color: var(--secondary-color);
`

const GeneralStats = styled.div`
    max-width: 1200px;
    margin: var(--space-lg) auto;
    grid-template-columns: repeat(2,minmax(0,1fr));
    display: grid;
    gap: var(--space-sm);
    ${media.lessThan('1000px')`
        grid-template-columns: repeat(1,minmax(0,1fr));
    `}

`

const StatsGrid = styled.div`
    display: grid;
    gap: var(--space-sm);
    grid-template-columns: repeat(2,minmax(0,1fr));
`

const TripleStatsGrid = styled.div`
    display: grid;
    gap: var(--space-sm);
    grid-template-columns: repeat(3,minmax(0,1fr));
    max-width: 1200px;
    margin: var(--space-lg) auto;
    ${media.lessThan('1000px')`
        grid-template-columns: repeat(1,minmax(0,1fr));
    `}
`

const GridTitle = styled.p`
    grid-column: span 2/span 2;
`

const GridStats = styled.p`
    padding-top: var(--space);
    display: block;
    color: var(--secondary-color);
    font-weight: 700;
    font-size: 1.5rem;
    text-transform: capitalize;
    ${media.lessThan('1000px')`
        font-size: 1rem;
    `}
`

const GridStatsDescription = styled.p`
    display: block;
    padding-bottom: var(--space);
    text-transform: capitalize;
    font-weight: 200;
    ${media.lessThan('1000px')`
        font-size: 0.75rem;
    `}
`

const StatsSmallGrid = styled.div`
    text-align: center;
    background-color: var(--content-bg);
    border-radius: var(--space-sm);  
`

const StatsLargeGrid = styled.div`
    text-align: center;
    background-color: var(--content-bg);
    grid-column: span 2/span 2;    
    border-radius: var(--space-sm);  
    overflow: hidden;
`

const StatsGridMedium = styled.div` 
    display: grid;
    gap: var(--space-sm);
    grid-template-columns: repeat(4,minmax(0,1fr));
    grid-column: span 2/span 2;;  
    overflow: hidden;
    padding-bottom: 2rem;
`
const GridMediumTitle = styled.p`
    grid-column: span 4/span 4;
`
const BottomStatsGrid = styled.div`
    text-align: center;
    background-color: var(--content-bg);
    border-radius: var(--space-sm); 
    grid-column: span 1/span 1; ;  
    overflow: hidden;
    ${media.lessThan('1000px')`
        grid-column: span 2/span 2;
    `}

`

const ViewsContainer = styled.div`
    max-width: 1200px;
    margin: var(--space-lg) auto;
`


const RecentViewsContainer = styled.div`
    margin: 0 auto;
    height: 120px;
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

const Column = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: var(--secondary-color);
    height: ${props => (props.height ? `${props.height}px !important` : "0px")};
    border-top-right-radius: calc(var(--space-sm) * 0.5);
    border-top-left-radius: calc(var(--space-sm) * 0.5);
    :hover {
        background-color: var(--thirdy-color);
    }
`
const DateContainer = styled.div`
    margin: 0 auto var(--space) auto;
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
`

const Date = styled.p`
    font-size: .625rem;
    display: block;
    width: 100%;
    text-align: center;
`



const GitHubWrapper = styled.div`
    grid-column: span 2/span 2;
    ${media.lessThan('1000px')`
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

const GitHubDescription = styled.p`
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
const LanguageBarChild = styled.div`
    background-color: ${props =>
        props.color ? `${props.color}` : "var(--gray)"};
    height: 1.5rem;
    width: ${props => (props.width ? `${props.width}%` : "10%")};
`
const LanguageDot = styled.span`
    height: 1rem;
    width: 1rem;
    background-color: ${props =>
        props.color ? `${props.color}` : "var(--gray)"};
    border-radius: 50%;
    display: inline-block;
    margin-right: var(--space-sm);
`


export default function Dashboard({
    lastViews,
    actions,
    postsCount,
    tagsCount,
    subscribersCount,
    githubStats,
    seoStats,
    allWebmentions,
    notesCount,
    locationsCount,
    activitiesCount,
    linksCount,
    visitsSummary,
    photosCount,
    activities
}) {
    const router = useRouter()
    const [liveViews, setLiveViews] = useState(0);

    useEffect(() => {
        async function fetchLiveData() {
          const result = await getMatomoLiveCounter() || []
          setLiveViews(result[0].visits);
        };
        fetchLiveData();
    }, []);

    const { forkCount } = githubStats.user.repository
    const stars = githubStats.user.repository.stargazers.totalCount
    const githubUrl = "https://github.com/DaTurboD/"
    const forkUrl = `${githubStats.user.repository.url}/fork`
    const starUrl = githubStats.user.repository.url
    const lastModified = githubStats.user.repository.pushedAt

    const webmentionsCount = allWebmentions.length

    const linesOfCode = codeStats.SUM.code


    const α = 0.7
    const B = 100
    let pageViews = []
    let normalisedViews = []
    let recentViews = 0

    Object.entries(lastViews).forEach(value => (
        recentViews = recentViews + value[1].nb_pageviews,
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

    const getTimeOnSite = (time) => {   
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        const timeOnSite = `${minutes} min ${seconds} s`
        return timeOnSite
    }

    let distance = 0
    let duration = 0
    let averageSpeed = 0
    let maxSpeed = []
    let elevationGain = 0
    let averageWatts = 0
    let greatestElevationGain = []
    let longestRide = []
    
    activities.map((item) => {
      distance = distance + item.distance
      duration = duration + item.movingDuration
      averageSpeed = averageSpeed + item.averageSpeed
      maxSpeed.push(item.maxSpeed)
      elevationGain = elevationGain + item.elevationGain
      greatestElevationGain.push(item.elevationGain)
      longestRide.push(item.distance)
    })

    return (
        <>
            <Layout>
                {router.isFallback ? (
                    <PageTitle>{config.loading}</PageTitle>
                ) : (
                    <>
                        <SEO 
                            title="Dashboard"
                            slug="dashboard" 
                        />
                        <StyledReactTooltip />
                        <PageTitle>Dashboard</PageTitle>
                        <SubTitle>Statistics from Matomo, Strapi, Webmentions and more</SubTitle>
                        <Container>
                            <GeneralStats>
                                <StatsGrid>
                                    <GridTitle>Web Analytics</GridTitle>
                                    <StatsLargeGrid>
                                        {liveViews > 1 ? 
                                            <GridStats>{liveViews} people</GridStats> :
                                            <GridStats>You are</GridStats>
                                        }
                                        <GridStatsDescription>Visiting right Now!</GridStatsDescription>
                                    </StatsLargeGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{actions.nb_pageviews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                        <GridStatsDescription>Page Views</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{visitsSummary.nb_visits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                        <GridStatsDescription>Sessions</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{getTimeOnSite(visitsSummary.avg_time_on_site)}</GridStats>
                                        <GridStatsDescription>Avg time on site</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{visitsSummary.bounce_rate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                        <GridStatsDescription>Bounce Rate</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{(visitsSummary.sum_visit_length/60).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                        <GridStatsDescription>Min Visit duration</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{webmentionsCount}</GridStats>
                                        <GridStatsDescription>Webmentions</GridStatsDescription>
                                    </StatsSmallGrid>
                                </StatsGrid>

                                
                                <StatsGrid>
                                    <GridTitle>Content Stats</GridTitle>
                                    <Link href="/articles" passHref>
                                        <StatsLargeGrid  title="See all Articles">
                                            <GridStats>{postsCount}</GridStats>
                                            <GridStatsDescription>Articles Written</GridStatsDescription>
                                        </StatsLargeGrid>
                                    </Link>
                                    <Link href="/notes" passHref>
                                        <StatsSmallGrid title="See all Notes">
                                            <GridStats>{notesCount}</GridStats>
                                            <GridStatsDescription>Notes published</GridStatsDescription>
                                        </StatsSmallGrid>
                                    </Link>
                                    <Link href="/links" passHref>
                                        <StatsSmallGrid title="See Links">
                                            <GridStats>{linksCount}</GridStats>
                                            <GridStatsDescription>Links bookmarked</GridStatsDescription>
                                        </StatsSmallGrid>
                                    </Link>
                                    <Link href="/photos" passHref>
                                        <StatsSmallGrid title="See all Photos">
                                            <GridStats>{photosCount}</GridStats>
                                            <GridStatsDescription>Photos posted</GridStatsDescription>
                                        </StatsSmallGrid>
                                    </Link>
                                    <Link href="/topics">
                                        <StatsSmallGrid title="See all Topics">
                                            <GridStats>{tagsCount}</GridStats>
                                            <GridStatsDescription>Different Topics</GridStatsDescription>
                                        </StatsSmallGrid>
                                    </Link>
                                    <StatsSmallGrid>
                                        <GridStats>{subscribersCount}</GridStats>
                                        <GridStatsDescription>Newsletter Subscribers</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <Link href="/map" passHref>
                                        <StatsSmallGrid>
                                            <GridStats>{(locationsCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                            <GridStatsDescription>Locations tracked</GridStatsDescription>
                                        </StatsSmallGrid>
                                    </Link>
                                </StatsGrid>
                            </GeneralStats>
                                
                            <GeneralStats>
                                <StatsGridMedium>
                                    <GridMediumTitle>SEO Stats</GridMediumTitle>
                                    {seoStats.map((seo,i) => (
                                        <BottomStatsGrid key={i}>
                                            <GridStats>{seo.rank}</GridStats>
                                            <GridStatsDescription>{seo.label}</GridStatsDescription>
                                        </BottomStatsGrid>
                                    ))}
                                </StatsGridMedium>
                            </GeneralStats>

                            <ViewsContainer>
                                <Title>
                                    {recentViews} page views in the past 30 days
                                </Title>
                                <RecentViewsContainer>
                                    {pageViews.map((item, i) => (
                                        <ColumnWrapper
                                            key={i}
                                        >
                                            <Column
                                                data-tip={`${item.views} Views`}
                                                height={Math.floor(
                                                    (item.normalisedViews /
                                                        normalisedMax) *
                                                        120
                                                )}
                                            />
                                        </ColumnWrapper>
                                    ))}
                                </RecentViewsContainer>
                                <DateContainer>
                                    {pageViews.map((item, i) => (
                                        <DateWrapper key={i}>
                                            <Date title={item.date}>
                                                {item.dateShort}
                                            </Date>
                                        </DateWrapper>
                                    ))}
                                </DateContainer>
                            </ViewsContainer>


                            <TripleStatsGrid>

                                <GitHubWrapper>
                                    <Title>
                                        GitHub Repository
                                    </Title>
                                    <GitHubDescription>
                                        This site's repository has been starred <Stats>{stars}</Stats>{" "}
                                        times and forked <Stats>{forkCount}</Stats> times.
                                    </GitHubDescription>
                                    <GitHubButtonWrapper>
                                        <GitHubButtonLink
                                            href={githubUrl}
                                            title="GitHub - DaTurboD"
                                            alt="GitHub - DaTurboD"
                                        >
                                            <Button>
                                                Follow me on GitHub
                                            </Button>
                                        </GitHubButtonLink>
                                        <GitHubButtonLink
                                            href={forkUrl}
                                            title="Fork mxd-codes-frontend"
                                            alt="Fork mxd-codes-frontend"
                                        >
                                            <Button>
                                                Fork this repo
                                            </Button>
                                        </GitHubButtonLink>
                                        <GitHubButtonLink
                                            href={starUrl}
                                            title="Star mxd-codes-frontend"
                                            alt="Star mxd-codes-frontend"
                                        >
                                            <Button>
                                                Star this repo
                                            </Button>
                                        </GitHubButtonLink>
                                    </GitHubButtonWrapper>
                                </GitHubWrapper>

                            </TripleStatsGrid>

                                <LanguageContainer>
                                    <Title>
                                        Project Breakdown by Language
                                    </Title>
                                    <LanguageBar>
                                        <LanguageBarChild
                                            width={parseFloat(
                                                (codeStats.JavaScript.code /
                                                    linesOfCode) *
                                                    100
                                            ).toFixed(2)}
                                            color="#f0db4f"
                                            data-tip={`${parseFloat((codeStats.JavaScript.code / linesOfCode) * 100).toFixed(2)}% JavaScript`}
                                            style={{
                                                borderTopLeftRadius: "5px",
                                                borderBottomLeftRadius: "5px",
                                            }}
                                        />
                                        <LanguageBarChild
                                            width={parseFloat(
                                                (codeStats.JSON.code /
                                                    linesOfCode) *
                                                    100
                                            ).toFixed(2)}
                                            color="brown"
                                            data-tip={`${parseFloat((codeStats.JSON.code / linesOfCode) * 100).toFixed(2)}% JSON`}
                                        />
                                        <LanguageBarChild
                                            width={parseFloat(
                                                (codeStats.CSS.code /
                                                    linesOfCode) *
                                                    100
                                            ).toFixed(2)}
                                            color="pink"
                                            data-tip={`${parseFloat((codeStats.CSS.code / linesOfCode) * 100).toFixed(2)}% CSS`}
                                        />
                                        <LanguageBarChild
                                            width={parseFloat(
                                                (codeStats.Markdown.code /
                                                    linesOfCode) *
                                                    100
                                            ).toFixed(2)}
                                            color="var(--gray)"
                                            data-tip={`${parseFloat((codeStats.Markdown.code / linesOfCode) * 100).toFixed(2)}% Markdown`}
                                            style={{
                                                borderTopRightRadius: "5px",
                                                borderBottomRightRadius: "5px",
                                            }}
                                        />
                                    </LanguageBar>
                                    <LanguageWrapper>
                                        <LanguageColumn>
                                            <LanguageTitle>
                                                <LanguageDot color="#f0db4f"/>
                                                {parseFloat(
                                                    (codeStats.JavaScript.code /
                                                        linesOfCode) *
                                                        100
                                                ).toFixed(2)}
                                                % Javascript
                                            </LanguageTitle>
                                            <LanguageMoreStats>
                                                {codeStats.JavaScript.nFiles} files
                                            </LanguageMoreStats>
                                            <LanguageMoreStats>
                                                {codeStats.JavaScript.code.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} lines
                                            </LanguageMoreStats>
                                        </LanguageColumn>
                                        <LanguageColumn>
                                            <LanguageTitle>
                                                <LanguageDot color="brown"/>
                                                {parseFloat(
                                                    (codeStats.JSON.code /
                                                        linesOfCode) *
                                                        100
                                                ).toFixed(2)}
                                                % JSON
                                            </LanguageTitle>
                                            <LanguageMoreStats>
                                                {codeStats.JSON.nFiles} files
                                            </LanguageMoreStats>
                                            <LanguageMoreStats>
                                                {codeStats.JSON.code.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} lines
                                            </LanguageMoreStats>
                                        </LanguageColumn>
                                        <LanguageColumn>
                                            <LanguageTitle>
                                                <LanguageDot color="pink"/>
                                                {parseFloat(
                                                    (codeStats.CSS.code /
                                                        linesOfCode) *
                                                        100
                                                ).toFixed(2)}
                                                % CSS
                                            </LanguageTitle>
                                            <LanguageMoreStats>
                                                {codeStats.CSS.nFiles} file
                                            </LanguageMoreStats>
                                            <LanguageMoreStats>
                                                {codeStats.CSS.code} lines
                                            </LanguageMoreStats>
                                        </LanguageColumn>
                                        <LanguageColumn>
                                            <LanguageTitle>
                                                <LanguageDot color="var(--gray)"/>
                                                {parseFloat(
                                                    (codeStats.Markdown.code /
                                                        linesOfCode) *
                                                        100
                                                ).toFixed(2)}
                                                % Markdown
                                            </LanguageTitle>
                                            <LanguageMoreStats>
                                                {codeStats.Markdown.nFiles} file
                                            </LanguageMoreStats>
                                            <LanguageMoreStats>
                                                {codeStats.Markdown.code} lines
                                            </LanguageMoreStats>
                                        </LanguageColumn>
                                    </LanguageWrapper>
                                </LanguageContainer>

                                <GeneralStats>
                                <StatsGridMedium>
                                    <GridMediumTitle>Activity Stats</GridMediumTitle>
                                        <BottomStatsGrid title="See all Activities">
                                            <GridStats>{activitiesCount}</GridStats>
                                            <GridStatsDescription>Activities tracked</GridStatsDescription>
                                        </BottomStatsGrid>
                                        <BottomStatsGrid>
                                            <GridStats>{parseInt(distance/1000)}</GridStats>
                                            <GridStatsDescription>Total distance [km]</GridStatsDescription>
                                        </BottomStatsGrid>
                                        <BottomStatsGrid>
                                            <GridStats>{parseInt(duration/3600)}</GridStats>
                                            <GridStatsDescription>Total duration [h]</GridStatsDescription>
                                        </BottomStatsGrid>
                                        <BottomStatsGrid>
                                            <GridStats>{Math.max(...maxSpeed).toFixed(1)}</GridStats>
                                            <GridStatsDescription>Max Speed [km/h]</GridStatsDescription>
                                        </BottomStatsGrid>
                                        <BottomStatsGrid>
                                            <GridStats>{(Math.max(...longestRide)/1000).toFixed(1)}</GridStats>
                                            <GridStatsDescription>Longest ride [km]</GridStatsDescription>
                                        </BottomStatsGrid>
                                        <BottomStatsGrid>
                                            <GridStats>{(elevationGain).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                            <GridStatsDescription>Total Elevation Gain [m]</GridStatsDescription>
                                        </BottomStatsGrid>
                                        {/*<BottomStatsGrid>
                                            <GridStats>{(averageWatts/activitiesCount).toFixed(1)}</GridStats>
                                            <GridStatsDescription>Average Watts</GridStatsDescription>
                                        </BottomStatsGrid>*/}
                                        <BottomStatsGrid>
                                            <GridStats>{(averageSpeed/activitiesCount).toFixed(1)}</GridStats>
                                            <GridStatsDescription>Average speed [km/h]</GridStatsDescription>
                                        </BottomStatsGrid>
                                </StatsGridMedium>
                            </GeneralStats>

                        {/*Check out how this site is built: <a href="https://github.com/DaTurboD/mxd-codes-frontend/blob/v2/pages/site-stats.js">site-stats.js</a>*/}
                        </Container>
                    </>
                )}
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const postsCount = (await getPostsCount()) || []
    const tagsCount = (await getTagsCount()) || []
    const subscribersCount = (await getSubscribersCount()) || []
    const notesCount = (await getNotesCount()) || []
    const photosCount = (await getPhotosCount()) || []
    const activitiesCount = await getActivitiesCount()
    const locationsCount = (await getLocationsCount()) || []
    const linksCount = (await getLinksCount()) || []
    const lastViews = (await getMatomoPageViews()) || []
    const actions = (await getMatomoActions()) || []
    const githubStats = (await getGitHubStats()) || []
    const allVisits = (await getMatomoAllVisits()) || []
    const visitDuration = (await getMatomoSumVisitDuration()) || []
    const allWebmentions = (await fetchWebmentions()) || []
    const seoStats = (await getMatomoSEOStats()) || []
    const visitsSummary = (await getMatomoVisitsSummary()) || []
    const activities = (await getAllActivities()) || []
    
    return {
        revalidate:  86400,
        props: {
            lastViews,
            actions,
            postsCount,
            tagsCount,
            subscribersCount,
            notesCount,
            activitiesCount,
            locationsCount,
            linksCount,
            githubStats,
            allVisits,
            visitDuration,
            allWebmentions,
            seoStats,
            visitsSummary,
            photosCount,
            activities
        },
    }
}
