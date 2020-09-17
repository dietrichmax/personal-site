
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
    display: block;
    margin: var(--space) auto var(--space) auto;
    width: 500px;
    padding: var(--space-sm);
    box-sizing: border-box;
    border: 2px solid hsla(0,0%,90.2%,.95);
`
const JobDescriptionInput = styled.input`
    display: block;
    margin: var(--space) auto var(--space) auto;
    width: 750px;
    height: 300px;
    padding: var(--space);
    box-sizing: border-box;
    border: 2px solid hsla(0,0%,90.2%,.95);
`
const JobMeta = styled.div`
  display: block;
  text-align: center;
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

export default function Recruiting({ }) {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobWorkingTime, setJobWorkingTime] = useState("")
  const [jobContractType, setJobContractType] = useState("")
  const [jobVacationDays, setJobVacationDays] = useState("")
  const [jobCompany, setJobCompany] = useState("")
  const [jobWorkingHours, setJobWorkingHours] = useState("")
  const [jobLocation, setJobLocation] = useState("")
  const [jobApplicationLink, setJobApplicationLink] = useState("")

  const handleSubmit = () => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: jobTitle,
        jobDescription: jobDescription,
        workingTime: jobWorkingTime,
      })
    };
    fetch('https://api.gis-netzwerk.com/jobs', requestOptions)
      .then(function(response) {
        if (!response.ok) {
          alert("😭");
        } else {
          console.log("success")
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

                <JobTitleInput
                  type="title"
                  name="Job Title"
                  id="job-title"
                  label="job-title-input"
                  placeholder="Job Bezeichnung"
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <JobDescriptionInput
                type="text"
                name="Job Description"
                id="job-description"
                label="job-description-input"
                placeholder="Job Beschreibung"
                onChange={(e) => setJobDescription(e.target.value)}
                />
                <JobMeta>
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
                    onChange={(e) => setJobWorkingTime(e.target.value)}
                  >
                    <option value="Unbefristet">
                      Unbefristet
                    </option>
                    <option value="Befristet">
                      Befristet
                    </option>
                  </JobContractTypeInput>
                  
                </JobMeta>


                <JobAdvertiseButton
                  type="button"
                  aria-label="Abonnieren"
                  onClick={() => handleSubmit()}
                >
                Stellenanzeige aufgeben
                </JobAdvertiseButton>
          </>
        )}
        <Footer />
      </Layout>
    </>
  )
}

