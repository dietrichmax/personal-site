import PostPreview from '@/components/article/article-preview/article-preview'
import NotePreview from "@/components/note/note-preview/note-preview"
import LinkPreview from "@/components/link/link-preview/link-preview"
import PhotoPreview from '@/components/photo/photo-preview'
import Layout from '@/components/layout/layout'
import config from "@/lib/data/internal/SiteConfig";
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import { useRouter } from 'next/router'
import { getAbout } from '@/lib/data/external/cms'
import Link from "next/link"
import HCard from '@/components/microformats/h-card';
import { getAllPosts, getAllNotes, getAllLinks, getAllPhotos, getAllRecipes, getAllActivities, getLocationData, getCV } from '@/lib/data/external/cms'
import Grid from "@/components/grid/grid"

const IndexPageContainer = styled.div`
  margin: auto;
  max-width: 1200px; 
  margin: var(--space) auto;
`

const HeroWrapper = styled.div`
  width: 100%;
  margin: auto;
  background-color: var(--primary-color);
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
  line-height: 1.35;
  font-family: var(--thirdy-font);
  ${media.lessThan('small')`
    font-size: 1.5em;
  `}
  ${media.lessThan('medium')`
    margin: 0 var(--space-sm);
    line-height: 1.45;
  `}
`

const HeroLinks = styled.a`
  font-weight: 600;
  border-bottom: 2px solid var(--thirdy-color);
  font-family: var(--primary-font);
  color: var(--secondary-color);
  :hover {
    border-bottom: 2px solid transparent;
    color: var(--thirdy-color);
  }
`

const HeroLinksNormal = styled.a`
  border-bottom: 2px solid var(--thirdy-color);
  font-family: var(--primary-font);
  color: var(--secondary-color);
  :hover {
    border-bottom: 2px solid transparent;
    color: var(--thirdy-color);
  }
`

const HeroFont = styled.span`
  font-family: var(--primary-font);
  font-weight: 600;
`


const AboutMeLink = styled.a`
  border-bottom: 2px solid var(--text-color);
  cursor: pointer;
  :hover {
    border-bottom: 2px solid transparent;
  }
`

const jsonld = [
    {
      "@context":"http://schema.org",
      "@type":"ItemList",
      "itemListElement":[
        {
          "@type":"SiteNavigationElement",
          "position":1,
          "name": "Now",
          "description": "What's happening right now",
          "url":"http://www.mxd.codes/now"
        }
        {
          "@type":"SiteNavigationElement",
          "position":2,
          "name": "Articles",
          "description": "Tutorials, Guides and thoughts.",
          "url":"http://www.mxd.codes/articles"
        },
        {
          "@type":"SiteNavigationElement",
          "position":3,
          "name": "Photos",
          "description": "Photos taken by me",
          "url":"http://www.mxd.codes/photos"
        },
        {
          "@type":"SiteNavigationElement",
          "position":4,
          "name": "Notes",
          "description": "Status updates and short notes",
          "url":"http://www.mxd.codes/notes"
        },
        {
          "@type":"SiteNavigationElement",
          "position":5,
          "name": "Links",
          "description": "Awesome content on the web, in random order",
          "url":"http://www.mxd.codes/links"
        },
        {
          "@type":"SiteNavigationElement",
          "position":6,
          "name": "Dashboard",
          "description": "Awesome content on the web, in random order",
          "url":"https://mxd.codes/dashboard"
        },
        {
          "@type":"SiteNavigationElement",
          "position":7,
          "name": "Contact",
          "description": "Contact information",
          "url":"https://mxd.codes/contact"
        },
        {
          "@type":"SiteNavigationElement",
          "position":8,
          "name": "Feeds",
          "description": "You can subscribe to all content or individual content types",
          "url":"https://mxd.codes/feeds"
        }
      ]
    }
  ]

export default function Index({ posts, cv }) {
  const router = useRouter()

  const content = posts.slice(0,20)

  return (
    <>
      <Layout color="var(--text-color)">
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              description={`Hi, I'm ${cv.title}. I currently work as a ${cv.timeline[0].role} at ${cv.timeline[0].company} where I'm doing Data Migrations. Beside that I ride my mountain bike in the alps, code and design my website and publish new content whenever i can.`}
              jsonld={jsonld}
            />
             <HeroWrapper className="h-card">
              <Hero>
                <HCard />
                <HeroDescription>
                  <HeroFont>Hi, I’m </HeroFont><HeroLinks className="p-name u-url u-uid" rel="author me" href={config.siteUrl} title={config.siteTitle}>{cv.title}</HeroLinks>, {cv.timeline[0].role} and Web-Developer from <a className="p-locality" href="https://www.openstreetmap.org/search?query=rosenheim#map=13/47.8481/12.1035" title="Rosenheim, Germany">Rosenheim, Germany.</a> <br/>
                    I' am also a proud member of the <HeroLinks className="p-org h-card" href="https://indieweb.org/" title="IndieWeb">IndieWeb</HeroLinks> community. I've been <HeroLinksNormal href="/map" title="Location tracking">tracking my location</HeroLinksNormal> since 2021.
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
                {content.map((post,i) => (
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
                  ) : post.type === "photo" ? (
                    <PhotoPreview
                      key={i}
                      photo={post.photo} 
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
  const locationData = (await getLocationData()) || []
  const about = await getAbout()
  const allPosts = (await getAllPosts()) || []
  const allNotes = (await getAllNotes()) || []
  const allLinks = (await getAllLinks()) || []
  //const allActivities = (await getAllActivities()) || []
  const allPhotos = (await getAllPhotos()) || []
  const cv = (await getCV()) || []

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

  allPhotos.map((photo) => {
    allContent.push({
      photo: photo,
      date: photo.created_at,
      type: "photo"
    })
  })

  const sortedContent = allContent.sort((a, b) => (a.date < b.date ? 1 : -1))
  
  return {
    revalidate:  1800,
    props: { 
      posts: sortedContent,
      //count: stats.posts.count,
      about: about.about,
      location: locationData[0],
      cv
    },
  }
}
