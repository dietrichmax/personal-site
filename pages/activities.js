import Layout from '@/components/layout/layout'
import { getAllActivities } from '@/lib/data/api/cms'
import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import SubTitle from '@/components/title/sub-title'
import ActivityPreview from '@/components/activity/activity-preview/activity-preview'
import media from 'styled-media-query';

const ActivityPageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: var(--space-lg);
  max-width: 1200px;
  padding-left: var(--space);
  padding-right: var(--space);
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const Grid = styled.ol`
  list-style: none;
  padding-inline-start: 0;
  display: grid;
  gap: var(--space);
  grid-template-columns: repeat(2, minmax(0px, 1fr));
  ${media.lessThan('medium')`
    grid-template-columns: repeat(1, minmax(0px, 1fr));
    padding-left: 0;
  `}
`

export default function Blog({ allActivities }) {
  const router = useRouter()



  return (
    <>
      <Layout>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Activities"
              slug="activities"
              description="I am tracking most of my bike rides and runs. These maps are automatically generated with the collected data."
            />
            
            <PageTitle>Activities</PageTitle>
            <SubTitle>Bike rides and runs</SubTitle>

            <ActivityPageContainer >

              <Grid className="h-feed">         
                {allActivities.map((activity,i) => (
                  <ActivityPreview
                    key={i} 
                    activity={activity}
                  />
                ))}
              </Grid>

            </ActivityPageContainer>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allActivities = (await getAllActivities()) || []


  return {
    revalidate:  86400,
    props: { 
      allActivities
    },
  }
}
