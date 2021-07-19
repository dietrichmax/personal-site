import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import { getAllLinks, getLink } from '@/lib/data/external/cms'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/internal/SiteConfig";
import Webmentions from "@/components/social/webmentions/webmentions"
import Image from "next/image"
import PageTitle from '@/components/title/page-title'
import PageBody from '@/components/article/article-body/article-body'
import WebActions from "@/components/social/feedback/feedback"

const PageWrapper = styled.div`
  max-width: var(--width-container);
  padding: 0 var(--space);
  margin: var(--space-sm) auto;
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const LinksLink = styled.p`
  cursor: pointer;
  font-family: var(--secondary-font);
  text-decoration: underline;
  text-decoration-color: var(--secondary-color);
  font-style: italic;
  max-width: 1200px;
  margin: var(--space-lg) auto;
  padding-left: var(--space);
  padding-right: var(--space);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-color);
  ${media.lessThan('medium')`
    margin: var(--space-sm);
    font-size: 1rem;
    padding: 0;
  `}
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
              slug={`/links/${link.id}`}
              date={link.updated_at ? link.updated_at : link.published_at}
            />
            <PageTitle className="p-name">{link.title}</PageTitle>
            <LinksLink href={link.link} title={link.title}className="u-bookmark-of h-cite">{link.link}</LinksLink>
            <PageWrapper>
              <PageBody className="e-content" content={link.description} />

              <WebActions slug={`/links/${link.id}`} />
              <Webmentions slug={`/links/${link.id}`} />
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
    paths: links?.map((link) => `/links/${link.id}`) || [],
    fallback: true,
  }
}
