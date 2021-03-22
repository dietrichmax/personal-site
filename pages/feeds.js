import Layout from '@/components/layout/layout'
import { getLocationData, getNowData} from '@/lib/data/api/cms'
import config from "../lib/data/SiteConfig";
import SEO from '@/components/seo/seo'
import media from "styled-media-query"
import styled from 'styled-components';
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import SubTitle from '@/components/title/sub-title'
import axios from 'axios';
import Image from "next/image"
import { format, fromUnixTime} from 'date-fns'
import TextBody from '@/components/note/note-body/note-body'



const Container = styled.div`
  max-width: 1200px;
  margin: var(--space) auto;
  padding-left: var(--space);
  padding-right: var(--space);
  ${media.lessThan('medium')`
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



export default function Feeds({ }) {
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
              description="You can subscribe to all content, articles, notes, links and activities."
            />
            
            <PageTitle>Feeds</PageTitle>
            <SubTitle>You can subscribe to all content or individual content types.</SubTitle>

            <Container >

              <FeedsList>
                <FeedItem><a href="/feed.xml" title="All content">All content</a></FeedItem>
                <FeedItem><a href="/articles/feed.xml" title="Articles">Articles</a></FeedItem>
                <FeedItem><a href="/notes/feed.xml" title="Notes">Notes</a></FeedItem>
                <FeedItem><a href="/activities/feed.xml" title="Activities">Activities</a></FeedItem>
                <FeedItem><a href="/links/feed.xml" title="Links">Links</a></FeedItem>

              </FeedsList>

            </Container >
          </>
        )}
      </Layout>
    </>
  )
}
