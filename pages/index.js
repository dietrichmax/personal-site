import PostPreview from '@/components/article/article-preview/article-preview'
import NotePreview from "@/components/note/note-preview/note-preview"
import LinkPreview from "@/components/link/link-preview/link-preview"
import ActivityPreview from '@/components/activity/activity-preview/activity-preview'
import Layout from '@/components/layout/layout'
import config from "@/lib/data/SiteConfig";
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import { useRouter } from 'next/router'
import { server } from "@/lib/utils/server"
import { getAbout } from '@/lib/data/api/cms'
import Link from "next/link"
import axios from 'axios';
import { getAllPosts, getAllNotes, getAllLinks, getAllBlogrolls, getAllRecipes, getAllActivities } from '@/lib/data/api/cms'

const IndexPageContainer = styled.div`
  margin: auto;
  max-width: 1200px; 
  margin: var(--space) auto;
`

const HeroWrapper = styled.div`
  width: 100%;
  margin: auto;
  background-color: var(--secondary-color);
`
const Hero = styled.div`   
  display: flex;
  max-width: 1200px;
  padding: calc(3rem + 120px) 0 calc(3rem + 120px) 0;
  margin: 0 auto;
  ${media.lessThan('medium')`
    padding: calc(1rem + 120px) 0 calc(1rem + 60px) 0;
    width: 100%;
    display: block;
  `}
`

const HeroDescription = styled.h3`
  margin: 0 var(--space);
  font-size: calc(.9rem + 2vw);
  font-weight: 300;
  line-height: 1.15;
  font-family: var(--thirdy-font);
  ${media.lessThan('small')`
    font-size: 1.5em;
  `}
  ${media.lessThan('medium')`
    margin: 0 var(--space-sm);
  `}
`

const HeroLinks = styled.a`
  font-weight: 600;
  border-bottom: 2px solid var(--thirdy-color);
  font-family: var(--primary-font);
  :hover {
    border-bottom: 2px solid transparent;
    color: var(--thirdy-color);
  }
`

const HeroFont = styled.span`
  font-family: var(--primary-font);
  font-weight: 600;
`
const SubTitle = styled.p`
  margin: var(--space) var(--space) var(--space-sm) var(--space);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  ${media.lessThan('medium')`
    margin: var(--space-sm);
  `}
`

const Grid = styled.ol`
  max-width: 1200px;
  padding-left: var(--space);
  padding-right: var(--space);
  margin-bottom: var(--space);
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: var(--space);
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  `}
`

const PostTypes = styled.div`
  padding-left: var(--space);
  padding-right: var(--space);
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  color: var(--primary-color);
  ${media.lessThan('medium')`
    display: inline-block;
    margin-top: var(--space);
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const PostType = styled.dl`
  border-bottom: 1px solid var(--link-color);
  cursor: pointer;
`

const PostDT = styled.dt`
  display: inline-block;
`
const PostDD = styled.dd`
  display: inline-block;
`

const AboutMeLink = styled.a`
  border-bottom: 2px solid var(--primary-color);
  cursor: pointer;
  :hover {
    border-bottom: 2px solid transparent;
  }
`

const IntroImg = styled.div`
  float: right;
  margin-left: var(--space);
  ${media.lessThan('medium')`
    margin-left: var(--space-sm);
  `}
  ${media.lessThan('small')`
    width: 100%;
    display: block;
    margin-left: 0;
    text-align: center;
    margin-bottom: var(--space-sm);
  `}
`
export default function Index({ posts, count, about }) {
  const router = useRouter()

  return (
    <>
      <Layout color="var(--primary-color)">
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Home"
              description="I currently work as a GeoData-Manager at RIWA where I'm doing Data Migrations. Beside that I ride my mountain bike in the alps, code and design my website and publish new content whenever i can."
            />
             <HeroWrapper>
              <Hero>
                <HeroDescription>
                  {/*<IntroImg>
                    <Image 
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${about.image.url}`} 
                      width="275"
                      height="275"
                      alt={`Image of ${config.siteTitle}`}
                      title={`Image of ${config.siteTitle}`}
                    />
                  </IntroImg>*/}
                  <HeroFont>Hi, I’m </HeroFont><HeroLinks href={config.siteUrl} title={config.siteTitle}>Max Dietrich</HeroLinks>, GeoData-Manager and Web-Developer from <a href="https://www.openstreetmap.org/search?query=rosenheim#map=13/47.8481/12.1035" title="Rosenheim, Germany">Rosenheim, Germany.</a> <br/>
                    I' am also a proud member of the <HeroLinks href="https://indieweb.org/" title="IndieWeb">IndieWeb</HeroLinks> community. I've been <HeroLinks href="/map" title="Location tracking">tracking my location</HeroLinks> since 2021.
                    <Link href="/about" passHref><AboutMeLink title="About me"> Read more.</AboutMeLink></Link>
                </HeroDescription>
                {/*<PostTypes>
                  <PostType><Link href="/articles"><a title={`See ${count.posts} articles`}><PostDD>{count.posts}</PostDD> <PostDT>Articles</PostDT></a></Link></PostType>
                  <PostType><Link href="/notes"><a title={`See ${count.notes} notes`}><PostDD>{count.notes}</PostDD> <PostDT>Notes</PostDT></a></Link></PostType>
                  <PostType><Link href="/activities"><a title={`See ${count.activities} activities`}><PostDD>{count.activities}</PostDD> <PostDT>Activities</PostDT></a></Link></PostType>
                  <PostType><Link href="/links"><a title={`See ${count.links} links`}><PostDD>{count.links}</PostDD> <PostDT>Links</PostDT></a></Link></PostType>
                </PostTypes>*/}
              </Hero>
             </HeroWrapper>
            <IndexPageContainer>

              <Grid>
                {posts.map((post,i) => (
                  post.type === "article" ? (
                    <PostPreview
                      key={i}
                      postData={post.post}
                    />
                  ) : post.type === "note" ? (
                    <NotePreview 
                      key={i}
                      note={post.note} 
                    />
                  ) : post.type === "link" ? (
                    <LinkPreview
                      key={i}
                      link={post.link} 
                    />
                  ) : null
                ))}
              </Grid>


              {/*{<SubTitle>Recent Notes</SubTitle>
              <NotesContainer >
                {notes.map((note) => (
                 <NotePreview note={note} />
                ))}
                
              </NotesContainer>
              <MoreContainer>
                <Link href={`/notes`} passHref>
                  <MoreArticles title="All Notes">All Notes{' '}</MoreArticles>
                </Link>
                </MoreContainer>*/}
            </IndexPageContainer>

          </>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const about = await getAbout()
  const allPosts = (await getAllPosts()) || []
  const allNotes = (await getAllNotes()) || []
  const allLinks = (await getAllLinks()) || []
  const allActivities = (await getAllActivities()) || []
  const allRecipes = (await getAllRecipes()) || []
  const allContent = []

  allPosts.map((post) => {
    allContent.push({
      post: post,
      date: post.published_at,
      type: "article"
    })
  })


  allNotes.map((note) => {
    allContent.push({
      note: note,
      date: note.published_at,
      type: "note"
    })
  })

  allLinks.map((link) => {
    allContent.push({
      link: link,
      date: link.published_at,
      type: "link"
    })
  })

  allActivities.map((activity) => {
    allContent.push({
      activity: activity,
      date: activity.created_at,
      type: "activity"
    })
  })

  const sortedContent = allContent.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0,6)
  
  return {
    revalidate:  86400,
    props: { 
      posts: sortedContent,
      //count: stats.posts.count,
      about: about.about,
    },
  }
}
