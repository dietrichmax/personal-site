import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import JobBody from '@/components/post/post-body/post-body'
import Layout from '@/components/layout/layout'
import { getAllJobsWithSlug, getJob } from '@/lib/api'
import PageTitle from '@/components/title/page-title'
import JobHeader from '@/components/job/job-header/job-header'
import markdownToHtml from '@/lib/markdownToHtml'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import Date from '@/components/date/date'    
import Header from '@/components/header/headerNav'
import Footer from '@/components/footer/footer'
import config from "../../data/SiteConfig";
import Link from 'next/link'

const PageWrapper = styled.div`
max-width: 720px;
padding: var(--space) calc(var(--space-lg)*1.5) calc(var(--space-lg)*1.5) calc(var(--space-lg)*1.5);
margin: var(--space) auto var(--space) auto;
background-color: #fff;
border: 1px solid var(--gray-light);;
${media.lessThan('large')`
  padding-left: var(--space);
  padding-right: var(--space);
`}
`


const JobApplyWrapper = styled.div`
  margin: calc(var(--space-lg)*2) auto 0 auto;
  text-align: center;
  border-radius: var(--space-sm);
`

const JobApply = styled.a`
  text-align: center;
  background-color: var(--primary-color);
  padding: calc(var(--space-sm)*1.5) calc(var(--space-lg)*2);
  border-radius: var(--space-sm);
  color: var(--gray-light);
  transition: 0.2s;
  font-family: var(--secondary-font);
  letter-spacing: 0.1rem;
  font-size: 1.7rem;
  text-transform: uppercase;
  :hover {
      border: 1px solid var(--gray-light);
      cursor: pointer;
      background-color: #fff;
      color: var(--primary-color);
  }
`




export default function Job({ job }) {
  const router = useRouter()
  if (!router.isFallback && !job?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <SEO   
        title={job.title}
        description={job.jobDescription}
        slug={`https://gis-netzwerk.com/jobs/${job.slug}`}
        date={job.date}
      />
      <Header section="Jobbörse" link="/jobs"/>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO/>
            <PageTitle>{job.title}</PageTitle>
            <PageWrapper>
              <JobHeader 
                company={job.company} 
                date={job.date} 
                workingTime={job.workingTime} 
                contractType={job.contractType} 
                vacationDays={job.vacationDays} 
                workingHours={job.workingHours} 
                location={job.location} 
              />
              <JobBody content={job.jobDescription} />
              <JobApplyWrapper>
                <JobApply href={job.applyUrl}>
                  Bewerbung
                </JobApply>
              </JobApplyWrapper>
            </PageWrapper>
          </>
        )}
      <Footer />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getJob(params.slug)
  const jobDescription = await markdownToHtml(data?.jobs[0]?.jobDescription || '')
  
  const jobTitle = await data?.jobs[0]?.title
  const link = await data?.jobs[0]?.applicationLink
  const applyUrl = link.includes("@") ? `mailto:${link}?subject=Bewerbung%20als%20${jobTitle}%20via%20${config.siteTitle}` : link

  return {
    props: {
      job: {
        ...data?.jobs[0],
        jobDescription,
        applyUrl
      },
    },
  }
}

export async function getStaticPaths() {
  const allJobs = await getAllJobsWithSlug()

  return {
    paths: allJobs?.map((job) => `/${job.slug}`) || [],
    fallback: true,
  }
}
