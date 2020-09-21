
import Layout from '@/components/layout/layout'
import Head from 'next/head'
import config from "../../data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import media from 'styled-media-query';
import React, { useState, useEffect } from "react"
const slugify = require('slugify')


const JobMeta = styled.div`
  width: 400px;
  margin: auto;
  display: block;
  text-align: center;
`

const JobAdvertiseButton = styled.button`
  display: block;
  margin: var(--space-lg) auto calc(var(--space-lg)*2) auto;  
  padding: var(--space);  
  border-radius: var(--space-sm);
  border: none;
  background-color: var(--primary-color);
  border: 1px solid var(--gray-light);
  color: #fff;
  font-size: 2rem;
  transition: 0.2s;
  cursor: pointer;
  :hover {
    background-color: #fff;
    color: var(--primary-color);
  }

`

const JobTitleInput = styled.input`
  width: 100%;
  display: block;
  margin: var(--space) auto var(--space) auto;
  padding: var(--space-sm);
  box-sizing: border-box;
  border: 2px solid hsla(0,0%,90.2%,.95);
`
const JobCompanyInput = styled.input`
  width: 100%;
  display: block;
  margin: var(--space) auto var(--space) auto;
  padding: var(--space-sm);
  box-sizing: border-box;
  border: 2px solid hsla(0,0%,90.2%,.95);
`

const JobLocationInput = styled.input`
  width: 100%;
  display: block;
  margin: var(--space) auto var(--space) auto;
  padding: var(--space-sm);
  box-sizing: border-box;
  border: 2px solid hsla(0,0%,90.2%,.95);
`

const JobApplicationLinkInput = styled.input`
  width: 100%;
  display: block;
  margin: var(--space) auto var(--space) auto;
  padding: var(--space-sm);
  box-sizing: border-box;
  border: 2px solid hsla(0,0%,90.2%,.95);
`

const JobContactEmailInput = styled.input`
  width: 100%;
  display: block;
  margin: var(--space) auto var(--space) auto;
  padding: var(--space-sm);
  box-sizing: border-box;
  border: 2px solid hsla(0,0%,90.2%,.95);
`


const JobWorkingTimeInput = styled.select`
  margin: var(--space);
  padding: var(--space-sm);
  box-sizing: border-box;
  border: 2px solid hsla(0,0%,90.2%,.95);
`

const JobContractTypeInput = styled.select`
  margin: var(--space);
  padding: var(--space-sm);
  box-sizing: border-box;
  border: 2px solid hsla(0,0%,90.2%,.95);
`
const SubmittedText = styled.div`
  text-align: center;
  max-width: 700px;
  margin: calc(var(--space-lg)*2) auto calc(var(--space-lg)*2) auto;
  padding: var(--space);
  background-color: #fff;
  border: 1px solid var(--gray-light);

`
const SubmittedTitle = styled.div`
  font-size: 2rem;
  margin-bottom: var(--space);
`

const SubmittedMail = styled.a`
  border-bottom: 1px solid var(--primary-color);
`

export default function Recruiting({ }) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [jobTitle, setJobTitle] = useState("")
  const [jobWorkingTime, setJobWorkingTime] = useState("")
  const [jobContractType, setJobContractType] = useState("")
  const [jobCompany, setJobCompany] = useState("")
  const [jobLocation, setJobLocation] = useState("")
  const [jobApplicationLink, setJobApplicationLink] = useState("")
  const [jobContactEmail, setJobContactEmail] = useState("")
  //const [jobVacationDays, setJobVacationDays] = useState("")
  //const [jobWorkingHours, setJobWorkingHours] = useState("")
  //const [jobDescription, setJobDescription] = useState("")


  const handleSubmit = () => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: jobTitle,
      })
    };
    fetch('https://api.gis-netzwerk.com/jobs', requestOptions)
      .then(function(response) {
        if (!response.ok) {
          console.log(response)
        } else {
          setSubmitted(true)
        }
        }).catch(function(error) {
            console.log(error);
        });
  }

  return (
    <>
      <Layout>
        <Header link="/"/>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Stellenanzeige aufgeben"
              slug="https://gis-netzwerk.com/jobs/stellenanzeige-erstellen"
            />

              <JobMeta>
                <JobTitleInput
                  type="title"
                  name="Job Title"
                  id="job-title"
                  label="job-title-input"
                  placeholder="Bezeichnung des Stellenangebots"
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <JobCompanyInput
                type="text"
                name="Job Company"
                id="job-company"
                label="job-company-input"
                placeholder="Namen Ihres Unternehmens"
                onChange={(e) => setJobCompany(e.target.value)}
                />
                <JobLocationInput
                type="text"
                name="Job Location"
                id="job-location"
                label="job-location-input"
                placeholder="Anstellungsort"
                onChange={(e) => setJobLocation(e.target.value)}
                />
                <JobWorkingTimeInput
                  type="text"
                  name="Job Anstellungsart"
                  id="job-working-time"
                  label="job-working-time-input"
                  placeholder="Job Anstellungsart"
                  onChange={(e) => setJobWorkingTime(e.target.value)}
                >
                  <option value="Vollzeit">
                    Vollzeit
                  </option>
                  <option value="Teilzeit">
                    Teilzeit
                  </option>
                </JobWorkingTimeInput>
                <JobContractTypeInput
                  type="text"
                  name="Job Vertragsart"
                  id="job-contract-type"
                  label="job-contract-type-input"
                  placeholder="Job Vertragsart"
                  onChange={(e) => setJobContractType(e.target.value)}
                >
                  <option value="unbefristet">
                    Unbefristet
                  </option>
                  <option value="befristet">
                    Befristet
                  </option>
                </JobContractTypeInput>

                
                <JobApplicationLinkInput
                type="text"
                name="Job Application Link"
                id="job-application-link"
                label="job-application-link-input"
                placeholder="Link zu Stellenanzeige"
                onChange={(e) => setJobApplicationLink(e.target.value)}
                />
                <JobContactEmailInput
                type="text"
                name="Job Contact Email"
                id="job-contact-email"
                label="job-contact-email"
                placeholder="Kontakt E-Mail-Adresse"
                onChange={(e) => setJobContactEmail(e.target.value)}
                />
                  
                </JobMeta>

              {submitted ? 
                
                <SubmittedText>
                  <SubmittedTitle>
                    Ihre Stellenanzeige wurde erfolgreich abgesendet. ✔️</SubmittedTitle>
                    Sobald Ihre Stellenanzeige freigeschalten wurde bekommen Sie eine kurze Info an <br/>
                  <SubmittedMail>{jobContactEmail}</SubmittedMail>.
                </SubmittedText>
                :
                <JobAdvertiseButton
                  type="button"
                  aria-label="Abonnieren"
                  onClick={() => handleSubmit()}
                >
                  Stellenangebot absenden
                </JobAdvertiseButton>
              }
          </>
        )}
        <Footer />
      </Layout>
    </>
  )
}

