import { useRouter } from "next/router"
import Layout from "src/components/layout/layout"
import { getPhoto, getAllPhotos } from "src/data/external/cms"
import styled from "styled-components"
import SEO from "src/components/seo/seo"
import media from "styled-media-query"
import config from "src/data/internal/SiteConfig"
import Webmentions from "src/components/social/webmentions/webmentions"
import Image from "next/image"
import Link from "next/link"
import PageTitle from "src/components/title/page-title"
import PageBody from "src/components/article/article-body/article-body"
import WebActions from "src/components/social/social-share/social-share"
import Meta from "src/components/post/post-meta/post-meta"
import HCard from "src/components/microformats/h-card"
import PhotoTags from "src/components/tags/tags"

const PageWrapper = styled.div`
  position: relative;
  max-width: var(--width-container);
  padding: 0 var(--space);
  margin: var(--space-sm) auto;
  ${media.lessThan("medium")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const PhotoList = styled.ol`
  list-style: none;
  padding-inline-start: 0;
`

const PhotoItem = styled.li`
  margin-bottom: var(--space);
`

const TagsWrapper = styled.div`
  margin: var(--space-sm) 0;
`

export default function Photo({ photo }) {
  const router = useRouter()

  return (
    <Layout>
      {router.isFallback ? (
        <PageTitle>{config.loading}</PageTitle>
      ) : (
        <article className="h-entry">
          <SEO
            title={photo.title}
            description={photo.description}
            slug={`/photos/${photo.slug}`}
            date={photo.updated_at ? photo.updated_at : photo.published_at}
          />
          <PageTitle className="p-name">{photo.title}</PageTitle>
          <PageWrapper>
            <HCard />
            <PhotoList>
              {photo.photo
                ? photo.photo.map((photo, i) => {
                    return (
                      <PhotoItem key={i}>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${photo.url}`}
                          passHref
                          legacyBehavior
                        >
                          <Image
                            key={photo.id}
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${
                              photo.formats.content
                                ? photo.formats.content.url
                                : photo.url
                            }`}
                            alt={photo.title}
                            width="1136"
                            height={parseInt(
                              (1136 / photo.width) * photo.height
                            )}
                            className="u-photo"
                          />
                        </Link>
                      </PhotoItem>
                    )
                  })
                : console.log("no images found")}
            </PhotoList>
            <PageBody className="e-content" content={photo.description} />
            {/*<TagsWrapper><PhotoTags tags={photo.tags}/></TagsWrapper> */}

            <WebActions slug={`/photos/${photo.slug}`} />
            <Meta
              post={photo}
              slug={`/photos/${photo.slug}`}
              syndicationLinks={photo.syndicationLinks}
            />
            <Webmentions slug={`/photos/${photo.slug}`} />
          </PageWrapper>
        </article>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data = await getPhoto(params.slug)

  return {
    props: {
      photo: {
        ...data?.photos[0],
      },
    },
  }
}

export async function getStaticPaths() {
  const photos = (await getAllPhotos()) || []

  return {
    paths: photos?.map((photo) => `/photos/${photo.slug}`) || [],
    fallback: true,
  }
}
