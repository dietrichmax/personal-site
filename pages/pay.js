import { useState } from "react"
import Layout from "src/components/layout/layout"
import config from "../src/data/internal/SiteConfig"
import SEO from "src/components/seo/seo"
import media from "styled-media-query"
import styled from "styled-components"
import { useRouter } from "next/router"
import PageTitle from "src/components/title/page-title"
import Image from "next/image"
import { Input } from "@/styles/templates/input"

const Container = styled.div`
  max-width: var(--width-container);
  margin: var(--space) auto;
  padding-left: var(--space);
  padding-right: var(--space);
  ${media.lessThan("medium")`
    margin: var(--space-sm);
    padding: 0;
  `}
`

const PayContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
`

const Column = styled.div`
  text-align: center;
  flex: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 20%;
  ${media.lessThan("medium")`
        max-width: 100%;
    `}
`

const ColumnTitle = styled.h3``

const InputContainer = styled.div`
  margin-bottom: var(--space);
  font-size: 1.25rem;
`

const Button = styled.a`
  margin: auto;
  padding: 6px 50px;
  border-radius: var(--space-sm);
  outline: none;
  background-color: var(--secondary-color);
  color: var(--content-bg);
  font-weight: bold;
  transition: 0.2s;
  :hover {
    background-color: var(--content-bg);
    color: var(--secondary-color);
  }
`

const ServiceName = styled.p`
  font-style: italic;
`
export default function Feeds({}) {
  const router = useRouter()
  const [amount, setAmount] = useState(3)

  return (
    <>
      <Layout>
        {router.isFallback ? (
          <PageTitle>{config.loading}</PageTitle>
        ) : (
          <>
            <SEO title="Pay" slug="Pay" description="" />

            <PageTitle>Pay Max</PageTitle>

            <Container>
              <PayContainer>
                <Column>
                  <a
                    href={`https://www.paypal.com/paypalme/mdietrich10/${amount}`}
                  >
                    <Image src="/logos/paypal.png" width="100" height="100" />
                  </a>
                  <ServiceName>Paypal.me</ServiceName>
                  <ColumnTitle>Max Dietrich</ColumnTitle>
                  @mdietrich10
                  <InputContainer>
                    <Input
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="3.00"
                      onChange={(e) => setAmount(e.target.value)}
                      style={{
                        width: "50%",
                        margin: "calc(var(--space-sm)*0.75) 0",
                        fontSize: "1.25rem",
                      }}
                    />{" "}
                    €
                  </InputContainer>
                  <Button
                    href={`https://www.paypal.com/paypalme/mdietrich10/${amount}`}
                    title={`Send ${amount}€`}
                  >
                    Send
                  </Button>
                </Column>
              </PayContainer>
            </Container>
          </>
        )}
      </Layout>
    </>
  )
}
