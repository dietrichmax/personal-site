
import Layout from '@/components/layout/layout'
import Head from 'next/head'
import config from "../data/SiteConfig";
import styled from 'styled-components';
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Link from 'next/link'
import SEO from '@/components/seo/seo'
import { useRouter } from 'next/router'
import media from 'styled-media-query';
import Teaser from '@/components/title/teaser-title'
import { format } from 'date-fns'

const JobsAdvertiseWrapper = styled.div`
  text-align:center;
  background-color: var(--primary-color);
`

const JobAdvertiseButton = styled.a`
  display: block;
  margin: var(--space-lg) calc(var(--space-lg)*2) calc(var(--space-lg)*2) calc(var(--space-lg)*2);  
  padding: calc(var(--space-sm)*1.3) var(--space);  
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

const BenefitsWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  ${media.greaterThan('small')`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  `}
  ${media.greaterThan('medium')`
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  `}
`

const Benefit = styled.div`
  margin: var(--space-lg) auto var(--space-lg) auto;
  text-align: center;
`

const BenefitIcon = styled.span`
  display: block;
`

const BenefitDescription = styled.span`
  display: block;
`

const PossibilityWrapper = styled.div`
  max-width: 1200px;
  margin: var(--space) auto var(--space) auto;
  text-align: center;
  ${media.greaterThan('small')`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  `}
  ${media.greaterThan('medium')`
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  `}
`

const Possibility = styled.div`
  margin: auto;
  height: 400px;
  border: 1px solid var(--gray-light);
`

const PossibilityTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: 200;
  margin: var(--space);

`

const PossibilityDescription = styled.ul`
  max-width: 67%;
  font-weight: 200;
  font-size: 1.7rem;
  margin: var(--space) auto var(--space) auto;

`

const PossibilityChecklistItem = styled.li`
  text-align: left;

`


export default function Recruiting({ }) {
  const router = useRouter()
      
  // Get Matomo Data
  const dataOptions = {
    url: process.env.NEXT_PUBLIC_MATOMO_URL,
    method: "VisitsSummary.getVisits",
    idSite: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
    period: "day",
    date: "previous365",
    format: "JSON",
    token: process.env.NEXT_PUBLIC_MATOMO_API_KEY  
  }
  const matomoUrl = encodeURI(`${dataOptions.url}?method=${dataOptions.method}&idSite=${dataOptions.idSite}&period=${dataOptions.period}&date=${dataOptions.date}&module=API&format=${dataOptions.format}&token_auth=${dataOptions.token}`)
  fetch(matomoUrl)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(function(error) {
          console.log(error);
      });

  return (
    <>
      <Layout>
        <Header link="/"/>
        {router.isFallback ? (
            <PageTitle>{config.loading}</PageTitle>
          ) : (
            
          <>
            <SEO   
              title="Auf GIS-Netzwerk werben"
              slug="https://gis-netzwerk.com/werben"
            />

            {/* Get Attention */}
            <JobsAdvertiseWrapper>
              <Teaser>
                Nutzen Sie die Reichweite von GIS-Netzwerk
              </Teaser>
              
            </JobsAdvertiseWrapper>

            {/* Benefits */}
            <BenefitsWrapper>
              <Benefit>
                <BenefitIcon>🌍</BenefitIcon>
                <BenefitDescription>
                  Eine der meistbesuchten GIS/Geoinformatik Websiten in D/A/CH
                </BenefitDescription>
              </Benefit>
              <Benefit>
                <BenefitIcon>🌍</BenefitIcon>
                <BenefitDescription>
                  2
                </BenefitDescription>
              </Benefit>
              <Benefit>
                <BenefitIcon>🌍</BenefitIcon>
                <BenefitDescription>
                  3
                </BenefitDescription>
              </Benefit>
            </BenefitsWrapper>

            {/* Possiblities */}
            <PossibilityWrapper>

              <Possibility>
                <PossibilityTitle>Native Advertising /Adertorials</PossibilityTitle>
                <PossibilityDescription>
                  <PossibilityChecklistItem>Kostenfrei</PossibilityChecklistItem>
                  <PossibilityChecklistItem>30 Tage Laufzeit</PossibilityChecklistItem>
                  <PossibilityChecklistItem>Inkl. Qualitätsprüfung</PossibilityChecklistItem>
                  <PossibilityChecklistItem>Einfache Bezahlung per Rechnung</PossibilityChecklistItem>
                  <PossibilityChecklistItem>Checklist Item</PossibilityChecklistItem>
                </PossibilityDescription>
                <Link href="/jobs/stellenanzeige-erstellen">
                  <JobAdvertiseButton title="Stellenanzeige erstellen" >
                    Stellenanzeige erstellen
                  </JobAdvertiseButton>
                </Link>
              </Possibility>

              <Possibility>
                <PossibilityTitle>Stellenanzeige</PossibilityTitle>
                <PossibilityDescription>
                  <PossibilityChecklistItem>Kostenfrei</PossibilityChecklistItem>
                  <PossibilityChecklistItem>30 Tage Laufzeit</PossibilityChecklistItem>
                  <PossibilityChecklistItem>Inkl. Qualitätsprüfung</PossibilityChecklistItem>
                  <PossibilityChecklistItem>Einfache Bezahlung per Rechnung</PossibilityChecklistItem>
                  <PossibilityChecklistItem>Checklist Item</PossibilityChecklistItem>
                </PossibilityDescription>
                <Link href="/jobs/stellenanzeige-erstellen">
                  <JobAdvertiseButton title="Stellenanzeige erstellen" >
                    Stellenanzeige erstellen
                  </JobAdvertiseButton>
                </Link>
              </Possibility>

              <Possibility>
                <PossibilityTitle>Banner ads</PossibilityTitle>
                <PossibilityDescription>
                  <PossibilityChecklistItem>Kostenfrei</PossibilityChecklistItem>
                  <PossibilityChecklistItem>30 Tage Laufzeit</PossibilityChecklistItem>
                  <PossibilityChecklistItem>Inkl. Qualitätsprüfung</PossibilityChecklistItem>
                  <PossibilityChecklistItem>Einfache Bezahlung per Rechnung</PossibilityChecklistItem>
                  <PossibilityChecklistItem>Checklist Item</PossibilityChecklistItem>
                </PossibilityDescription>
                <Link href="/jobs/stellenanzeige-erstellen">
                  <JobAdvertiseButton title="Stellenanzeige erstellen" >
                    Stellenanzeige erstellen
                  </JobAdvertiseButton>
                </Link>
              </Possibility>

            </PossibilityWrapper>
          </>
        )}
        <Footer />
      </Layout>
    </>
  )
}

