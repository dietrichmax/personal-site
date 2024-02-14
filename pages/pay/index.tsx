import { useEffect, useState } from "react"
import Layout from "@/src/components/layout/layout"
import SEO from "@/src/components/seo/seo"
import media from "styled-media-query"
import styled from "styled-components"
import PageTitle from "@/src/components/title/page-title"
import Image from "next/image"
import { Input } from "@/styles/templates/input"
import { Button } from "@/styles/templates/button"

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

const InputContainer = styled.div`
  margin-bottom: var(--space);
  font-size: 1.25rem;
`



const ServiceName = styled.p`
  font-style: italic;
`

const ImageContainer = styled.div`
  margin: 0 auto var(--space-sm) auto;
`

export default function Pay() {
  const [amount, setAmount] = useState<number>(3.00)

  return (
    <Layout>
      <SEO title="Pay" slug="Pay" description="" />

      <PageTitle>Pay Max</PageTitle>

      <Container>
        <PayContainer>
            <Column>
              <ImageContainer>
                <a href={`https://www.paypal.com/paypalme/mdietrich10/${amount}`}>
                  <Image
                    src="/logos/paypal.png"
                    alt="Paypal logo"
                    width="100"
                    height="100"
                  />
                </a>
              </ImageContainer>
              <ServiceName>Paypal.me</ServiceName>
              <h3>Max Dietrich</h3>
              @mdietrich10
              <InputContainer>
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="3.00"
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  style={{
                    width: "50%",
                    margin: "calc(var(--space-sm)*0.75) 0",
                    fontSize: "1.25rem",
                  }}
                />{" "}
                €
              </InputContainer>
              <Button
                onClick={() => window.open(`https://www.paypal.com/paypalme/mdietrich10/${amount}`, "_blank")}
                title={`Send ${amount}€`}
              >
                Send
              </Button>
            </Column>
        </PayContainer>
      </Container>
    </Layout>
  )
}
