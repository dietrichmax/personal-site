import Layout from "@/src/components/layout/layout"
import { getAllLinkSlugs, getLinkBySlug } from "@/src/data/external/cms"
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
import Author from "@/components/article/article-author/article-author"
import Subscribe from "@/src/components/social/newsletter/subscribe"

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
  attributes: {
    title: string
    description: string
    content: string
    link: string
    slug: string
    date: any
    syndicationLinks: any
    author: any
  }
}

export default function Link(link: Link) {
  return (
    <Layout>
      <article className="h-entry">
        <SEO
          title={link.attributes.title}
          description={link.attributes.description}
          slug={`/links/${link.attributes.slug}`}
        />
        <PageTitle>{link.attributes.title}</PageTitle>
        <HCard />
        <PageWrapper>
          <LinksLink
            href={link.attributes.link}
            title={link.attributes.title}
            className="u-bookmark-of h-cite"
          >
            {link.attributes.link}
          </LinksLink>
          <PageBody content={link.attributes.content} />

          <WebActions
            slug={`/links/${link.attributes.slug}`}
            title={link.attributes.title}
            excerpt={link.attributes.description}
            syndicationLinks={link.attributes.syndicationLinks}
          />
          <Meta
            post={link}
            slug={`/links/${link.attributes.slug}`}
            syndicationLinks={link.attributes.syndicationLinks}
          />
          <Webmentions
            slug={`/links/${link.attributes.slug}`}
            preview={false}
          />
          <Author post={link.attributes.author.data.attributes} />
          <Subscribe />
        </PageWrapper>
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const link = await getLinkBySlug(params.slug)
  const content = await serialize(link[0].attributes.description)
  return {
    revalidate: 86400,
    props: {
      id: link[0].id,
      attributes: {
        title: link[0].attributes.title,
        link: link[0].attributes.link,
        updatedAt: link[0].attributes.updatedAt,
        publishedAt: link[0].attributes.publishedAt,
        description: link[0].attributes.description,
        content,
        author: link[0].attributes.author,
      },
    },
  }
}

export async function getStaticPaths() {
  const links = await getAllLinkSlugs()

  return {
    paths: links.map((link) => `/links/${link.attributes.slug}`) || [],
    fallback: false,
  }
}
