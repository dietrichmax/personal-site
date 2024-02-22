import React, { useState, useEffect } from "react"
import Image from "next/image"
import MDXWrapper from "@/components/mdxWrapper"
import Content from "@/src/components/article/article-body/article-body"
import Layout from "@/src/components/layout/layout"
import { getAbout } from "@/src/data/external/cms"
import styled from "styled-components"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import { serialize } from "next-mdx-remote/serialize"
import { MDXRemote } from "next-mdx-remote"

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
        return about.bioShort //Short
      case 1:
        return about.bioMedium //bioMedium
      case 2:
        return about.bioLong //.bioLong
    }
  }

  return (
    <Layout>
      <SEO
        title={about.attributes.title}
        description={about.attributes.intro}
        slug={`about`}
        aboutSchema
        jsonld={jsonld}
      />

      <ImageWrapper>
        <Image
          src="/images/IMG_20231229_WA_0005_1925a8f37e.jpg"
          width="620"
          height="300"
          title={about.attributes.title}
          alt={about.attributes.title}
          className="profile u-photo"
        />
      </ImageWrapper>

      <PageWrapper>
        <Title>{about.attributes.title}</Title>
        <Intro>{about.attributes.intro}</Intro>
        <BioContainer>
          <MDXRemote
            {...about.attributes.bioLong}
            className="e-content"
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          />
          <Content content={about.attributes.bioLong} />
        </BioContainer>
      </PageWrapper>
    </Layout>
  )
}

export async function getStaticProps({}) {
  const about: any = await getAbout()
  const bioLong = await serialize(about.attributes.bioLong)
  const bioMedium = await serialize(about.attributes.bioMedium)
  const bioShort = await serialize(about.attributes.bioShort)

  return {
    props: {
      about: {
        id: about.id,
        attributes: {
          title: about.attributes.title,
          intro: about.attributes.intro,
          bioLong,
          bioMedium,
          bioShort,
        },
      },
    },
  }
}
