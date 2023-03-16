import PostPreview from "src/components/article/article-preview/article-preview"
import NotePreview from "src/components/note/note-preview/note-preview"
import LinkPreview from "src/components/link/link-preview/link-preview"
import TypeWriter from "@/src/utils/typeWriter"
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
  max-width: var(--width-container);
  margin: var(--space) auto;
`

const HeroWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(
    90deg,
    var(--primary-color) 67%,
    var(--primary-color) 33%
  );
  width: 100%;
  height: 100vh;
  margin: auto;
  background-color: var(--secondary-color);
  background-image: url("/wallpaper/backgroundImage.webp");
  background-blend-mode: color-burn;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  ${media.lessThan("medium")`  
    align-items: flex-start;
    height: auto;
  `}
`

const HeroOffset = styled.div`
  margin: 0 auto;
`

const Hero = styled.div`
  display: flex;
  max-width: var(--width-container);
  padding: 100px var(--space) var(--space-lg) var(--space);
  margin: 0px auto;
  ${media.lessThan("large")`
    padding: calc(var(--space-lg)*1.75) 0 calc(1rem + 60px) 0;
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
  color: var(--primary-color);
  font-weight: 900;
  ${media.lessThan("large")`
    padding: 0 var(--space-sm);
  `}
`

const HeroSubTitle = styled.div`
  font-weight: normal;
  font-size: 55px;
  color: #f2f2f2;
  ${media.lessThan("large")`
    padding: 0 var(--space-sm);
    font-size: 45px;
  `}
`

const HeroDescription = styled.p`
  margin-top: var(--space-sm);
  font-size: 1.3rem;
  color: #f2f2f2;
  font-weight: normal;
  line-height: 1.6;
  ${media.lessThan("large")`
    padding: 0 var(--space-sm);
  `}
`

const HeroList = styled.ul`
  margin-top: calc(var(--space-lg) * 1.5);
  display: flex;
  justify-content: space-between;
  list-style: none;
  font-size: 0.965rem;
  line-height: 1.5;
  color: var(--primary-color);
  padding-inline-start: 0;
  font-weight: 200;
  ${media.lessThan("large")`
    padding: 0 var(--space-sm);
    width: 100%;
  `}
`

const HeroListItem = styled.li`
  margin-right: var(--space);
  width: 40%;
`

const HeroImgContainer = styled.figure`
  margin-top: 100px;
  margin-left: var(--space-lg);
  margin-right: auto;
  z-index: 1;
  min-width: 310px;
  height: 312px;
  position: relative;
  border: 1px solid #f2f2f2;
  border-radius: 6px;
  ${media.lessThan("large")`
    margin-left: auto;
    width: 310px;
    height: 310px;
  `}
  ${media.lessThan("medium")`
    width: 210px;
    min-width: 210px;
    height: 210px;
  `}
`

const HeroImg = styled(Image)`
  width: 310px;
  height: auto;
  background-color: var(--secondary-color);
  opacity: 0.96;
  margin-top: -2.2rem;
  margin-left: -2.2rem;
  border-radius: 6px;
  ${media.lessThan("medium")`
    width: 210px;
    height: auto;
  `}
`

const HeroLinks = styled.a`
  font-weight: 600;
  border-bottom: 2px solid var(--thirdy-color);
  font-family: var(--primary-font);
  color: var(--primary-color);
  :hover {
    border-bottom: 2px solid transparent;
  }
`

const HeroLinksNormal = styled.a`
  border-bottom: 2px solid var(--thirdy-color);
  font-family: var(--primary-font);
  color: var(--primary-color);
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: masonry;
  gap: var(--space);
  list-style: none;
  ${media.lessThan("medium")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  `}
`

const CopyrightNotice = styled.span`
  position: absolute;
  font-size: 10px;
  bottom: 10px;
  right: var(--space-sm);
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
  const content = posts.slice(0, 12)

  const text = "I build maps for the web."

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
              {/*<HeroBackgroundImage>
            <Image
              alt="Mountains"
              src="https://mxd.codes/wallpaper/backgroundImage.png"
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            />
            </HeroBackgroundImage>*/}
              <HeroOffset>
                <Hero>
                  <HCard />
                  <HeroArticle>
                    <HeroDescription>Hi, my name is</HeroDescription>
                    <HeroTitle>
                      <span className="p-name u-url u-uid" rel="author me">
                        Max Dietrich.
                      </span>
                    </HeroTitle>
                    <HeroSubTitle>
                      <TypeWriter content={text} speed={90} />
                    </HeroSubTitle>
                    <HeroDescription>
                      I'm a software developer and cyclist from{" "}
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
                        <HeroLinksNormal
                          href="/map"
                          title="How i constantly track my location and display a web-map with all the locations"
                        >
                          tracking my location{` `}
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
              </HeroOffset>
              <CopyrightNotice>
                map data ©{" "}
                <a
                  href="openstreetmap.org/copyright"
                  title="OpenStreetMap"
                  alt="OpenStreetMap"
                >
                  OSM
                </a>
              </CopyrightNotice>
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
