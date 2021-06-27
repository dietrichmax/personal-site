import React, { useState, useEffect } from "react"
import Layout from "@/components/layout/layout"
import config from "../lib/data/SiteConfig"
import styled from "styled-components"
import SEO from "@/components/seo/seo"
import { useRouter } from "next/router"
import media from "styled-media-query"
import Link from "next/link"
import ReactTooltip from 'react-tooltip';
import {
    getMatomoActions,
    getMatomoLiveCounter,
    getMatomoPageViews,
    getMatomoAllVisits,
    getMatomoSumVisitDuration,
} from "@/lib/data/api/analytics"
import { fetchWebmentions } from "@/lib/data/api/webmentions"
import { getGitHubStats } from "@/lib/data/api/github"
import PageTitle from "@/components/title/page-title"
import codeStats from "@/lib/data/count_total.json"
import SubTitle from '@/components/title/sub-title'
import { server } from "@/lib/utils/server"
import axios from 'axios';
import { formatDistance } from 'date-fns'
import { getAllExtensions } from "showdown"

const StyledReactTooltip = styled(ReactTooltip)`
  background-color: var(--gray-extra-light);
  color: var(--primary-color);
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
    color: var(--thirdy-color);
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
    color: var(--thirdy-color);
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
    box-shadow: var(--box-shadow);
`

const StatsLargeGrid = styled.div`
    text-align: center;
    background-color: var(--content-bg);
    grid-column: span 2/span 2;    
    border-radius: var(--space-sm);  
    box-shadow: var(--box-shadow);
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
    box-shadow: var(--box-shadow);
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

const GitHubButton = styled.button`
    transition: 0.2s;
    background-color: var(--secondary-color);
    color: var(--primary-color);
    cursor: pointer;
    max-width: 28rem;
    padding: 0.725rem;
    border: none;
    outline: none;
    font-size: 1rem;
    :hover {
        color: var(--content-bg);
    }
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

const LanguageTitle = styled.strong`
    display: block;
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
    allVisits,
    visitDuration,
    allWebmentions,
    notesCount,
    locationsCount,
    activitiesCount,
    linksCount
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


    const α = 0.6
    const B = 200
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


    const visits = Object.entries(allVisits)[0].toString().replace("value,","")
    const visitTime = (Object.entries(visitDuration)[0]).toString().replace("value,","")
    
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
                        <SubTitle>Stats from Matomo, Strapi, Webmentions and more</SubTitle>
                        <Container>
                            <GeneralStats>
                                <StatsGrid>
                                    <GridTitle>Site Stats</GridTitle>
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
                                        <GridStats>{visits.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                        <GridStatsDescription>Sessions</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{(visitTime/60).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                        <GridStatsDescription>Min Visit duration</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{subscribersCount}</GridStats>
                                        <GridStatsDescription>Newsletter Subscribers</GridStatsDescription>
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
                                    <Link href="/activities" passHref>
                                        <StatsSmallGrid title="See all Activities">
                                            <GridStats>{activitiesCount}</GridStats>
                                            <GridStatsDescription>Activities tracked</GridStatsDescription>
                                        </StatsSmallGrid>
                                    </Link>
                                    <Link href="/topics">
                                        <StatsSmallGrid title="See all Topics">
                                            <GridStats>{tagsCount}</GridStats>
                                            <GridStatsDescription>Different Topics</GridStatsDescription>
                                        </StatsSmallGrid>
                                    </Link>
                                </StatsGrid>
                            </GeneralStats>
                                
                            <GeneralStats>
                                <StatsGridMedium>
                                    <GridMediumTitle>Even more Stats</GridMediumTitle>
                                    
                                        <BottomStatsGrid>
                                            <GridStats>{webmentionsCount}</GridStats>
                                            <GridStatsDescription>Webmentions</GridStatsDescription>
                                        </BottomStatsGrid>
                                        <Link href="/map" passHref>
                                            <BottomStatsGrid>
                                                <GridStats>{(locationsCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                                <GridStatsDescription>Locations tracked</GridStatsDescription>
                                            </BottomStatsGrid>
                                        </Link>
                                        <Link href="https://www.alexa.com/siteinfo/mxd.codes" passHref>
                                            <BottomStatsGrid>
                                                <GridStats>981,688</GridStats>
                                                <GridStatsDescription>Alexa Rank</GridStatsDescription>
                                            </BottomStatsGrid>
                                        </Link>
                                        <BottomStatsGrid>
                                            <GridStats>- days</GridStats>
                                            <GridStatsDescription>Domain Age</GridStatsDescription>
                                        </BottomStatsGrid>
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
                                            <GitHubButton>
                                                Follow me on GitHub
                                            </GitHubButton>
                                        </GitHubButtonLink>
                                        <GitHubButtonLink
                                            href={forkUrl}
                                            title="Fork mxd-codes-frontend"
                                            alt="Fork mxd-codes-frontend"
                                        >
                                            <GitHubButton>
                                                Fork this repo
                                            </GitHubButton>
                                        </GitHubButtonLink>
                                        <GitHubButtonLink
                                            href={starUrl}
                                            title="Star mxd-codes-frontend"
                                            alt="Star mxd-codes-frontend"
                                        >
                                            <GitHubButton>
                                                Star this repo
                                            </GitHubButton>
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
                        {/*Check out how this site is built: <a href="https://github.com/DaTurboD/mxd-codes-frontend/blob/v2/pages/site-stats.js">site-stats.js</a>*/}
                        </Container>
                    </>
                )}
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const stats = await axios.get(`${server}/api/stats`)
    const lastViews = (await getMatomoPageViews()) || []
    const actions = (await getMatomoActions()) || []
    const githubStats = (await getGitHubStats()) || []
    const allVisits = (await getMatomoAllVisits()) || []
    const visitDuration = (await getMatomoSumVisitDuration()) || []
    const allWebmentions = (await fetchWebmentions()) || []

    return {
        revalidate:  86400,
        props: {
            lastViews,
            actions,
            postsCount: stats.data.posts.count.posts,
            tagsCount: stats.data.posts.count.tags,
            subscribersCount: stats.data.posts.count.subscribers,
            notesCount: stats.data.posts.count.notes,
            activitiesCount: stats.data.posts.count.activities,
            locationsCount: stats.data.posts.count.locations,
            linksCount: stats.data.posts.count.links,
            githubStats,
            allVisits,
            visitDuration,
            allWebmentions,
        },
    }
}
