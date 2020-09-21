import JobCompany from '../job-company/job-company'
import media from 'styled-media-query';
import styled from 'styled-components';
import Date from '../../date/date'      
import React, { useState, useEffect } from "react"

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
  const [workplace, setWorkplace] = useState("")
  
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    /*const requestOptions = {
        method: 'GET'
    };
    fetch(`///`, requestOptions)
      .then(function(response) {
        if (!response.ok) {
          console.log(response.statusText);
        } else {
          console.log(response)
          setWorkplace(response)
        }
        })
        .catch(function(error) {
            console.log(error);
        });
  // empty dependency array means this effect will only run once (like componentDidMount in classes)*/
  }, []);


  
  
  return (
    <>
      <JobHeaderWrapper>
        <CompanyWrapper>
            <JobCompany companyData={company}/>
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

