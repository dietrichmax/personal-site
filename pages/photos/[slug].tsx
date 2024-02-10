import Layout from "@/src/components/layout/layout"
import { getPhoto, getAllPhotos } from "@/src/data/external/cms"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import Webmentions from "@/src/components/social/webmentions/webmentions"
import Link from "next/link"
import PageTitle from "@/src/components/title/page-title"
import PageBody from "@/src/components/article/article-body/article-body"
import WebActions from "@/src/components/social/social-share/social-share"
import Meta from "@/src/components/post/post-meta/post-meta"
import HCard from "@/src/components/microformats/h-card"
import { serialize } from "next-mdx-remote/serialize"

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

interface Photo {
  title: string
  description: string
  slug: string
  id: number
  formats: {
    content: {
      url: string
    }
  }
  url: string
  photo: any
  width: number
  height: number
  content: string
  syndicationLinks: any
}

export default function Photo({ photo }: Photo) {
  return (
    <Layout>
      <article className="h-entry">
        <SEO
          title={photo.title}
          description={photo.description}
          slug={`/photos/${photo.slug}`}
        />
        <PageTitle>{photo.title}</PageTitle>
        <PageWrapper>
          <HCard />
          <PhotoList>
            {photo.photo
              ? photo.photo.map((photo: Photo, i: number) => {
                  return (
                    <PhotoItem key={i}>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${photo.url}`}
                        passHref
                        legacyBehavior
                      >
                        {i === 0 ? (
                          <img
                            key={photo.id}
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${
                              photo.formats.content
                                ? photo.formats.content.url
                                : photo.url
                            }`}
                            alt={`Photo ${i}`}
                            width={photo.width}
                            height={photo.height}
                            className="u-photo"
                          />
                        ) : (
                          <img
                            key={photo.id}
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${
                              photo.formats.content
                                ? photo.formats.content.url
                                : photo.url
                            }`}
                            alt={`Photo ${i}`}
                            width={photo.width}
                            height={photo.height}
                            className="u-photo"
                          />
                        )}
                      </Link>
                    </PhotoItem>
                  )
                })
              : console.log("no images found")}
          </PhotoList>
          <PageBody content={photo.content} />
          {/*<TagsWrapper><PhotoTags tags={photo.tags}/></TagsWrapper> */}

          <WebActions
            slug={`/photos/${photo.slug}`}
            title={photo.title}
            excerpt={photo.description ? photo.description : photo.title}
            syndicationLinks={photo.syndicationLinks}
          />
          <Meta
            post={photo}
            slug={`/photos/${photo.slug}`}
            syndicationLinks={photo.syndicationLinks}
          />
          <Webmentions slug={`/photos/${photo.slug}`} preview={false} />
        </PageWrapper>
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const data: any = await getPhoto(params.slug)
  const content: object = await serialize(data.photos[0].description)
  return {
    revalidate: 86400,
    props: {
      photo: {
        ...data?.photos[0],
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const photos = (await getAllPhotos()) || []

  return {
    paths: photos?.map((photo: Photo) => `/photos/${photo.slug}`) || [],
    fallback: false,
  }
}
