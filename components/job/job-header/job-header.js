import JobCompany from '../job-company/job-company'
import media from 'styled-media-query';
import styled from 'styled-components';
import Date from '../../date/date'      


const JobHeaderWrapper = styled.div`
  max-width: 640px;
  margin: auto;
`

const CompanyWrapper = styled.div`
`

const JobMeta = styled.div`
padding-bottom: var(--space-sm);
margin-bottom: var(--space-sm);
  border-bottom: 1px solid var(--gray-light);
`

const JobMetaItem = styled.p`
    color: var(--gray);
`

const DateWrapper = styled.div`
  max-width: 640px;
  margin: auto;
  ${media.lessThan('large')`
    padding-left: 1rem;
    padding-right: 1rem;
  `}
`

export default function JobHeader({ company, date, workingTime, contractType, vacationDays, workingHours, location  }) {
  
  
  return (
    <>
      <JobHeaderWrapper>
        <CompanyWrapper>
            <JobCompany name={company.name} hash={company.logo.hash} ext={company.logo.ext} url={company.websiteUrl}/>
        </CompanyWrapper>
        <JobMeta>
          <JobMetaItem>📍 Arbeitsort: {location}</JobMetaItem>
          <JobMetaItem>📅 Anstellungsart: {workingTime}</JobMetaItem>
          <JobMetaItem>📝 Vertragsart: {contractType}</JobMetaItem>
          <JobMetaItem>⛱️ Urlaub: {vacationDays} Tage</JobMetaItem>
          <JobMetaItem>⌛ Arbeitszeit: {workingHours} Wochenstunden</JobMetaItem>
         </JobMeta>

        <Date dateString={date} />
      </JobHeaderWrapper>
    </>
  )
}

