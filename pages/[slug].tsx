import PageBody from "@/src/components/article/article-body/article-body"
import Layout from "@/src/components/layout/layout"
import { useRouter } from "next/router"
import { getAllPages, getPage } from "@/src/data/external/cms"
import PageTitle from "@/src/components/title/page-title"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import { serialize } from "next-mdx-remote/serialize"
import { config } from "@/src/data/internal/SiteConfig"

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space) auto var(--space) auto;
  padding: 0 var(--space);
  ${media.lessThan("large")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    margin-left: var(--space-sm);
  `}
`

interface Page {
  page: {
    title: string
    description: string
    slug: string
    date: string
    content: string
  }
}

export default function Page({ page }: Page) {
  const router = useRouter()

  return (
    <Layout>
      {router.isFallback ? (
        <PageTitle>{config.loading}</PageTitle>
      ) : (
        <article className="h-entry">
          <SEO
            title={page.title}
            description={page.description}
            slug={page.slug}
          />
          <PageTitle>{page.title}</PageTitle>
          <PageWrapper>
            <PageBody content={page.content} />
          </PageWrapper>
        </article>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPage(params.slug)
  const markdown = data?.pages[0]?.content || ""
  const content = await serialize(markdown)

  return {
    props: {
      page: {
        title: data?.pages[0].title,
        description: data?.pages[0].description,
        slug: data?.pages[0].slug,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const allPages = await getAllPages()
  return {
    paths: allPages?.map((page) => `/${page.slug}`) || [],
    fallback: true,
  }
}
