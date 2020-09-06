import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PageBody from '@/components/post/post-body/post-body'
import Layout from '@/components/layout/layout'
import { getAllJobsWithSlug, getJob } from '@/lib/api'
import PostTitle from '@/components/title/content-title'
import markdownToHtml from '@/lib/markdownToHtml'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import PageTitle from '@/components/title/page-title'
import media from 'styled-media-query';
import Date from '@/components/date/date'    

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


export default function Job({ job }) {
  const router = useRouter()
  if (!router.isFallback && !job?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <SEO/>
            <PageTitle>{job.title}</PageTitle>
            <PageWrapper>
              <Date dateString={job.date} />
              <PageBody content={job.jobDescription} />
            </PageWrapper>
          </>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getJob(params.slug)
  const content = await markdownToHtml(data?.jobs[0]?.jobDescription || '')

  return {
    props: {
      job: {
        ...data?.jobs[0],
        content,
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
