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
  transition: 0.2s;
  cursor: pointer;
  border-radius: 4px;
  display: inline-block;
  padding: 12px 20px 12px;
  font-size: 17px;
  font-weight: 700;
  outline: none;
  border: none;
  color: #fff;
  background-color: var(--primary-color);
  :hover {
    background-color: var(--thirdy-color);
  }


`



const WebmentionFormInput = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  border-radius: 0;
  background: var(--gray-extra-light);
  margin-bottom: .5em;
  outline: 0;
  font-size: 1.25rem;
  transition: border .1s ease-out;
  border: none;
  border-bottom: 2px solid var(--gray-light);
`

const WebmentionInfo = styled.div`
  padding: 0 var(--space-sm);
  margin: 0 var(--space-sm);
`


export default function WebmentionEndpoint({  }) {
  const router = useRouter()

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
                    <WebmentionFormInput id="source" name="source" type="url" />
                  </WebmentionFormField>
                  <WebmentionFormField>
                    <WebmentionFormLabel for="target">Target URL</WebmentionFormLabel>
                    <WebmentionFormInput id="target" name="target" type="url" />
                  </WebmentionFormField>
                  <WebmentionButton type="submit" >Send Webmention</WebmentionButton>
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

