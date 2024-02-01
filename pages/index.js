import PostPreview from "src/components/article/article-preview/article-preview"
import LinkPreview from "src/components/link/link-preview/link-preview"
import TypeWriter from "@/src/utils/typeWriter"
import PhotoPreview from "src/components/photo/photo-preview"
import Layout from "src/components/layout/layout"
import styled from "styled-components"
import SEO from "src/components/seo/seo"
import media from "styled-media-query"
import { getAbout } from "src/data/external/cms"
import Link from "next/link"
import Image from "next/image"
import HCard from "src/components/microformats/h-card"
import {
  getAllPosts,
  getAllLinks,
  getAllPhotos,
  getCV,
} from "src/data/external/cms"
import { Client } from "pg"
import axios from 'axios';
import fs from "fs"

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
  background-image: url("wallpaper/backgroundImage.webp");
  background-color: var(--secondary-color);
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
  font-size: 48px;
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
  margin-top: var(--space);
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
  height: 230px;
  position: relative;
  border: 2px solid #f2f2f2;
  border-radius: 6px;
  ${media.lessThan("large")`
    margin-left: auto;
    width: 310px;
    height: 230px;
  `}
  ${media.lessThan("medium")`
    width: 210px;
    min-width: 210px;
    height: 150px;
  `}
`

const HeroImg = styled(Image)`
  height: auto;
  background-color: var(--secondary-color);
  opacity: 0.96;
  margin-top: -2.2rem;
  margin-left: -2.2rem;
  border-radius: 6px;
  width: 310px;
  height: 230px;
  ${media.lessThan("medium")`
    width: 210px;
    height: 150px;
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
  const text = "Welcome to my personal website."

  return (
    <>
      <Layout color="#f2f2f2">
        <SEO
          description={`Hi, I'm Max Dietrich. I currently work as ${cv.timeline[0].role} at ${cv.timeline[0].company}. Beside that I ride my mountain bike in the alps, code and design my website and publish new content whenever i can.`}
          jsonld={jsonld}
        />
        <HeroWrapper className="h-card" color="#f2f2f2">
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
                  <h1>
                    <TypeWriter content={text} speed={90} />
                  </h1>
                </HeroSubTitle>
                <HeroDescription>
                  I'm a software developer and cyclist from{" "}
                  <a
                    className="p-locality"
                    href="https://www.openstreetmap.org/search?query=wasserburg%20am%20inn#map=14/48.0499/12.2101"
                    title="Wasserburg am Inn, Germany"
                  >
                    Wasserburg am Inn, Germany.
                  </a>{" "}
                </HeroDescription>
                <HeroDescription>
                  On this website I am sharing my learnings about
                  web-development and creating web-maps.
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
                  src="/uploads/IMG_20231229_WA_0005_1925a8f37e_ed04442bf5.webp"
                  width={308}
                  height={308}
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
            {posts.map((post, i) =>
              post.type === "article" ? (
                <PostPreview key={i} postData={post.post} />
              ) : post.type === "link" ? (
                <LinkPreview key={i} link={post.link} />
              ) : post.type === "photo" ? (
                <PhotoPreview key={i} photo={post.photo} />
              ) : null
            )}
          </RecentPosts>
        </IndexPageContainer>
      </Layout>
    </>
  )
}

export async function getStaticProps() {

  // Get recent location
  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  })
  await client.connect()
  const recentLocation = await client.query(
    "SELECT lat, lon FROM locations ORDER BY id DESC LIMIT 1;"
  )
  await client.end()


  // Get Background Image
  const height = 1000 
  const width = 2000 
  const center = `${recentLocation.rows[0].lon},${recentLocation.rows[0].lat}`
  const zoom = 13 
  const tileUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
  const format = "webp"
  const backgroundImageUrl = `${process.env.NEXT_PUBLIC_STATICMAPS_URL}v1?width=${width}&height=${height}&zoom=${zoom}&center=${center}&tileUrl=${tileUrl}&format=${format}`
  const backgroundImageFilePath = "public/wallpaper/backgroundImage.webp"
  console.log(backgroundImageUrl)
  const imageResponse = await axios.get(backgroundImageUrl, {
    responseType: 'arraybuffer',
  });
  fs.writeFile(backgroundImageFilePath, imageResponse.data, (err) => {if (err) throw err});

  // get all content
  const about = await getAbout()
  const allPosts = (await getAllPosts()) || []
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

  // order all content by date
  const sortedContent = allContent
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 12)

  return {
    revalidate: 300,
    props: {
      posts: sortedContent,
      //count: stats.posts.count,
      about: about.about,
      cv,
    },
  }
}
