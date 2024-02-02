import Layout from "@/src/components/layout/layout"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import styled from "styled-components"
import PageTitle from "@/src/components/title/page-title"
import SubTitle from "@/src/components/title/sub-title"

const Container = styled.div`
  max-width: var(--width-container);
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

const FeedItem = styled.li`
  margin-bottom: 1rem;
`

const Link = styled.a`
  color: var(--text-color);
  border-bottom: 1px solid var(--link-color);
`

export default function Feeds({}) {
  return (
    <Layout>
      <SEO
        title="Feeds"
        slug="feeds"
        description="You can subscribe to all content, articles, links photos and activities."
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
    </Layout>
  )
}
