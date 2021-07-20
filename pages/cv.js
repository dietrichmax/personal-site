import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import Content from '@/components/article/article-body/article-body'
import Layout from '@/components/layout/layout'
import { getCV } from '@/lib/data/external/cms'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/internal/SiteConfig";
import ReactMarkdown from "react-markdown"
import markdownStyles from '@/styles/markdown-styles.module.css'
import { FaRegQuestionCircle, FaRetweet, FaRegComment } from 'react-icons/fa';
import { isExists } from "date-fns"
import { data } from "remark"




const ResumeWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space) auto var(--space) auto;
  padding: 0 var(--space);
  ${media.lessThan('large')`
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const Paper = styled.section`
  width: 210mm;
  height: 297mm;
  background-color: var(--content-bg);
  padding: var(--space-sm);
  ${media.lessThan('830px')`
    max-width: 100%;
    height: 100%;
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
`

const SubTitle = styled.h2`
  font-weight: 500;
`

const SmallBio = styled.p`
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--gray-light);
  font-size: 14px;
`

const Grid = styled.div`
  grid-template-columns: repeat(4,minmax(0,1fr));
  display: grid;
  gap: var(--space);
  font-size: 14px;
  ${media.lessThan('830px')`
    gap: var(--space-sm);
  `}
`

const CVHeader = styled.div`
  display: flex;
`

const CVTitle = styled.div`
  flex-direction: column;
  display: flex;
  width: 75%;
  margin-right: var(--space-lg);
`

const CVImage = styled.div`
  margin-right: 0;
  margin-left: auto;
  width: 125px;

`


const Col1 = styled.div`
  grid-column: span 1/span 1;
  ${media.lessThan('830px')`
    grid-column: span 4/span 4;
    order: 2;
  `}

  `

const Col2 = styled.div`
  grid-column: span 3/span 3;
  ${media.lessThan('830px')`
    grid-column: span 4/span 4;
    order: 1;
  `}
`

const ColTitle = styled.h3`
  font-weight: 400;
  color: var(--secondary-color);
  text-transform: uppercase;
  margin-bottom: .25rem;
`

const Skill = styled.p``

const SkillGrid = styled.div`
  grid-template-columns: repeat(2,minmax(0,1fr));
  display: grid;
  gap: .125rem;
`

const TimelineItem = styled.div`
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--thirdy-color);

`

const TimelineTitle = styled.h4`
  font-weight: 700;
  font-style: italic;
  font-size: 1rem;
`

const TimelineCompany = styled.h5`
  font-weight: 600;
`

const TimelineLongDescription = styled.div`
  margin-bottom: .25rem
`

const TimelineTags = styled.p`
  color: var(--secondary-color);
`

const Col1Item = styled.div`
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--thirdy-color);
`

const Education = styled.div`
  margin-bottom: var(--space-sm);
`

const EducationTitle = styled.p`
  font-weight: 600;
`

const Interests = styled.div`
  margin-bottom: var(--space-sm);
`
const Credit = styled.p`
  font-size: .75rem;
`


export default function CV({ cv }) {
  const router = useRouter()



  return (
    <Layout>
      {router.isFallback ? (
        <PageTitle>{config.loading}</PageTitle>
      ) : (
        <>
          <SEO   
            title="CV"
            description="Curriculum Vitae"
            slug={`cv`}
          />
          
          <PageTitle>CV</PageTitle>

          <ResumeWrapper className="h-resume resume"> 

            <Paper>
              <CVHeader>
                <CVTitle>
                  <Title>{cv.title}</Title>
                  <SubTitle>{cv.subtitle}</SubTitle>
                  <SmallBio>{cv.smallBio}</SmallBio>
                </CVTitle>
                <CVImage>
                  <Image src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${cv.profile.formats.small.url}`} width="125px" height="125px" alt={`Image of ${cv.title}`}/>
                </CVImage>
              </CVHeader>
              <Grid>
                <Col1>

                  <Col1Item>
                    {cv.skills.map((item,i) => {
                      return (
                        <Education key={i}>
                            <>
                              <ColTitle className="summary skill-summary">{item.name}</ColTitle>
                                <SkillGrid>
                                  {item.skillName.map((name,i) => {
                                    return (<Skill key={i} className="skill">{name.name}</Skill>)
                                  })}
                              </SkillGrid>
                            </>
                        </Education>
                      )
                    })}
                  </Col1Item>



                  <Col1Item>
                  <ColTitle>Education</ColTitle>
                  {cv.education.map((item,i) => {
                    return (
                      <Education key={i}>
                        <EducationTitle className="summary education-summary">{item.type} - {item.location}</EducationTitle>
                        <p>{item.date}</p>
                        <p className="education">{item.description}</p>
                      </Education>
                    )
                  })}
                  </Col1Item>

                  <Col1Item>
                  <ColTitle>Interests</ColTitle>
                  {cv.interests.map((item,i) => {
                    return (
                      <Interests key={i}>
                        <strong>{item.title}</strong>
                        <p style={{fontWeight:'500'}}>{item.description}</p>
                      </Interests>
                    )
                  })}
                  </Col1Item>
                  
                  <Credit>This CV was coded in ReactJS.</Credit>
                </Col1>
                <Col2>
                  <ColTitle>Experience</ColTitle>
                  {cv.timeline.map((role,i) => {
                    return(
                      <TimelineItem key={i}>
                        <TimelineTitle className="summary experience-summary">{role.role}</TimelineTitle>
                        <TimelineCompany className="experience">{role.company} | {role.date}</TimelineCompany>
                        <TimelineLongDescription>
                          <ReactMarkdown
                            children={role.longDescription}
                          />
                        </TimelineLongDescription>
                        <TimelineTags>{role.tags}</TimelineTags>
                      </TimelineItem>
                    )
                  })}
                
                </Col2>
              </Grid>
            </Paper>
            
            <button
              className="btn-accent my-8"
              onClick={() => {
                console.log("hi")
              }}
            >
              Download CV
            </button> </ResumeWrapper>
        </>
      )}
    </Layout>
  )
}



export async function getStaticProps({  }) {
  const cv = await getCV()

  return {
    props: {
      cv
    },
  }
}
