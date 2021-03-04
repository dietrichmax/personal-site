import Layout from '@/components/layout/layout'
import { getAllLinks } from '@/lib/data/api/cms'
import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import media from "styled-media-query"
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import PageTitle from '@/components/title/page-title'
import PostTags from "@/components/tags/tags"
import SubTitle from '@/components/title/sub-title'
import Grid from '@/components/grid/grid'

const LinksContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`


const LinksItem = styled.li`
  max-width: var(--content-width);
  background-color: rgb(255, 255, 255);
  padding: var(--space-sm);
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 2px;
  border-radius: var(--border-radius);
  ${media.lessThan('medium')`
    margin-left: 0;
    margin-bottom: var(--space-sm);
`}
`

const LinksTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: calc(var(--space-sm)*0.5);
`

const LinksLink = styled.cite`
  font-size: 14px;
  border-bottom: 1px solid var(--link-color);
  cursor: pointer;
  font-family: var(--secondary-font);
`

const LinksContent = styled.p`
  margin: calc(var(--space-sm)*0.5) 0;
  line-height: 1.75rem;
  max-width: 700px;
  font-family: var(--secondary-font);
`


export default function Links({ allLinks }) {
  const router = useRouter()

  return (
    <>
      <Layout>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Links"
              slug="links"
            />
              <PageTitle>Links</PageTitle>
              <SubTitle>Awesome content on the web, in random order.</SubTitle>
              <LinksContainer >

                <Grid>

                {allLinks.map((link,i) => (
                  <LinksItem key={i} className="h-entry">
                      <LinksTitle className="p-name"><a href={link.link} title={link.title}>{link.title}</a></LinksTitle>
                      <LinksLink><a className="u-bookmark-of h-cite" href={link.link} title={link.title}>{link.link}</a></LinksLink>
                      <LinksContent className="e-content">{link.description}</LinksContent>
                      <PostTags tags={link.tags} />

                  </LinksItem>
                ))}

                </Grid>

              </LinksContainer>
          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allLinks = (await getAllLinks()) || []
  
  return {
    revalidate:  86400,
    props: { allLinks },
  }
}
