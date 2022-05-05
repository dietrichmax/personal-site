import Layout from "src/components/layout/layout"
import { getLocationData, getNowData } from "src/data/external/cms"
import config from "../src/data/internal/SiteConfig"
import SEO from "src/components/seo/seo"
import media from "styled-media-query"
import styled from "styled-components"
import { useRouter } from "next/router"
import PageTitle from "src/components/title/page-title"
import SubTitle from "src/components/title/sub-title"
import axios from "axios"
import Image from "next/image"
import { format, fromUnixTime } from "date-fns"
import TextBody from "src/components/note/note-body/note-body"

const Container = styled.div`
  max-width: 1200px;
  margin: var(--space) auto;
  padding-left: var(--space);
  padding-right: var(--space);
  ${media.lessThan("medium")`
    margin: var(--space-sm);
    padding: 0;
  `}
`

const FeedsList = styled.ul`
  max-width: 1200px;
  margin: var(--space) auto;
  padding-left: var(--space);
  padding-right: var(--space);
`

const FeedItem = styled.li``

const Link = styled.a`
  color: var(--text-color);
  border-bottom: 1px solid var(--link-color);
`

export default function Feeds({}) {
  const router = useRouter()

  return (
    <>
      <Layout>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO
              title="Feeds"
              slug="feeds"
              description="You can subscribe to all content, articles, notes, links photos and activities."
            />

            <PageTitle>Feeds</PageTitle>
            <SubTitle>
              You can subscribe to all content or individual content types.
            </SubTitle>

            <Container>
              <FeedsList>
                <FeedItem>
                  <Link href="/feed.xml" title="All content">
                    All content
                  </Link>
                </FeedItem>
                <FeedItem>
                  <Link href="/articles/feed.xml" title="Articles">
                    Articles
                  </Link>
                </FeedItem>
                <FeedItem>
                  <Link href="/notes/feed.xml" title="Notes">
                    Notes
                  </Link>
                </FeedItem>
                <FeedItem>
                  <Link href="/links/feed.xml" title="Links">
                    Links
                  </Link>
                </FeedItem>
                <FeedItem>
                  <Link href="/photos/feed.xml" title="Photos">
                    Photos
                  </Link>
                </FeedItem>
                <FeedItem>
                  <Link href="/activities/feed.xml" title="Activities">
                    Activities
                  </Link>
                </FeedItem>
              </FeedsList>
            </Container>
          </>
        )}
      </Layout>
    </>
  )
}
