import Layout from "@/src/components/layout/layout"
import { getAllLinks, getLink } from "@/src/data/external/cms"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import Webmentions from "@/src/components/social/webmentions/webmentions"
import Meta from "@/src/components/post/post-meta/post-meta"
import PageTitle from "@/src/components/title/page-title"
import PageBody from "@/src/components/article/article-body/article-body"
import WebActions from "@/src/components/social/social-share/social-share"
import HCard from "@/src/components/microformats/h-card"
import { serialize } from "next-mdx-remote/serialize"

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

interface Link {
  link: {
    title: string
    description: string
    content: string
    link: string
    slug: string
    date: any
    syndicationLinks: any
  }
}

export default function Link({ link }: Link) {
  return (
    <Layout>
      <article className="h-entry">
        <SEO
          title={link.title}
          description={link.description}
          slug={`/links/${link.slug}`}
        />
        <PageTitle>{link.title}</PageTitle>
        <HCard />
        <PageWrapper>
          <LinksLink
            href={link.link}
            title={link.title}
            className="u-bookmark-of h-cite"
          >
            {link.link}
          </LinksLink>
          <PageBody content={link.content} />

          <WebActions
            slug={`/links/${link.slug}`}
            title={link.title}
            excerpt={link.description}
            syndicationLinks={link.syndicationLinks}
          />
          <Meta
            post={link}
            slug={`/links/${link.slug}`}
            syndicationLinks={link.syndicationLinks}
          />
          <Webmentions slug={`/links/${link.slug}`} preview={false} />
        </PageWrapper>
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getLink(params.slug)
  const content = await serialize(data.links[0].description)
  return {
    revalidate: 86400,
    props: {
      link: {
        ...data?.links[0],
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const links = (await getAllLinks()) || []

  return {
    paths: links?.map((link) => `/links/${link.slug}`) || [],
    fallback: false,
  }
}