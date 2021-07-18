import React, { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/router'
import Image from "next/image"
import Content from '@/components/article/article-body/article-body'
import Layout from '@/components/layout/layout'
import { getAbout } from '@/lib/data/external/cms'
import PageTitle from '@/components/title/page-title'
import styled from 'styled-components';
import SEO from '@/components/seo/seo'
import media from 'styled-media-query';
import config from "@/lib/data/internal/SiteConfig";
import Title from "@/components/title/page-title"
import { Button } from "@/styles/templates/button"

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 var(--space) var(--space-lg) var(--space);
  ${media.lessThan('medium')`
    padding: var(--space-sm);
  `}
`


const WebmentionContainer = styled.div`
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  gap: var(--space-sm);
  display: grid;
  ${media.lessThan('medium')`
    display: block;
  `}
`


const WebmentionFormField = styled.div`
  margin-bottom: var(--space);
  height: var(--space);
`

const WebmentionForm = styled.form`
  grid-column: span 2/span 2;
  margin-bottom: var(--space-sm);
`

const WebmentionFormLabel = styled.label`
  font-weight: 700;
  margin-right: var(--space-sm);
`

const Input = styled.input`
  height: 100%;
  width: 100%;
  padding-left: var(--space-sm);
  margin-right: var(--space-sm);
  border: 2px solid var(--body-bg);
  background-color: var(--content-bg);
  :invalid {
      border: 1px solid red;
  }
`

const WebmentionInfo = styled.div`
  grid-column: span 1/span 1;
`

const WebmentionTitle = styled.h2`
  margin-bottom: var(--space-sm);
`

const WebmentionDescription = styled.p`   
  margin-bottom: var(--space-sm);
`

const WebmentionLink = styled.a`
  color: var(--text-color);
  border-bottom: 1px solid var(--link-color);
  cursor: pointer;
  :hover {
    color: var(--link-color-hover);
  }
`

const Status = styled.div`
  font-size: 14px;
  color: ${props => props.color ? props.color : 'var(--text-color)'};
`

export default function WebmentionEndpoint({  }) {
  const router = useRouter()
  const [sourceUrl, setSourceUrl] = useState("")
  const [targetUrl, setTargetUrl] = useState("")
  const [status, setStatus] = useState({})

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
        setStatus({
          text: json.error_description,
          color: "red"
        })
      } else {
        setStatus({
          text: json.summary + ". Refresh in a minute to see your Webmention",
          color: "green"
        })
      }
    }
    sendData();
  }

  
  
  return (
    <Layout>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO   
              title="Webmention Endpoint"
              description=""
              slug="webmention"
            />

            <Title>Webmention Endpoint</Title>
            
            <PageWrapper>  

              <WebmentionContainer> 
                <WebmentionForm> 
                  <WebmentionFormField>
                    <WebmentionFormLabel for="source">Source URL</WebmentionFormLabel>
                    <Input 
                      id="source" 
                      name="source" 
                      type="url" 
                      placeholder="Your URL"
                      onChange={(e) => setSourceUrl(e.target.value)}
                    />
                  </WebmentionFormField>
                  <WebmentionFormField>
                    <WebmentionFormLabel for="target">Target URL</WebmentionFormLabel>
                    <Input 
                      id="target" 
                      name="target" 
                      type="url"
                      placeholder="My URL"
                      onChange={(e) => setTargetUrl(e.target.value)} 
                    />
                  </WebmentionFormField>
                  <Button type="submit" onClick={() => sendWebmention()}>Send Webmention</Button>
                  <Status color={status.color}>{status.text}</Status>
                </WebmentionForm> 

                <WebmentionInfo> 
                <WebmentionTitle>About Webmention</WebmentionTitle>
                <WebmentionDescription>
                  <WebmentionDescription>Webmention is a modern alternative to pingback.</WebmentionDescription>
                  <WebmentionDescription>If a site links back to any content, you can send a Webmention to for that URL.</WebmentionDescription>
                  <WebmentionDescription>That means if you create content which links to any of my articles, you can send a webmention for that url 
                    and it will be shown at the bottom of the article with a backlink to you.</WebmentionDescription>
                </WebmentionDescription>

                <WebmentionDescription>
                  You can read more about Webmention on the 
                  <WebmentionLink  href="https://indieweb.org/Webmention" title="Webmention"> IndieWebCamp wiki</WebmentionLink >.
                </WebmentionDescription>
                </WebmentionInfo> 

              </WebmentionContainer> 

            </PageWrapper>
          </>
        )}
    </Layout>
  )
}

