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
import codeStats from "@/data/stats/count_total.json"

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
`

const GeneralStats = styled.div`
    max-width: 600px;
    margin: var(--space-lg) auto;
    line-height: 2;
    color: var(--gray);
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
        height: var(--space);
        top: -2rem;
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

const Column = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: var(--gray);
    height: ${props => (props.height ? `${props.height}px !important` : "0px")};
    border-top-right-radius: calc(var(--space-sm) * 0.5);
    border-top-left-radius: calc(var(--space-sm) * 0.5);
    :hover {
        background-color: var(--secondary-color);
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

const Stats = styled.span`
    color: var(--secondary-color);
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
    background-color: var(--secondary-color);
    cursor: pointer;
    max-width: 28rem;
    color: var(--gray-light);
    padding: var(--space-sm) var(--space);
    border: none;
    outline: none;
    font-size: 1.4rem;
    :hover {
        background-color: var(--gray);
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

    const languages = []
    Object.keys(codeStats).forEach(language =>
        languages.push({
            name: language,
        })
    )

    languages.shift()

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

    const generalStats = []
    Object.entries(actions).forEach(value =>
        generalStats.push({
            year: value[0],
            overallPageViews: value[1].nb_pageviews,
            overallDownloads: value[1].nb_downloads,
            overallOutlinks: value[1].nb_outlinks,
            overallAvgTimeGeneration: value[1].avg_time_generation,
        })
    )
    const stats = generalStats[0]

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
                                <StatsContainer>
                                    {live > 1 ? (
                                        <span>
                                            You are among <Stats>{live}</Stats>{" "}
                                            peoples on this site.
                                        </span>
                                    ) : (
                                        <span>
                                            At the moment you are the only
                                            person on this site.
                                        </span>
                                    )}{" "}
                                    <br />
                                    In <Stats>{stats.year}</Stats> this site was
                                    viewed{" "}
                                    <Stats>{stats.overallPageViews}</Stats>{" "}
                                    times.
                                </StatsContainer>
                                <StatsContainer>
                                    Overall i have published{" "}
                                    <Stats>{postsCount}</Stats> articles on this
                                    site with <Stats>{tagsCount}</Stats>{" "}
                                    different topics.{" "}
                                    <Stats>{subscribersCount}</Stats> awsome
                                    persons have subscribed to my newsletter.
                                </StatsContainer>
                                <StatsContainer>
                                    There were{" "}
                                    <Stats>{stats.overallOutlinks}</Stats>{" "}
                                    clicks on external link and{" "}
                                    <Stats>{stats.overallDownloads}</Stats>{" "}
                                    files have been downloaded. Generation time
                                    for a page takes in average{" "}
                                    <Stats>
                                        {stats.overallAvgTimeGeneration}
                                    </Stats>{" "}
                                    seconds.
                                </StatsContainer>
                                <StatsContainer>
                                    The latest build of this site has{" "}
                                    <Stats>{linesOfCode}</Stats> lines of code,{" "}
                                    <Stats>{comments}</Stats> comments and was
                                    published on{" "}
                                    <Stats>
                                        {format(
                                            parseISO(lastModified),
                                            config.dateFormat
                                        )}
                                    </Stats>
                                    .
                                </StatsContainer>
                            </GeneralStats>
                            <ViewsContainer>
                                <Title style={{ color: "var(--gray)" }}>
                                    Views in the past 30 days
                                </Title>
                                <RecentViewsContainer>
                                    {pageViews.map((item, i) => (
                                        <ColumnWrapper
                                            key={i}
                                            data-tip={`${item.views} Views`}
                                        >
                                            <Column
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
                                        )}
                                        color="#f0db4f"
                                        data-tip={`${parseFloat(
                                            (codeStats.JavaScript.code /
                                                linesOfCode) *
                                                100
                                        )}% JavaScript`}
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
                                        )}
                                        color="brown"
                                    />
                                    <LanguageBarChild
                                        width={parseFloat(
                                            (codeStats.CSS.code / linesOfCode) *
                                                100
                                        )}
                                        color="pink"
                                    />
                                    <LanguageBarChild
                                        width={parseFloat(
                                            (codeStats.Markdown.code /
                                                linesOfCode) *
                                                100
                                        )}
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
                                            {codeStats.JavaScript.code} lines
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
                                            {codeStats.JSON.code} lines
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
