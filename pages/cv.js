import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import Layout from '@/components/layout/layout'
import { getCV } from '@/lib/data/external/cms'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/internal/SiteConfig";
import ReactMarkdown from "react-markdown"
import { Button } from "@/styles/templates/button"
import domtoimage from 'dom-to-image';
import { ServerStyleSheet } from 'styled-components';
import puppeteer from "puppeteer";

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
  background-color: var(--content-bg);
  padding: var(--space-sm);
  margin-bottom: var(--space);
  position: relative;
  font-family: system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  ${media.lessThan('830px')`
    max-width: 100%;
    height: 100%;
    padding-left: var(--space-sm);
    padding-right: var(--space-sm);
  `}
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`

const SubTitle = styled.h2`
  font-weight: 600;
  font-size: 0.875rem;
`

const SmallBio = styled.p`
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-sm);
  border-bottom: 2px solid var(--thirdy-color);
  font-size: .75rem;
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
`

const CVTitle = styled.div`
`

const CVImage = styled.div`
  margin-right: 0;
  margin-left: auto;
  width: 100px;

`


const Col1 = styled.div`
  grid-column: span 1/span 1;
  font-size: .75rem;
  ${media.lessThan('830px')`
    grid-column: span 4/span 4;
    order: 2;
  `}

  `

const Col2 = styled.div`
  grid-column: span 3/span 3;
  font-size: .75rem;
  ${media.lessThan('830px')`
    grid-column: span 4/span 4;
    order: 1;
  `}
`

const ColTitle = styled.h3`
  font-weight: 600;
  font-size: .75rem;
  color: var(--secondary-color);
  text-transform: uppercase;
  margin-bottom: .25rem;
  letter-spacing: 1.25px;
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
  font-size: .875rem;
`

const TimelineCompany = styled.h5`
  font-weight: 600;
`

const TimelineDate = styled.p`

`

const TimelineLongDescription = styled.div`
  margin-bottom: .25rem
`

const TimelineTags = styled.p`
  color: var(--secondary-color);
  font-weight: 600;
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
  font-weight: 700;
`

const EducationLocation = styled.p`
  font-weight: 600;
`

const Interests = styled.div`
`
const Credit = styled.p`
  font-size: .75rem;
  margin-top: var(--space-sm);
`

const generatePDF () {
  
  // get css
  const stylesheet = new ServerStyleSheet();
  const css = stylesheet.getStyleTags();
  
  console.log(css)
  
  //launch pupeteer
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })
  const page = await browser.newPage();

  // go to page
  await page.goto(config.siteUrl+"/cv", {
      waitUntil: 'networkidle0',
  })
  
  await page.addStyleTag(css)
  
  // get cv content
  const cv = await page.evaluate(() => document.querySelector("section").innerHTML);
  await page.setContent(`${css}${cv}`, {
    waitUntil: 'networkidle0'
  });
  
  //  Style
  const pdfBuffer = await page.pdf({ 
      format: "a4",
      printBackground: true,
  });

  await page.close();
  await browser.close();

  return pdfBuffer;
};

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

            <Paper className="cv" id="cv">
              <CVHeader>
                <CVTitle>
                  <Title>{cv.title}</Title>
                  <SubTitle>{cv.subtitle}</SubTitle>
                  <SmallBio>{cv.smallBio}</SmallBio>
                </CVTitle>
              </CVHeader>
              <Grid>
                <Col1>

                  <Col1Item className="skills-grid">
                    {cv.skills.map((item,i) => {
                      return (
                        <Education className="skills-column" key={i}>
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
                  <ColTitle style={{color:'var(--secondary-color)'}}>Education</ColTitle>
                  {cv.education.map((item,i) => {
                    return (
                      <Education key={i}>
                        <EducationTitle className="summary education-summary">{item.type}</EducationTitle>
                        <EducationLocation>{item.location}</EducationLocation>
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
                        <p>{item.title}</p>
                        <p>{item.description}</p>
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
                        <TimelineCompany className="experience">{role.company} | {role.description}</TimelineCompany>
                        <TimelineDate>{role.date}</TimelineDate>
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
            
            <Button 
              onClick={() => {generatePDF()}
            >
              Download CV
            </Button> </ResumeWrapper>
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
