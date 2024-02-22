import Layout from "@/src/components/layout/layout"
import PageTitle from "@/src/components/title/page-title"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import CV from "@/src/components/cv/cv"
import { getCV } from "@/src/data/external/cms"

const ResumeWrapper = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto var(--space) auto;
  padding: 0 var(--space);
  ${media.lessThan("large")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

export default function CVPage({ cv }) {
  return (
    <Layout>
      <SEO title="CV" description="Curriculum Vitae" slug={`cv`} />

      <PageTitle>CV</PageTitle>

      <ResumeWrapper className="h-resume resume">
        <CV data={cv.attributes} />
      </ResumeWrapper>
    </Layout>
  )
}

export async function getStaticProps({}) {
  const cv = await getCV()
  return {
    props: {
      cv,
    },
  }
}
