import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import Content from '@/components/post/post-body/post-body'
import Layout from '@/components/layout/layout'
import { getAbout } from '@/lib/data/api/cms'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/SiteConfig";
import Title from "@/components/title/page-title"

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 var(--space) var(--space-lg) var(--space);
  ${media.lessThan('large')`
    padding: var(--space) 0;
  `}
`


const WebmentionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`


const WebmentionFormField = styled.div``

const WebmentionForm = styled.form`
  width: 70%; 
`

const WebmentionFormLabel = styled.label`
  font-size: 1rem;
  font-weight: 700;
`

const WebmentionButton = styled.button`
  border: 2px solid var(--primary-color);
  width: auto !important;
  color: var(--gray-extra-light);
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  transition: all .2s ease-in-out;
  text-align: center;
  padding: .75rem 1.5rem;
  width: 20%;
  background: var(--primary-color);
  :hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 8px 16px 0px;
  } 
`



const WebmentionFormInput = styled.input`
  padding: .5rem 1rem; 
  margin: .25rem auto 1rem auto;
  width: 100%;
  border: 2px solid var(--gray-light);
  background-color: var(--gray-extra-light);
  :invalid {
    border: 1px solid red;
  }
`

const WebmentionInfo = styled.div`
  padding: 0 var(--space-sm);
  margin: 0 var(--space-sm);
`


export default function WebmentionEndpoint({  }) {
  const router = useRouter()
  const [sourceUrl, setSourceUrl] = useState("")
  const [targetUrl, setTargetUrl] = useState("")

  const sendWebmention = () => {
    const endpoint = "https://webmention.io/mxd.codes/webmention"
    async function sendData() {
      const res = await fetch(endpoint, {
        method: 'post',
        body: `source=${encodeURIComponent(sourceUrl)}&target=${encodeURIComponent(targetUrl)}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      });
      const json = await res.json()
      if (json.error) {
        setStatus(json.error)
      }
      console.log(json)
    }
    sendData();
  }
  console.log(sourceUrl)
  console.log(targetUrl)
  return (
    <Layout>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO   
              title="Webmention Endpoint"
              description=""
              slug="/webmention"
            />

            <Title>Webmention Endpoint</Title>
            
            <PageWrapper>  

              <WebmentionContainer> 
                <WebmentionForm> 
                  <WebmentionFormField>
                    <WebmentionFormLabel for="source">Source URL</WebmentionFormLabel>
                    <WebmentionFormInput id="source" name="source" type="url" onChange={(e) => setSourceUrl(e.target.value)}/>
                  </WebmentionFormField>
                  <WebmentionFormField>
                    <WebmentionFormLabel for="target">Target URL</WebmentionFormLabel>
                    <WebmentionFormInput id="target" name="target" type="url"onChange={(e) => setTargetUrl(e.target.value)} />
                  </WebmentionFormField>
                  <WebmentionButton type="submit" onClick={() => sendWebmention()}>Send Webmention</WebmentionButton>
                </WebmentionForm> 

                <WebmentionInfo> 
                About Webmention
                </WebmentionInfo> 

              </WebmentionContainer> 

            </PageWrapper>
          </>
        )}
    </Layout>
  )
}

