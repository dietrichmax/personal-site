import { useRouter } from 'next/router'
import Layout from '@/components/layout/layout'
import { getPhoto, getAllPhotos } from '@/lib/data/external/cms'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/internal/SiteConfig";
import Webmentions from "@/components/social/webmentions/webmentions"
import Image from "next/image"
import Link from "next/link"
import PageTitle from '@/components/title/page-title'
import PageBody from '@/components/article/article-body/article-body'
import WebActions from "@/components/social/feedback/feedback"
import SyndicationLinks from "@/components/microformats/syndication-links"
import PhotoMeta from "@/components/note/note-meta/note-meta"
import HCard from "@/components/microformats/h-card"
import PhotoTags from '@/components/tags/tags'

const PageWrapper = styled.div`
position: relative;
  max-width: var(--width-container);
  padding: 0 var(--space);
  margin: var(--space-sm) auto;
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const PhotoList = styled.ol`;
  list-style: none;
  padding-inline-start:0;
`

const PhotoItem = styled.li`;

`

const TagsWrapper = styled.div`
  margin: var(--space-sm) 0;
`


const MetaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-top: var(--space-sm);
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
                {photo.photo ? photo.photo.map((photo,i) => {
                  return (
                    <PhotoItem key={i}>
                      <Link href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${photo.url}`} passHref>
                        <Image
                          key={photo.id}
                          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${photo.formats.content ? photo.formats.content.url : photo.url }`}
                          alt={photo.title}
                          width="1136"
                          height={parseInt((1136/photo.width)*photo.height)}
                          className="u-photo" 
                        />
                      </Link>
                    </PhotoItem> 
                  )
                }) : console.log("no images found")}
                  
                </PhotoList>
              <PageBody className="e-content" content={photo.description} />
              <TagsWrapper><PhotoTags tags={photo.tags}/></TagsWrapper> 
              
              <MetaWrapper>
                <PhotoMeta note={photo} />
                <SyndicationLinks syndicationLinks={photo.syndicationLinks} />
              </MetaWrapper>
              
              <WebActions slug={`/photos/${photo.slug}`} />
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
