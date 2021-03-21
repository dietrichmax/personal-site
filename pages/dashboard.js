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
    getMatomoSEOStats,
    getMatomoAllVisits,
    getMatomoSumVisitDuration,
} from "@/lib/data/api/analytics"
import { fetchWebmentions } from "@/lib/data/api/webmentions"
import { getGitHubStats } from "@/lib/data/api/github"
import PageTitle from "@/components/title/page-title"
import codeStats from "@/lib/data/count_total.json"
import SubTitle from '@/components/title/sub-title'
import { server } from "@/lib/utils/server"


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
}) {

    return (
        <>
        </>
    )
}

export async function getStaticProps() {
    //const resStats = await fetch(`${server}/api/stats`)
    //const stats = await resStats.json()
    const lastViews = (await getMatomoPageViews()) || []
    const actions = (await getMatomoActions()) || []
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
            /*postsCount: stats.posts.count.posts,
            tagsCount: stats.posts.count.tags,
            subscribersCount: stats.posts.count.subscribers,
            notesCount: stats.posts.count.notes,
            activitiesCount: stats.posts.count.activities,
            locationsCount: stats.posts.count.locations,
            linksCount: stats.posts.count.links,*/
            githubStats,
            seoStats,
            allVisits,
            visitDuration,
            allWebmentions,
        },
    }
}
