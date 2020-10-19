import React, { useState, useEffect } from "react"
import ConfettiAnimation from "@/components/animations/confetti-animation"
import styled from 'styled-components';
import { Emojione } from "react-emoji-render"

const NewsletterWrapper = styled.label`
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
    max-width: 720px;
    padding: var(--space);
    justify-content: center;
    margin: auto;
    background-color: #fff;
    border: 1px solid var(--gray-light);;
`
const DescriptionWrapper = styled.div`
    text-align: center;
    flex-grow: 0;    
    flex-shrink: 0;
    flex-basis: 100%;    
    max-width: 100%;
    margin-bottom: 1rem;
`

const InputWrapper = styled.div`
    flex-direction: column;
    justify-content: center;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    max-width: 66.66667%;
`

const Input = styled.input`
    padding-top: 15px!important;
    padding-bottom: 15px!important;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid hsla(0,0%,90.2%,.95);
    :invalid {
        border: 1px solid red;
    }
`

const ButtonWrapper = styled.div`
    flex-direction: column;
    justify-content: center;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    max-width: 33.33333%;
`

const Button = styled.button`
    box-sizing: border-box;
    border: 2px solid var(--primary-color);
    color: white;
    text-transform: uppercase;
    position: relative;
    padding-top: 15px!important;
    padding-bottom: 15px!important;
    outline: none;
    overflow: hidden;
    width: 100%;
    transition: all .2s ease-in-out;
    text-align: center;
    background: var(--primary-color);
    :hover {
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.5) 0px 8px 16px 0px;
    }
        
`

const Emoji = styled(Emojione)`
    display: inline-block;
`



export default function Subscribe ({ noLabel, cb }) {
  const [email, setEmail] = useState("")
  const [count, setCount] = useState("")
  const [submitted, setSubmitted] = useState(false)
  
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch('https://api.mxd.codes/subscribers/count', requestOptions)
        .then(response => response.json())
        .then(data => setCount(data));

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);


  const handleSubmit = () => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    };
    fetch('https://api.mxd.codes/subscribers', requestOptions)
      .then(function(response) {
        if (!response.ok) {
          console.log(response.statusText);
        } else {
          setSubmitted(true)
        }
        }).catch(function(error) {
            console.log(error);
        });
  }


  return (
    <>
      {submitted && (
        <div className="firework-window">
          <ConfettiAnimation />
        </div>
      )}

      {submitted ? (
        <NewsletterWrapper>
          <DescriptionWrapper>
            <h2>
              <Emoji text={"🎉"} />Super, Du bist angemeldet!<Emoji text={"🎉"} />
            </h2>
            <p>
            Vielen Dank für dein Interesse an meinem Content.
            </p>
          </DescriptionWrapper>
        </NewsletterWrapper>
      ) : (
        <NewsletterWrapper>
            <DescriptionWrapper>
              Du möchtest wissen, wann es etwas Neues gibt? <br/> Dann abonniere den Newsletter, sowie bereits {count} weitere Abonnenten.<Emoji text={"🚀"} /> 
            </DescriptionWrapper>

          <InputWrapper>
            <Input
              type="email"
              name="email"
              id="mail"
              label="email-input"
              placeholder="Deine E-Mail-Adresse"
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button
              type="button"
              aria-label="Abonnieren"
              onClick={() => handleSubmit()}
              style={{ width: "100%" }}
            >
              Abonnieren
            </Button>
          </ButtonWrapper>
        </NewsletterWrapper>
      )}
    </>
  )
}

