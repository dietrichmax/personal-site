import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import Content from '@/components/article/article-body/article-body'
import Layout from '@/components/layout/layout'
import { getAbout } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig";

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space) auto var(--space) auto;
  padding: 0 var(--space);
  ${media.lessThan('large')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`



export default function Resume({  }) {
  const router = useRouter()

  
  return (
    <Layout>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO   
              title="Resume"
              description="Resume"
              slug={`resume`}
            />
            
            <PageTitle>Resume</PageTitle>

            <PageWrapper>  
            tbd

            </PageWrapper>
          </>
        )}
    </Layout>
  )
}


