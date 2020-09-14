
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



const JobAdvertiseButton = styled.button`
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

const Input = styled.input`
    padding-top: 15px!important;
    padding-bottom: 15px!important;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid hsla(0,0%,90.2%,.95);
`
export default function Recruiting({ }) {
  const router = useRouter()

  const handleSubmit = () => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: "testjasdasdob",
        jobDescription: "JobDescription",
        workingTime: "Vollzeit",
        contractType: "unbefristet",
        slug: slugify(`testjob`),
        vacationDays: 30,
        workingHours: 38,
        salary: "4000",
        location: "München",
        applicationLink: "max.dietrich@gis-netzwerk.com",
        status: "draft",
        premium: false,
        company: {
          name: "TestCompany",
          logo: 236,
          size: "120",
          websiteUrl: "https://api.gis-netzwerk.com"
        },
        date: "2020-09-13",

      })
    };
    fetch('https://api.gis-netzwerk.com/jobs', requestOptions)
      .then(function(response) {
        if (!response.ok) {
          console.log(response.statusText);
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

                <Input
                  type="title"
                  name="title"
                  id="title"
                  label="title-input"
                  placeholder="Job Bezeichnung"
                />
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

