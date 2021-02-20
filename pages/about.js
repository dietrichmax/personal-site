import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import Content from '@/components/post/post-body/post-body'
import Layout from '@/components/layout/layout'
import { getAbout } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig";

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

const BioTitle = styled.p`
  font-size: .875rem;
  margin-bottom: .5rem;
  color: var(--gray);
`

const BioWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const BioDescription = styled.p`
  font-size: .875rem;
  margin-right: .75rem;
  color: var(--gray);
`

const BioToggle = styled.button`        
  height: 25px;
  width: 25px;
  background-color: ${props => props.checked ? 'var(--thirdy-color)' : 'var(--color-bg)'};
  border: 4px solid ${props => props.checked ? 'var(--gray-light)' : 'var(--gray-light)'};
  border-radius: 50%;
  display: inline-block;
  margin-right: .5rem;
  background-image: ${props => props.checked ? `url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3E%3C/svg%3E")` : 'none'};

  `


export default function About({ about }) {
  const router = useRouter()
  const [selected, setSelected] = useState(1);

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
            />

            <ImageWrapper>
              <Image
                src="https://source.unsplash.com/650x500/?nature,water"
                width="670"
                height="380"
              />
            </ImageWrapper>

            <PageWrapper>  

              <Title>{about.title}</Title>
              <Intro>{about.intro}</Intro>

              <BioContainer>
                <BioTitle>How much do you want to know?</BioTitle>
                <BioWrapper>
                  <BioDescription>Not much</BioDescription>
                  {[0, 1, 2].map((item) => (
                    <BioToggle
                      key={"checkbox:" + item}
                      type="checkbox"
                      checked={selected === item}
                      onClick={() => setSelected(item)}
                      className="form-checkbox cursor-pointer h-6 w-6 md:h-8 md:w-8 rounded-full  bg-default  transition duration-150 ease-in-out mr-3 border-4 border-accent"
                    />
                  ))}
                  <BioDescription>Everything</BioDescription>
                </BioWrapper>
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
