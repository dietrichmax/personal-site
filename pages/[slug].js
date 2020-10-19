import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PageBody from '@/components/post/post-body/post-body'
import Layout from '@/components/layout/layout'
import { getAllPagesWithSlug, getPage } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/page-title'
import markdownToHtml from '@/lib/markdownToHtml'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import Date from '@/components/date/date'    
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import config from "../lib/data/SiteConfig";

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


export default function Post({ page }) {
  const router = useRouter()
  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <Header link="/" />
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO   
              title={page.title}
              description={page.description}
              slug={`https://gis-netzwerk.com/${page.slug}`}
              date={page.date}
            />
            <PageTitle>{page.title}</PageTitle>
            <PageWrapper>
              <Date dateString={page.date} />
              <PageBody content={page.content} />
            </PageWrapper>
          </>
        )}
      <Footer />
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPage(params.slug)
  const content = await markdownToHtml(data?.pages[0]?.content || '')

  return {
    props: {
      page: {
        ...data?.pages[0],
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug()
  return {
    paths: allPages?.map((page) => `/${page.slug}`) || [],
    fallback: true,
  }
}
