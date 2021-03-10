import React from "react"
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PageBody from '@/components/post/post-body/post-body'
import Layout from '@/components/layout/layout'
import { getAllPages, getPage } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "../lib/data/SiteConfig";

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space) auto var(--space) auto;
  padding: 0 var(--space);
  ${media.lessThan('large')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`


export default function Page({ page }) {
  const router = useRouter()
  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <article className="h-entry">
            <SEO   
              title={page.title}
              description={page.description}
              slug={page.slug}
              date={page.date}
            />
            <PageTitle>{page.title}</PageTitle>
            <PageWrapper>
              <PageBody content={page.content} />
            </PageWrapper>
          </article>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPage(params.slug)
  const content = data?.pages[0]?.content || ''

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
  const allPages = await getAllPages()
  return {
    paths: allPages?.map((page) => `/${page.slug}`) || [],
    fallback: true,
  }
}
