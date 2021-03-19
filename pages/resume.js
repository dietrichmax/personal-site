import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import Content from '@/components/article/article-body/article-body'
import Layout from '@/components/layout/layout'
import { getCV } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig";
import ReactMarkdown from "react-markdown"
import markdownStyles from '@/styles/markdown-styles.module.css'
import { FaRegQuestionCircle, FaRetweet, FaRegComment } from 'react-icons/fa';




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
  border-bottom: 2px solid var(--gray-light);
`

const Grid = styled.div`
  grid-template-columns: repeat(4,minmax(0,1fr));
  display: grid;
  gap: var(--space);
  font-size: 14px;
`

const Col1 = styled.div`
  grid-column: span 1/span 1;

  `

const Col2 = styled.div`
  grid-column: span 3/span 3;
`

const ColTitle = styled.h3`
  font-weight: 400;
  color: var(--thirdy-color);
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
  border-bottom: 2px solid var(--gray-light);
`

const TimelineTitle = styled.h4`
  font-weight: 600;
  font-size: 1rem;
`

const TimelineCompany = styled.h5`
  font-weight: 500;
`

const TimelineLongDescription = styled.div`
  margin-bottom: .25rem
`

const TimelineTags = styled.p`
  color: var(--thirdy-color);
`

const Col1Item = styled.div`
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--gray-light);
`

const Education = styled.div`
  margin-bottom: var(--space-sm);
`

const Interests = styled.div`
  margin-bottom: var(--space-sm);
`
const Credit = styled.p`
  font-size: .75rem;
`


export default function Resume({ cv }) {
  const router = useRouter()



  return (
    <Layout>
      {router.isFallback ? (
        <PageTitle>{config.loading}</PageTitle>
      ) : (
        <>
          <SEO   
            title="Resume"
            description="Resume"
            slug={`resume`}
          />
          
          <PageTitle>Resume</PageTitle>

          <ResumeWrapper> 

            <Paper>
              <Title>{cv.title}</Title>
              <SubTitle>{cv.subtitle}</SubTitle>
              <SmallBio>{cv.smallBio}</SmallBio>
              <Grid>
                <Col1>

                  <Col1Item>
                    {cv.skills.map((item) => {
                      return (
                        <Education>
                            <>
                              <ColTitle>{item.name}</ColTitle>
                                <SkillGrid>
                                  {item.skillName.map((name) => {
                                    return (<Skill>{name.name}</Skill>)
                                  })}
                              </SkillGrid>
                            </>
                        </Education>
                      )
                    })}
                  </Col1Item>



                  <Col1Item>
                  <ColTitle>Education</ColTitle>
                  {cv.education.map((item) => {
                    return (
                      <Education>
                        <strong>{item.type} - {item.location}</strong>
                        <p>{item.date}</p>
                        <p>{item.description}</p>
                      </Education>
                    )
                  })}
                  </Col1Item>

                  <Col1Item>
                  <ColTitle>Interests</ColTitle>
                  {cv.interests.map((item) => {
                    return (
                      <Interests>
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
                  {cv.timeline.map((role) => {
                    return(
                      <TimelineItem>
                        <TimelineTitle>{role.role}</TimelineTitle>
                        <TimelineCompany>{role.company} | {role.date}</TimelineCompany>
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
            </button>
          </ResumeWrapper>
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
