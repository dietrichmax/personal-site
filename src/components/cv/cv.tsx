import styled from "styled-components"
import media from "styled-media-query"

const Paper = styled.section`
  width: 210mm;
  height: 297mm;
  padding: 16px;
  margin-bottom: 28px;
  position: relative;
  background-color: var(--content-bg);
  overflow: hidden;
  font-family:
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji;
  ${media.lessThan("medium")`
    max-width: 100%;
    height: 100%;
    padding-left: 16px;
    padding-right: 16px;
  `}
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
`

const SubTitle = styled.h2`
  font-weight: 600;
  font-size: 014px;
`

const SmallBio = styled.p`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--primary-color);
  font-size: 12px;
`

const Grid = styled.div`
  grid-template-columns: repeat(4, minmax(0, 1fr));
  display: grid;
  gap: 28px;
  font-size: 14px;
  ${media.lessThan("medium")`
    gap: 16px;
  `}
`

const CVHeader = styled.div``

const CVTitle = styled.div``

const Col1 = styled.div`
  grid-column: span 1 / span 1;
  font-size: 12px;
  ${media.lessThan("medium")`
    grid-column: span 4/span 4;
    order: 2;
  `}
`

const Col2 = styled.div`
  grid-column: span 3 / span 3;
  font-size: 12px;
  ${media.lessThan("medium")`
    grid-column: span 4/span 4;
    order: 1;
  `}
`

const ColTitle = styled.h3`
  font-weight: 600;
  font-size: 12px;
  color: var(--thirdy-color);
  text-transform: uppercase;
  margin-bottom: 4px;
  letter-spacing: 1.25px;
`

const Skill = styled.p``

const SkillGrid = styled.div`
  grid-template-columns: repeat(2, minmax(0, 1fr));
  display: grid;
  gap: 2px;
`

const TimelineItem = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--primary-color);
`

const TimelineTitle = styled.h4`
  font-weight: 700;
  font-size: 14px;
`

const TimelineCompany = styled.h5`
  font-weight: 600;
`

const TimelineDate = styled.p``

const TimelineLongDescription = styled.div`
  margin-bottom: 4px;
`

const TimelineTags = styled.p`
  color: var(--thirdy-color);
  font-weight: 600;
`

const Col1Item = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--primary-color);
`

const Education = styled.div`
  margin-bottom: 16px;
`

const EducationTitle = styled.p`
  font-weight: 700;
`

const EducationLocation = styled.p`
  font-weight: 600;
`

const Interests = styled.div``

interface CV {
  data: {
    title: string
    subTitle: string
    smallBio: string
    skills: [
      {
        name: string
        skillName: [
          {
            name: string
          },
        ]
      },
    ]
    education: [
      {
        type: string
        location: string
        date: string
        description: string
      },
    ]
    interests: [
      {
        title: string
        description: string
      },
    ]
    timeline: [
      {
        role: string
        company: string
        description: string
        longDescription: string
        startDate: string
        endDate: string
        tags: string
      },
    ]
  }
}
export default function CV({ data }: CV) {
  return (
    <Paper className="cv" id="cv">
      <CVHeader>
        <CVTitle>
          <Title>{data.title}</Title>
          <SubTitle>{data.subTitle}</SubTitle>
          <SmallBio>{data.smallBio}</SmallBio>
        </CVTitle>
      </CVHeader>
      <Grid>
        <Col1>
          <Col1Item className="skills-grid">
            {data.skills.map((item, i) => {
              return (
                <Education className="skills-column" key={i}>
                  <>
                    <ColTitle className="summary skill-summary">
                      {item.name}
                    </ColTitle>
                    <SkillGrid>
                      {item.skillName.map((name, i) => {
                        return (
                          <Skill key={i} className="skill">
                            {name.name}
                          </Skill>
                        )
                      })}
                    </SkillGrid>
                  </>
                </Education>
              )
            })}
          </Col1Item>

          <Col1Item>
            <ColTitle>Education</ColTitle>
            {data.education.map((item, i) => {
              return (
                <Education key={i}>
                  <EducationTitle className="summary education-summary">
                    {item.type}
                  </EducationTitle>
                  <EducationLocation>{item.location}</EducationLocation>
                  <p>{item.date}</p>
                  <p className="education">{item.description}</p>
                </Education>
              )
            })}
          </Col1Item>

          <Col1Item>
            <ColTitle>Interests</ColTitle>
            {data.interests.map((item, i) => {
              return (
                <Interests key={i}>
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                </Interests>
              )
            })}
          </Col1Item>

          {/*<Credit>This CV was coded in ReactJS.</Credit>*/}
        </Col1>
        <Col2>
          <ColTitle>Experience</ColTitle>
          {data.timeline.map((role, i) => {
            return (
              <TimelineItem key={i}>
                <TimelineTitle className="summary experience-summary">
                  {role.role}
                </TimelineTitle>
                <TimelineCompany className="experience">
                  {role.company} | {role.description}
                </TimelineCompany>
                <TimelineDate>
                  {new Date(role.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                  })}{" "}
                  -{" "}
                  {role.endDate
                    ? new Date(role.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                      })
                    : "Present"}
                </TimelineDate>
                <TimelineLongDescription>
                  <div>{role.longDescription}</div>
                </TimelineLongDescription>
                <TimelineTags>{role.tags}</TimelineTags>
              </TimelineItem>
            )
          })}
        </Col2>
      </Grid>
    </Paper>
  )
}
