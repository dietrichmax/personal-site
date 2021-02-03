import React, { useState, useEffect } from "react"
import Layout from "@/components/layout/layout"
import config from "../lib/data/SiteConfig"
import styled from "styled-components"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import { parseISO, format } from "date-fns"
import SEO from "@/components/seo/seo"
import { useRouter } from "next/router"
import media from "styled-media-query"
import Link from "next/link"
import {
    getMatomoActions,
    getMatomoLiveCounter,
    getMatomoPageViews,
    getMatomoCountryVisits,
} from "@/lib/data/api/analytics"
import {
    getPostsCount,
    getTagsCount,
    getSubscribersCount,
} from "@/lib/data/api/cms"
import { getGitHubStats } from "@/lib/data/api/github"
import PageTitle from "@/components/title/page-title"
import codeStats from "@/lib/data/count_total.json"
import WorldMap from "@/components/d3/world-map/worldMap"

const Container = styled.div`
    ${media.lessThan("medium")`
    margin-left: var(--space);
    margin-right: var(--space);
  `}
`

const Title = styled.h2`
    margin: 0 auto var(--space) auto;
    font-size: 2.25rem;
    color: var(--primary-color);
    font-weight: 200;
`

const Stats = styled.span`
    color: var(--thirdy-color);
`

const GeneralStats = styled.div`
    max-width: 1200px;
    margin: var(--space-lg) auto;
    grid-template-columns: repeat(2,minmax(0,1fr));
    display: grid;
    gap: var(--space-lg);
    ${media.lessThan('1000px')`
        grid-template-columns: repeat(1,minmax(0,1fr));
        margin: var(--space);
    `}

`

const StatsGrid = styled.div`
    font-size: 2rem;
    display: grid;
    gap: var(--space-sm);
    grid-template-columns: repeat(2,minmax(0,1fr));
`

const GridTitle = styled.div`
    font-weight: 200;
    grid-column: span 2/span 2;
    letter-spacing: 0.2px;
    color: var(--gray);
`

const GridStats = styled.div`
    padding-top: var(--space);
    display: block;
    color: var(--thirdy-color);
    font-weight: 700;
    font-size: 2.5rem;
`

const GridStatsDescription = styled.div`
    display: block;
    padding-bottom: var(--space);
    text-transform: capitalize;
    font-weight: 200;
    color: var(--gray);
`

const StatsSmallGrid = styled.div`
    text-align: center;
    background-color: var(--secondary-color);  
    border-radius: var(--space-sm);  
`

const StatsLargeGrid = styled.div`
    text-align: center;
    background-color: var(--secondary-color);
    grid-column: span 2/span 2;    
    border-radius: var(--space-sm);  
`

const ViewsContainer = styled.div`
    max-width: 1200px;
    margin: var(--space-lg) auto;
    padding: var(--space);
`

const RecentViewsContainer = styled.div`
    margin: 0 auto;
    height: 120px;
    justify-content: center;
    display: flex;
`

const Credits = styled.div`
    text-align: right;
    font-size: 1.1rem;
`

const ColumnWrapper = styled.div`
    cursor: pointer;
    position: relative;
    margin-right: calc(var(--space-sm) * 0.3);
    width: 100%;
    background-color: var(--primary-color);
`

const Column = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: var(--gray);
    height: ${props => (props.height ? `${props.height}px !important` : "0px")};
    border-top-right-radius: calc(var(--space-sm) * 0.5);
    border-top-left-radius: calc(var(--space-sm) * 0.5);
    :hover {
        background-color: var(--thirdy-color);
    }
    :before {
        content: attr(data-tip);
        font-size: 1.2rem;
        font-family: var(--secondary-font);
        position: absolute;
        z-index: 999;
        white-space: nowrap;
        background: rgba(0, 0, 0, 0.8);
        color: #e0e0e0;
        padding: var(--space-sm);
        opacity: 0;
        -webkit-transition: opacity 0.4s ease-out;
        -moz-transition: opacity 0.4s ease-out;
        -o-transition: opacity 0.4s ease-out;
        transition: opacity 0.4s ease-out;
        text-shadow: none;
    }
    :hover::before {
        opacity: 1;
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
    font-size: 1rem;
    display: block;
    width: 100%;
    text-align: center;
    color: var(--gray);
`

const StatsContainer = styled.p`
    font-size: 2rem;
    margin-bottom: var(--space);
`



const GitHubWrapper = styled.div`
    max-width: 600px;
    margin: var(--space-lg) auto;
    color: var(--gray);
    font-size: 2rem;
`

const GitHubButtonWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const GitHubButtonLink = styled.a`
    margin-right: var(--space);
    margin-top: var(--space-sm);
`

const GitHubButton = styled.button`
    transition: 0.2s;
    border-radius: 0.25rem;
    background-color: var(--thirdy-color);
    cursor: pointer;
    max-width: 28rem;
    color: var(--gray-light);
    padding: var(--space-sm) var(--space);
    border: none;
    outline: none;
    font-size: 1.4rem;
    :hover {
        background-color: var(--secondary-color);
    }
`
const LanguageContainer = styled.div`
    max-width: 1000px;
    margin: calc(var(--space-lg)*2) auto;
    color: var(--gray);
`

const LanguageWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const LanguageColumn = styled.div`
    margin-right: calc(var(--space-lg) * 1.5);
    margin-bottom: var(--space);
`

const LanguageTitle = styled.a`
    display: block;
    font-weight: bold;
`
const LanguageMoreStats = styled.a`
    display: block;
    margin-left: 2rem;
`

const LanguageBar = styled.div`
    height: 1.5rem;
    display: flex;
    margin-bottom: var(--space);
`
const LanguageBarChild = styled.div`
    cursor: pointer;
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

const MapWrapper = styled.div`
    max-width: 600px;
    margin: var(--space-lg) auto;
    font-size: 2rem;
`

const VisitorWrapper = styled.div`
    max-width: 600px;
    margin: var(--space-lg) auto;
    font-size: 2rem;
    color: var(--gray);

`

const VisitorDot = styled.span`
    background-image: url(${props => (props.url ? `${process.env.NEXT_PUBLIC_MATOMO_URL}/${props.url}` : "")});
    background-size: cover;
    margin-right: 1rem;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    display: inline-block;
`

const VisitorList = styled.p`
    margin: 0;
`


export default function Recruiting({
    lastViews,
    liveViews,
    actions,
    postsCount,
    tagsCount,
    subscribersCount,
    countryCount,
    githubStats,
}) {
    const router = useRouter()

    /*const languages = []
    Object.entries(codeStats).forEach(language =>
        languages.push({
            name: language,
        })
    )
    languages.shift()*/

    const { forkCount } = githubStats.user.repository
    const stars = githubStats.user.repository.stargazers.totalCount
    const githubUrl = "https://github.com/DaTurboD/"
    const forkUrl = `${githubStats.user.repository.url}/fork`
    const starUrl = githubStats.user.repository.url
    const lastModified = githubStats.user.repository.pushedAt

    const linesOfCode = codeStats.SUM.code
    const comments = codeStats.SUM.comment
    const files = codeStats.SUM.nFiles

    const countryVisits = []
    const α = 0.6
    const B = 20
    let pageViews = []
    let normalisedViews = []
    Object.entries(lastViews).forEach(
        value => (
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

    let live = liveViews[0].visits

    
    const overallPageViews = actions.nb_pageviews
    const overallDownloads = actions.nb_downloads
    const overallOutlinks = actions.nb_outlinks
    const overallAvgTimeGeneration = actions.avg_time_generation
    
    return (
        <>
            <Layout>
                <Header link="/" />
                {router.isFallback ? (
                    <PageTitle>{config.loading}</PageTitle>
                ) : (
                    <>
                        <SEO title="Site Stats" slug="site-stats" />
                        <PageTitle>Site statistics</PageTitle>
                        <Container>
                            <GeneralStats>
                                <StatsGrid>
                                    <GridTitle>Site Stats</GridTitle>
                                    <StatsLargeGrid>
                                        {live == 0 ? 
                                            <GridStats>You are</GridStats> :
                                            <GridStats>{live} people</GridStats>
                                        }
                                        <GridStatsDescription>Visiting right Now!</GridStatsDescription>
                                    </StatsLargeGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{actions.nb_pageviews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                        <GridStatsDescription>Page Views</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{subscribersCount}</GridStats>
                                        <GridStatsDescription>Newsletter Subscribers</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{actions.nb_outlinks.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                        <GridStatsDescription>Clicks on external Links</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{actions.nb_downloads}</GridStats>
                                        <GridStatsDescription>Downloads</GridStatsDescription>
                                    </StatsSmallGrid>
                                </StatsGrid>

                                
                                <StatsGrid>
                                    <GridTitle>Even More Stats</GridTitle>
                                    <StatsLargeGrid>
                                        <GridStats><Link href="/articles" title="See all Articles">{postsCount}</Link></GridStats>
                                        <GridStatsDescription>Articles Written</GridStatsDescription>
                                    </StatsLargeGrid>
                                    <StatsSmallGrid>
                                        <GridStats><Link href="/topics" title="See all Topics">{tagsCount}</Link></GridStats>
                                        <GridStatsDescription>Different Topics</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{linesOfCode.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                        <GridStatsDescription>Lines of code</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{comments.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</GridStats>
                                        <GridStatsDescription>Build comments</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{format(parseISO(lastModified),config.dateFormat)}</GridStats>
                                        <GridStatsDescription>Date of latest Build</GridStatsDescription>
                                    </StatsSmallGrid>
                                </StatsGrid>
                                
                            </GeneralStats>

                            <ViewsContainer>
                                <Title style={{ color: "var(--gray)" }}>
                                    Views in the past 30 days
                                </Title>
                                <RecentViewsContainer>
                                    {pageViews.map((item, i) => (
                                        <ColumnWrapper
                                            key={i}
                                        >
                                            <Column
                                                height={Math.floor(
                                                    (item.normalisedViews /
                                                        normalisedMax) *
                                                        120
                                                )}
                                                data-tip={`${item.views} Views`}
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

                            
                            <VisitorWrapper>
                                <Title style={{ color: "var(--gray)" }}>Most Visitors are from</Title>
                                <ul>
                                {countryCount.slice(0,5).map((item, i) => (
                                        <VisitorList key={i}><VisitorDot url={item.logo}/>{item.label} ({parseFloat(item.nb_visits/actions.nb_pageviews*100).toFixed(0)}%)</VisitorList>
                                    
                                    ))}
                                </ul>
                            </VisitorWrapper>

                            <MapWrapper>
                                {/*<WorldMap />*/}
                            </MapWrapper>

                            <GitHubWrapper>
                                <Title style={{ color: "var(--gray)" }}>
                                    GitHub Repository
                                </Title>
                                This site's repository has been starred <Stats>{stars}</Stats>{" "}
                                times and forked <Stats>{forkCount}</Stats> times.
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

                            <LanguageContainer>
                                <Title style={{ color: "var(--gray)" }}>
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
                                    />
                                    <LanguageBarChild
                                        width={parseFloat(
                                            (codeStats.CSS.code /
                                                linesOfCode) *
                                                100
                                        ).toFixed(2)}
                                        color="pink"
                                    />
                                    <LanguageBarChild
                                        width={parseFloat(
                                            (codeStats.Markdown.code /
                                                linesOfCode) *
                                                100
                                        ).toFixed(2)}
                                        color="var(--gray)"
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
                        </Container>
                    </>
                )}
                <Footer />
            </Layout>
        </>
    )
}

export async function getServerSideProps() {
    const lastViews = (await getMatomoPageViews()) || []
    const actions = (await getMatomoActions()) || []
    const liveViews = (await getMatomoLiveCounter()) || []
    const postsCount = (await getPostsCount()) || []
    const tagsCount = (await getTagsCount()) || []
    const subscribersCount = (await getSubscribersCount()) || []
    const countryCount = (await getMatomoCountryVisits()) || []
    const githubStats = (await getGitHubStats()) || []

    return {
        props: {
            lastViews,
            liveViews,
            actions,
            postsCount,
            tagsCount,
            subscribersCount,
            countryCount,
            githubStats,
        },
    }
}
