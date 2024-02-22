import PageBody from "@/src/components/article/article-body/article-body"
import Layout from "@/src/components/layout/layout"
import { getAllPageSlugs, getPageBySlug } from "@/src/data/external/cms"
import PageTitle from "@/src/components/title/page-title"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import { serialize } from "next-mdx-remote/serialize"

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space) auto var(--space) auto;
  padding: 0 var(--space);
  ${media.lessThan("large")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

interface Page {
  id: number
  attributes: {
    title: string
    description: string
    slug: string
    date: string
    content: string
  }
}

export default function Page(page: Page) {
  return (
    <Layout>
      <article className="h-entry">
        <SEO
          title={page.attributes.title}
          description={page.attributes.description}
          slug={page.attributes.slug}
        />
        <PageTitle>{page.attributes.title}</PageTitle>
        <PageWrapper>
          <PageBody content={page.attributes.content} />
        </PageWrapper>
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const page = await getPageBySlug(params.slug)
  const markdown = page[0].attributes.content
  const content = await serialize(markdown)

  return {
    props: {
      id: page[0].id,
      attributes: {
        title: page[0].attributes.title,
        description: page[0].attributes.description,
        slug: page[0].attributes.slug,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const pages = await getAllPageSlugs()
  return {
    paths: pages.map((page) => `/${page.attributes.slug}`),
    fallback: false,
  }
}
