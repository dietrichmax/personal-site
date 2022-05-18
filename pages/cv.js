import React from "react"
import { useRouter } from "next/router"
import Layout from "src/components/layout/layout"
import { getCV } from "src/data/external/cms"
import PageTitle from "src/components/title/page-title"
import styled from "styled-components"
import SEO from "src/components/seo/seo"
import media from "styled-media-query"
import config from "src/data/internal/SiteConfig"
import { Button } from "@/styles/templates/button"
import CV from "src/components/cv/cv"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
const ResumeWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space) auto var(--space) auto;
  padding: 0 var(--space);
  ${media.lessThan("large")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

export default function CVPage({ cvData }) {
  const router = useRouter()

  return (
    <Layout>
      {router.isFallback ? (
        <PageTitle>{config.loading}</PageTitle>
      ) : (
        <>
          <SEO title="CV" description="Curriculum Vitae" slug={`cv`} />

          <PageTitle>CV</PageTitle>

          <ResumeWrapper className="h-resume resume">
            <CV id="cv" data={cvData} />
            <Button
              onClick={() => {
                html2canvas(document.getElementById("cv"), {
                  scale: 8,
                }).then(function (canvas) {
                  const pdf = new jsPDF("portrait", undefined, "a4")
                  pdf.addImage(
                    canvas.toDataURL("image/jpeg"),
                    "JPEG",
                    0,
                    0,
                    210,
                    297
                  )
                  pdf.save("max_dietrich_cv.pdf")
                })
              }}
            >
              Download CV
            </Button>{" "}
          </ResumeWrapper>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({}) {
  const cvData = await getCV()

  return {
    props: {
      cvData,
    },
  }
}
