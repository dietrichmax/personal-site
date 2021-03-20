import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import Content from '@/components/article/article-body/article-body'
import Layout from '@/components/layout/layout'
import { getAbout } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig";
import Link from "next/link"

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space) auto var(--space) auto;
  padding: 0 var(--space);
  ${media.lessThan('large')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const ImageWrapper = styled.div`
  max-width: 1200px;
  margin: calc(var(--space-lg)*2.5) auto 0 auto;
  padding-top: 11px;
  padding-left: var(--space);
  ${media.lessThan('medium')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
    margin: calc(var(--space-lg)*2.5) auto var(--space-sm) auto;
  `}
`

const Title = styled.h1`
  font-size: 3rem;
  text-transform: capitalize;
  margin-top: var(--space);
  margin-bottom: var(--space);
  ${media.lessThan('medium')`
    font-size: 2rem;
`}
`

const Intro = styled.p`
  font-size: 1.25rem;
  max-width: var(--content-width);
  margin: var(--space-sm) 0;
  line-height: 1.75rem;
  font-family: var(--secondary-font);
`

const BioContainer = styled.section`
font-family: var(--secondary-font);
`


export default function About({ about }) {
  const router = useRouter()
  const [selected, setSelected] = useState(2);

  const renderBio = () => {
    switch (selected) {
      case 0:
        return about.bioShort
      case 1:
        return about.bioMedium
      case 2:
        return about.bioLong
    }
  };
  const handleSubmit = () => {

    
  }
  
  return (
    <Layout>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO   
              title={about.title}
              description=""
              slug={`about`}
              aboutSchema
            />

            <ImageWrapper>
              <Image
                src="/logos/windows10/SplashScreen.scale-100.png"
                width="620"
                height="300"
                title={about.title}
                alt={about.title}
              />
            </ImageWrapper>

            <PageWrapper>  

              <Title>{about.title}</Title>
              <Intro>{about.intro}</Intro>
              <BioContainer>
                <Content content={renderBio()} />
              </BioContainer>

            </PageWrapper>
          </>
        )}
    </Layout>
  )
}


export async function getStaticProps({  }) {
  const data = await getAbout()

  return {
    props: {
      about: {
        ...data?.about,
      },
    },
  }
}
