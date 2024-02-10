import React, { useState } from "react"
import Image from "next/image"
import Content from "@/src/components/article/article-body/article-body"
import Layout from "@/src/components/layout/layout"
import { getAbout } from "@/src/data/external/cms"
import PageTitle from "@/src/components/title/page-title"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import { config } from "@/src/data/internal/SiteConfig"
import { serialize } from "next-mdx-remote/serialize"

const PageWrapper = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto var(--space) auto;
  padding: 0 var(--space);
  ${media.lessThan("large")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const ImageWrapper = styled.div`
  max-width: 1200px;
  margin: calc(var(--space-lg) * 2.5) auto 0 auto;
  padding-top: 11px;
  padding-left: var(--space);
  ${media.lessThan("medium")`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    margin: calc(var(--space-lg)*2.5) auto var(--space-sm) auto;
  `}
`

const Title = styled.h1`
  font-size: 3rem;
  margin-top: var(--space);
  margin-bottom: var(--space);
  ${media.lessThan("medium")`
    font-size: 2rem;
`}
`

const Intro = styled.p`
  font-size: 1.25rem;
  max-width: var(--content-width);
  margin: var(--space) 0;
  line-height: 1.75rem;
  font-family: var(--secondary-font);
`

const BioContainer = styled.section`
  font-family: var(--secondary-font);
`

const jsonld = {
  "@context": "http://schema.org/",
  "@type": "AboutPage",
  "mainContentOfPage": "https://www.mxd.codes/about",
  "description": "About me",
}

export default function About({ about }) {
  const [selected, setSelected] = useState<number>(2)

  const renderBio = () => {
    switch (selected) {
      case 0:
        return about.bio //Short
      case 1:
        return about.bio //bioMedium
      case 2:
        return about.bio //.bioLong
    }
  }
  const handleSubmit = () => {}

  return (
    <Layout>
      <SEO
        title={about.title}
        description=""
        slug={`about`}
        aboutSchema
        jsonld={jsonld}
      />

      <ImageWrapper>
        <Image
          src="/images/IMG_20231229_WA_0005_1925a8f37e.jpg"
          width="620"
          height="300"
          title={about.title}
          alt={about.title}
          className="profile u-photo"
        />
      </ImageWrapper>

      <PageWrapper>
        <Title>{about.title}</Title>
        <Intro>{about.intro}</Intro>
        <BioContainer>
          <Content content={about.bio} />
        </BioContainer>
      </PageWrapper>
    </Layout>
  )
}

export async function getStaticProps({}) {
  const data = await getAbout()
  const bio = await serialize(data.about.bioLong)

  return {
    props: {
      about: {
        ...data?.about,
        bio,
      },
    },
  }
}
