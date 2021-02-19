import React, { useState, useEffect } from "react"
import Layout from "@/components/layout/layout"
import config from "../lib/data/SiteConfig"
import styled from "styled-components"
import Header from "@/components/navigation/header/header"
import Footer from "@/components/navigation/footer/footer"
import { parseISO, format } from "date-fns"
import SEO from "@/components/seo/seo"
import { useRouter } from "next/router"
import media from "styled-media-query"
import Link from "next/link"
import ReactTooltip from 'react-tooltip';
import {
    getMatomoActions,
    getMatomoLiveCounter,
    getMatomoPageViews,
    getMatomoSEOStats,
    getMatomoAllVisits,
    getMatomoSumVisitDuration,
} from "@/lib/data/api/analytics"
import { fetchWebmentions } from "@/lib/data/api/webmentions"
import {
    getPostsCount,
    getTagsCount,
    getSubscribersCount,
    getNotesCount,
    getLinksCount,
} from "@/lib/data/api/cms"
import { getGitHubStats } from "@/lib/data/api/github"
import PageTitle from "@/components/title/page-title"
import codeStats from "@/lib/data/count_total.json"
import SubTitle from '@/components/title/sub-title'


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
    background-color: var(--gray-extra-light);
    border-radius: var(--space-sm);  
`

const StatsLargeGrid = styled.div`
    text-align: center;
    background-color: var(--gray-extra-light);
    grid-column: span 2/span 2;    
    border-radius: var(--space-sm);  
`

const StatsGridMedium = styled.div` 
    display: grid;
    gap: var(--space-sm);
    grid-template-columns: repeat(4,minmax(0,1fr));
    grid-column: span 2/span 2;
`
const GridMediumTitle = styled.p`
    grid-column: span 4/span 4;
`
const BottomStatsGrid = styled.div`
    text-align: center;
    background-color: var(--gray-extra-light);
    border-radius: var(--space-sm); 
    grid-column: span 1/span 1; 
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
    cursor: pointer;
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
    background-color: var(--primary-color);
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
    border-radius: 0.25rem;
    background-color: var(--thirdy-color);
    cursor: pointer;
    max-width: 28rem;
    padding: 0.725rem;
    border: none;
    color: #fff;
    outline: none;
    font-size: 1rem;
    :hover {
        background-color: var(--gray-extra-light);
        color: var(--thirdy-color);
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


export default function Recruiting({
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
    linksCount,
}) {
    const [liveViews, setLiveViews] = useState(0);
    const router = useRouter()

    useEffect(() => {
        async function fetchLiveData() {
          const result = await getMatomoLiveCounter() || []
          console.log("result"+result[0].visits);
          setLiveViews(result[0].visits);
        };
        fetchLiveData();
        console.log("liveViews"+liveViews);
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
    Object.entries(lastViews).forEach(value => (
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
                <Header link="/" />
                {router.isFallback ? (
                    <PageTitle>{config.loading}</PageTitle>
                ) : (
                    <>
                        <SEO title="Site Stats" slug="site-stats" />
                        <StyledReactTooltip />
                        <PageTitle>Site statistics</PageTitle>
                        <SubTitle>Stats from Matomo, Strapi and Webmentions</SubTitle>
                        <Container>
                            <GeneralStats>
                                <StatsGrid>
                                    <GridTitle>Site Stats</GridTitle>
                                    <StatsLargeGrid>
                                        {liveViews == 0 ? 
                                            <GridStats>You are</GridStats> :
                                            <GridStats>{liveViews} people</GridStats>
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
                                        <GridStats><Link href="/notes" title="See all Notes">{notesCount}</Link></GridStats>
                                        <GridStatsDescription>Notes written</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{webmentionsCount}</GridStats>
                                        <GridStatsDescription>Webmentions</GridStatsDescription>
                                    </StatsSmallGrid>
                                    <StatsSmallGrid>
                                        <GridStats>{linksCount}</GridStats>
                                        <GridStatsDescription>Links published</GridStatsDescription>
                                    </StatsSmallGrid>
                                </StatsGrid>
                            </GeneralStats>
                                
                            <GeneralStats>
                                <StatsGridMedium>
                                    <GridMediumTitle>SEO Stats</GridMediumTitle>
                                        {seoStats.map((item, i) => (
                                            <BottomStatsGrid key={i}>
                                                <GridStats>{item.rank}</GridStats>
                                                <GridStatsDescription>{item.label}</GridStatsDescription>
                                            </BottomStatsGrid>
                                        ))}
                                </StatsGridMedium>
                            </GeneralStats>

                            <ViewsContainer>
                                <Title>
                                    Views in the past 30 days
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
                            

                                {/*<MapWrapper>
                                    <WorldMap />
                                </MapWrapper>*/}

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
                <Footer />
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const lastViews = (await getMatomoPageViews()) || []
    const actions = (await getMatomoActions()) || []
    const postsCount = (await getPostsCount()) || []
    const tagsCount = (await getTagsCount()) || []
    const notesCount = (await getNotesCount()) || []
    const linksCount = (await getLinksCount()) || []
    const subscribersCount = (await getSubscribersCount()) || []
    const githubStats = (await getGitHubStats()) || []
    const seoStats = (await getMatomoSEOStats()) || []
    const allVisits = (await getMatomoAllVisits()) || []
    const visitDuration = (await getMatomoSumVisitDuration()) || []
    const allWebmentions = (await fetchWebmentions()) || []

    

    return {
        revalidate:  86400,
        props: {
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
            linksCount,
        },
    }
}
