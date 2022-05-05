import Layout from "@/components/layout/layout"
import SEO from "@/components/seo/seo"
import Title from "@/components/title/page-title"
import { getAllPosts } from "src/data/external/cms"
import { useRouter } from "next/router"
import StringSimilarity from "string-similarity"
import styled from "styled-components"
import SubTitle from "@/components/title/sub-title"

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding-left: var(--space);
  padding-right: var(--space);
`

export default function Custom404({ pages }) {
  const router = useRouter()

  const pathname = router.pathname
  const result = StringSimilarity.findBestMatch(pathname, pages).bestMatch
  const goodMatch = result.rating > 0.7

  return (
    <Layout>
      <SEO title="404 - Page Not Found" slug="" />
      <Title>404 - Page Not Found</Title>
      <SubTitle>
        {goodMatch
          ? `You were probably looking for ${goodMatch}`
          : `Seems like you got lost. Sorry for that...`}
      </SubTitle>
      <Container></Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPosts = (await getAllPosts()) || []
  const pages = []
  allPosts.map((post) => pages.push(post.slug))
  return {
    revalidate: 86400,
    props: { pages },
  }
}
