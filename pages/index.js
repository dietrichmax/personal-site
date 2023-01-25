import PostPreview from "src/components/article/article-preview/article-preview"
import NotePreview from "src/components/note/note-preview/note-preview"
import LinkPreview from "src/components/link/link-preview/link-preview"
//import ActivityPreview from "@/components/activity/activity-preview/activity-preview"
import PhotoPreview from "src/components/photo/photo-preview"
import Layout from "src/components/layout/layout"
import config from "src/data/internal/SiteConfig"
import styled from "styled-components"
import SEO from "src/components/seo/seo"
import media from "styled-media-query"
import { useRouter } from "next/router"
import { getAbout } from "src/data/external/cms"
import Link from "next/link"
import Image from "next/image"
import HCard from "src/components/microformats/h-card"
import {
  getAllPosts,
  getAllNotes,
  getAllLinks,
  getAllPhotos,
  //getAllRecipes,
  //getAllActivities,
  getLocationData,
  getCV,
} from "src/data/external/cms"

const IndexPageContainer = styled.div`
  max-width: 1200px;
  margin: var(--space) auto;
`

const HeroWrapper = styled.div`
  background: linear-gradient(
    90deg,
    var(--primary-color) 67%,
    var(--primary-color) 33%
  );
  width: 100%;
  margin: auto;
  background-color: #1b2d35;
  background-image: url("/wallpaper/backgroundImage.png");
  background-blend-mode: color-burn;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const Hero = styled.div`
  display: flex;
  max-width: var(--width-container);
  padding: 180px var(--space) var(--space-lg) var(--space);
  margin: 0px auto;
  ${media.lessThan("medium")`
    padding: calc(1rem + 120px) 0 calc(1rem + 60px) 0;
    width: 100%;
    display: block;
  `}
`

const HeroArticle = styled.h1`
  font-size: 4.4em;
  ${media.lessThan("medium")`
  font-size: 3.2em;
  `}
`

const HeroTitle = styled.div`
  color: var(--secondary-color);
  margin-bottom: var(--space);
  font-weight: 900;
  ${media.lessThan("medium")`
    padding: 0 var(--space-sm);
  `}
`

const HeroDescription = styled.h3`
  font-size: 1.3rem;
  color: #f2f2f2;
  font-weight: normal;
  line-height: 1.6;
  ${media.lessThan("medium")`
    padding: 0 var(--space-sm);
  `}
`

const HeroList = styled.ul`
  margin-top: calc(var(--space-lg) * 1.5);
  display: flex;
  justify-content: space-between;
  list-style: none;
  width: 67%;
  font-size: 0.965rem;
  line-height: 1.5;
  color: var(--secondary-color);
  padding-inline-start: 0;
  font-weight: 200;
  ${media.lessThan("medium")`
    padding: 0 var(--space-sm);
    width: 100%;
  `}
`

const HeroListItem = styled.li`
  margin-right: var(--space);
  width: 40%;
`

const HeroImgContainer = styled.figure`
  margin: 0;
  margin-right: 0px;
  z-index: 1;
  width: 310px;
  height: 310px;
  position: relative;
  border: 0.115rem solid #f2f2f2;
  ${media.lessThan("medium")`
    width: 210px;
    height: 210px;
    margin: 100px auto 0 auto;
  `}
`

const HeroImg = styled(Image)`
  width: 310px;
  height: 310px;
  background-color: var(--secondary-color);
  margin-top: -2.435rem;
  margin-left: -2.2rem;
  border-radius: 6px;
  ${media.lessThan("medium")`
  width: 210px;
  height: 210px; 
  `}
`

const HeroLinks = styled.a`
  font-weight: 600;
  border-bottom: 2px solid var(--thirdy-color);
  font-family: var(--primary-font);
  color: var(--secondary-color);
  :hover {
    border-bottom: 2px solid transparent;
  }
`

const HeroLinksNormal = styled.a`
  border-bottom: 2px solid var(--thirdy-color);
  font-family: var(--primary-font);
  color: var(--secondary-color);
  :hover {
    border-bottom: 2px solid transparent;
  }
`

const HeroFont = styled.span`
  font-family: var(--primary-font);
  font-weight: 600;
`

const AboutMeLink = styled.a`
  border-bottom: 2px solid var(--thirdy-color);
  cursor: pointer;
  :hover {
    border-bottom: 2px solid transparent;
  }
`

const RecentPosts = styled.ol`
  display: grid;
  margin: auto;
  margin-left: 0;
  padding-left: var(--space);
  padding-right: var(--space);
  margin-bottom: var(--space-lg);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space);
  list-style: none;
  ${media.lessThan("medium")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  `}
`
const jsonld = {
  "@context": "http://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "SiteNavigationElement",
      "position": 1,
      "name": "Now",
      "description": "What's happening right now",
      "url": "http://www.mxd.codes/now",
    },
    {
      "@type": "SiteNavigationElement",
      "position": 2,
      "name": "Articles",
      "description": "Tutorials, Guides and thoughts.",
      "url": "http://www.mxd.codes/articles",
    },
    {
      "@type": "SiteNavigationElement",
      "position": 3,
      "name": "Photos",
      "description": "Photos taken by me",
      "url": "http://www.mxd.codes/photos",
    },
    {
      "@type": "SiteNavigationElement",
      "position": 4,
      "name": "Notes",
      "description": "Status updates and short notes",
      "url": "http://www.mxd.codes/notes",
    },
    {
      "@type": "SiteNavigationElement",
      "position": 5,
      "name": "Links",
      "description": "Awesome content on the web, in random order",
      "url": "http://www.mxd.codes/links",
    },
    {
      "@type": "SiteNavigationElement",
      "position": 6,
      "name": "Dashboard",
      "description": "Awesome content on the web, in random order",
      "url": "https://mxd.codes/dashboard",
    },
    {
      "@type": "SiteNavigationElement",
      "position": 7,
      "name": "Contact",
      "description": "Contact information",
      "url": "https://mxd.codes/contact",
    },
    {
      "@type": "SiteNavigationElement",
      "position": 8,
      "name": "Feeds",
      "description":
        "You can subscribe to all content or individual content types",
      "url": "https://mxd.codes/feeds",
    },
  ],
}

export default function Index({ posts, cv }) {
  const router = useRouter()
  const content = posts.slice(0, 6)

  return (
    <>
      <Layout color="#f2f2f2">
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO
              description={`Hi, I'm Max Dietrich. I currently work as ${cv.timeline[0].role} at ${cv.timeline[0].company}. Beside that I ride my mountain bike in the alps, code and design my website and publish new content whenever i can.`}
              jsonld={jsonld}
            />
            <HeroWrapper className="h-card" color="#f2f2f2">
              <Hero>
                <HCard />
                <HeroArticle>
                  <HeroTitle>
                    Geospatial
                    <br />
                    Developer.
                  </HeroTitle>
                  <HeroDescription>
                    Hi, I'm{" "}
                    <HeroLinks
                      className="p-name u-url u-uid"
                      rel="author me"
                      href={config.siteUrl}
                      title={config.siteTitle}
                    >
                      Max Dietrich
                    </HeroLinks>
                    , developer and cyclist from{" "}
                    <a
                      className="p-locality"
                      href="https://www.openstreetmap.org/search?query=rosenheim#map=13/47.8481/12.1035"
                      title="Rosenheim, Germany"
                    >
                      Rosenheim, Germany.
                    </a>{" "}
                  </HeroDescription>
                  <HeroList aria-label="Highlights.">
                    <HeroListItem>
                      {" "}
                      I' am also a proud member of the{" "}
                      <HeroLinks
                        className="p-org h-card"
                        href="https://indieweb.org/"
                        title="IndieWeb"
                      >
                        IndieWeb
                      </HeroLinks>{" "}
                      community.
                    </HeroListItem>
                    <HeroListItem>
                      I've been{" "}
                      <HeroLinksNormal href="/map" title="Location tracking">
                        tracking my location
                      </HeroLinksNormal>{" "}
                      since 2021.{` `}
                      <Link href="/about" passHref legacyBehavior>
                        <AboutMeLink title="About me">Read more.</AboutMeLink>
                      </Link>
                    </HeroListItem>
                  </HeroList>
                </HeroArticle>
                <HeroImgContainer>
                  <HeroImg
                    src="/logos/windows/windowsphone-mediumtile-360-360.png"
                    width="310"
                    height="310"
                    title="Photo of Max."
                    alt="Photo of Max."
                    aria-label="Photo of Max."
                    role="img"
                    priority
                  />
                </HeroImgContainer>
              </Hero>
            </HeroWrapper>

            <IndexPageContainer>
              <RecentPosts>
                {content.map((post, i) =>
                  post.type === "article" ? (
                    <PostPreview key={i} postData={post.post} />
                  ) : post.type === "note" ? (
                    <NotePreview key={i} note={post.note} />
                  ) : post.type === "link" ? (
                    <LinkPreview key={i} link={post.link} />
                  ) : post.type === "photo" ? (
                    <PhotoPreview key={i} photo={post.photo} />
                  ) : null
                )}
              </RecentPosts>

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
  const allPhotos = (await getAllPhotos()) || []
  const cv = (await getCV()) || []

  const allContent = []

  allPosts.map((post) => {
    allContent.push({
      post: post,
      date: post.published_at,
      type: "article",
    })
  })

  allNotes.map((note) => {
    allContent.push({
      note: note,
      date: note.published_at,
      type: "note",
    })
  })

  allLinks.map((link) => {
    allContent.push({
      link: link,
      date: link.published_at,
      type: "link",
    })
  })

  allPhotos.map((photo) => {
    allContent.push({
      photo: photo,
      date: photo.published_at,
      type: "photo",
    })
  })

  const sortedContent = allContent.sort((a, b) => (a.date < b.date ? 1 : -1))

  return {
    revalidate: 86400,
    props: {
      posts: sortedContent,
      //count: stats.posts.count,
      about: about.about,
      location: locationData[0],
      cv,
    },
  }
}
