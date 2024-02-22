import Layout from "@/src/components/layout/layout"
import { getAllLinks } from "@/src/data/external/cms"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import PageTitle from "@/src/components/title/page-title"
import SubTitle from "@/src/components/title/sub-title"
import Grid from "@/src/components/grid/grid"
import LinkPreview from "@/src/components/link/link-preview/link-preview"

const LinksContainer = styled.div`
  margin: 0 auto;
  max-width: var(--width-container);
`

interface Link {
  id: number
  attributes: {
    title: string
    description: string
    content: string
    link: string
    slug: string
    date: any
    syndicationLinks: any
  }
}

export default function Links({ allLinks }) {
  const description: string = "Awesome content on the web, in random order"

  return (
    <>
      <Layout>
        <SEO title="Links" slug="links" description={description} />
        <PageTitle>Links</PageTitle>
        <SubTitle>{description}</SubTitle>
        <LinksContainer>
          <Grid>
            {allLinks.map((link: Link) => (
              <LinkPreview key={link.id} link={link.attributes} />
            ))}
          </Grid>
        </LinksContainer>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allLinks = await getAllLinks()

  return {
    revalidate: 86400,
    props: { allLinks },
  }
}
