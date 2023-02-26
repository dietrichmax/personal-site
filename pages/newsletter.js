import Layout from "src/components/layout/layout"
import SEO from "src/components/seo/seo"
import Title from "src/components/title/page-title"
import Newsletter from "src/components/social/newsletter/subscribe"
import styled from "styled-components"
import media from "styled-media-query"

const Container = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto;
  padding-left: var(--space);
  padding-right: var(--space);

  ${media.lessThan("medium")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

export default function MailingList() {
  return (
    <>
      <SEO title="Newsletter" slug="newsletter" />
      <Layout>
        <Title>Newsletter</Title>

        <Container>
          <Newsletter />
        </Container>
      </Layout>
    </>
  )
}
