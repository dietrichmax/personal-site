import React from "react"
import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import { getCV } from '@/lib/data/external/cms'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/internal/SiteConfig";
import { Button } from "@/styles/templates/button"
import CV from "@/components/cv/cv"

const ResumeWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space) auto var(--space) auto;
  padding: 0 var(--space);
  ${media.lessThan('large')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

export default function CVPage({cvData}) {
  const router = useRouter()

  return (
    <Layout>
      {router.isFallback ? (
        <PageTitle>{config.loading}</PageTitle>
      ) : (
        <>
          <SEO   
            title="CV"
            description="Curriculum Vitae"
            slug={`cv`}
          />
          
          <PageTitle>CV</PageTitle>

          <ResumeWrapper className="h-resume resume"> 

            <CV data={cvData}/>
            
            <Button 
              onClick={() => {window.open(`/api/cv`)}}
            >
              Download CV
            </Button> </ResumeWrapper>
        </>
      )}
    </Layout>
  )
}



export async function getStaticProps({  }) {
  const cvData = await getCV()

  return {
    props: {
      cvData
    },
  }
}
