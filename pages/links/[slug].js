import { useRouter } from "next/router"
import Layout from "src/components/layout/layout"
import { getAllLinks, getLink } from "src/data/external/cms"
import styled from "styled-components"
import SEO from "src/components/seo/seo"
import media from "styled-media-query"
import config from "src/data/internal/SiteConfig"
import Webmentions from "src/components/social/webmentions/webmentions"
import Meta from "src/components/post/post-meta/post-meta"
import PageTitle from "src/components/title/page-title"
import PageBody from "src/components/article/article-body/article-body"
import WebActions from "src/components/social/social-share/social-share"
import HCard from "src/components/microformats/h-card"

const PageWrapper = styled.div`
  max-width: var(--width-container);
  padding: 0 var(--space);
  margin: var(--space-sm) auto;
  ${media.lessThan("medium")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const LinksLink = styled.a`
  cursor: pointer;
  font-family: var(--secondary-font);
  text-decoration: underline;
  text-decoration-color: var(--secondary-color);
  font-style: italic;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-color);
`

export default function Note({ link }) {
  const router = useRouter()

  return (
    <Layout>
      {router.isFallback ? (
        <PageTitle>{config.loading}</PageTitle>
      ) : (
        <article className="h-entry">
          <SEO
            title={link.title}
            description={link.description}
            slug={`/links/${link.slug}`}
            date={link.updated_at ? link.updated_at : link.published_at}
          />
          <PageTitle className="p-name">{link.title}</PageTitle>
          <HCard />
          <PageWrapper>
            <LinksLink
              href={link.link}
              title={link.title}
              className="u-bookmark-of h-cite"
            >
              {link.link}
            </LinksLink>
            <PageBody className="e-content" content={link.description} />

            <WebActions slug={`/links/${link.slug}`} />
            <Meta
              post={link}
              slug={`/links/${link.slug}`}
              syndicationLinks={link.syndicationLinks}
            />
            <Webmentions slug={`/links/${link.slug}`} />
          </PageWrapper>
        </article>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getLink(params.slug)

  return {
    props: {
      link: {
        ...data?.links[0],
      },
    },
  }
}

export async function getStaticPaths() {
  const links = (await getAllLinks()) || []

  return {
    paths: links?.map((link) => `/links/${link.slug}`) || [],
    fallback: true,
  }
}
