import Layout from "@/src/components/layout/layout"
import { getPhotoBySlug, getAllPhotoSlugs } from "@/src/data/external/cms"
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
  id: number
  attributes: {
    title: string
    slug: string
    updatedAt: string
    publishedAt: string
    description: string
    content: string
    syndicationLinks: Array<any>
    photo: any
    tags: any
    author: any
  }
  meta?: any
}

export default function Photo(photo: Photo) {
  return (
    <Layout>
      <article className="h-entry">
        <SEO
          title={photo.attributes.title}
          description={photo.attributes.description}
          slug={`/photos/${photo.attributes.slug}`}
        />
        <PageTitle>{photo.attributes.title}</PageTitle>
        <PageWrapper>
          <HCard />
          <PhotoList>
            {photo.attributes.photo.map((photo: any, i: number) => {
              return (
                <PhotoItem key={photo.id}>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${photo.attributes.url}`}
                    passHref
                    legacyBehavior
                  >
                    {i === 0 ? (
                      <img
                        key={photo.id}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${
                          photo.attributes.formats.content
                            ? photo.attributes.formats.content.url
                            : photo.attributes.url
                        }`}
                        alt={`Photo ${photo.attributes.name}`}
                        width={photo.attributes.width}
                        height={photo.attributes.height}
                        className="u-photo"
                      />
                    ) : (
                      <img
                        key={photo.id}
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${
                          photo.attributes.formats.content
                            ? photo.attributes.formats.content.url
                            : photo.attributes.url
                        }`}
                        alt={`Photo ${photo.attributes.name}`}
                        width={photo.attributes.width}
                        height={photo.attributes.height}
                        className="u-photo"
                      />
                    )}
                  </Link>
                </PhotoItem>
              )
            })}
          </PhotoList>

          <PageBody content={photo.attributes.content} />
          {/*<TagsWrapper><PhotoTags tags={photo.tags}/></TagsWrapper> */}

          <WebActions
            slug={`/photos/${photo.attributes.slug}`}
            title={photo.attributes.title}
            excerpt={
              photo.attributes.description
                ? photo.attributes.description
                : photo.attributes.title
            }
            syndicationLinks={photo.attributes.syndicationLinks}
          />
          <Meta
            post={photo}
            slug={`/photos/${photo.attributes.slug}`}
            syndicationLinks={photo.attributes.syndicationLinks}
          />
          <Webmentions
            slug={`/photos/${photo.attributes.slug}`}
            preview={false}
          />
        </PageWrapper>
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const photo = await getPhotoBySlug(params.slug)
  const content: object = await serialize(photo[0].attributes.description)
  return {
    revalidate: 86400,
    props: {
      id: photo[0].id,
      attributes: {
        updatedAt: new Date(photo[0].attributes.updatedAt).toLocaleDateString(
          "en-US"
        ),
        publishedAt: new Date(
          photo[0].attributes.publishedAt
        ).toLocaleDateString("en-US"),
        title: photo[0].attributes.title,
        slug: photo[0].attributes.slug,
        description: photo[0].attributes.description,
        content: content,
        tags: photo[0].attributes.tags.data,
        photo: photo[0].attributes.photo.data,
        syndicationLinks: photo[0].attributes.syndicationLinks,
      },
    },
  }
}

export async function getStaticPaths() {
  const photos = await getAllPhotoSlugs()
  return {
    paths: photos.map((photo) => `/photos/${photo.attributes.slug}`),
    fallback: false,
  }
}
