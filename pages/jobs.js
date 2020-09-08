import MoreJobs from '@/components/job/job-preview/more-jobs'
import Layout from '@/components/layout/layout'
import PageTitle from '@/components/title/page-title'
import { getAllJobsForJobboard } from '@/lib/api'
import Head from 'next/head'
import config from "../data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/headerNav'
import Footer from '@/components/footer/footer'
import SEO from '@/components/seo/seo'

const JobsPageContainer = styled.div`
  margin: auto;
  max-width: 1200px;
`

export default function Index({ allJobs }) {
  return (
    <>
      <Layout>
        <SEO/>
        <Header section="Jobbörse" link="/jobs"/>
        <Head>
          <title>{config.siteTitle}</title>
        </Head>
        <JobsPageContainer >
            <PageTitle>Jobbörse</PageTitle>
            <MoreJobs jobs={allJobs} />
        </JobsPageContainer>
        <Footer />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allJobs = (await getAllJobsForJobboard()) || []
  return {
    props: { allJobs },
  }
}
