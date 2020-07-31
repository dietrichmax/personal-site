import addToMailchimp from "gatsby-plugin-mailchimp"
import React, { useState } from "react"
import ConfettiAnimation from "../Animations/ConfettiAnimation"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import * as S from './styled';
import useTranslations from '../useTranslations';

export default ({ noLabel, cb, color }) => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const {        
    formEmail,
    formSubscribe,
    formDesc1,
    formDesc2,
    formSuccess,
    formThankYou,
  } = useTranslations();

  function errorHandling(data) {
    null
  }
  
  const handleSubmit = () => {
    addToMailchimp(email).then((data) => {

      if (data.result == "error") {
        errorHandling(data)
      } else {
        trackCustomEvent({
          category: "Newsletter",
          action: "Click",
          label: `Newsletter Click`,
        })
        setSubmitted(true)
      }
    })
  }


  return (
    <>
      {submitted && (
        <div className="firework-window">
          <ConfettiAnimation />
        </div>
      )}

      {submitted ? (
        <S.NewsletterWrapper>
          <S.DescriptionWrapper>
            <h2>
              <S.Emoji text={"🎉"} /> {formSuccess} <S.Emoji text={"🎉"} />
            </h2>
            <p>
            {formThankYou}
            </p>
          </S.DescriptionWrapper>
        </S.NewsletterWrapper>
      ) : (
        <S.NewsletterWrapper>
            <S.DescriptionWrapper>
                {formDesc1} <br/> {formDesc2} <S.Emoji text={"🚀"} /> 
            </S.DescriptionWrapper>

          <S.InputWrapper>
            <S.Input
              type="email"
              name="email"
              id="mail"
              label="email-input"
              placeholder={formEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </S.InputWrapper>
          <S.ButtonWrapper>
            <S.Button
              background={color}
              type="button"
              aria-label={formSubscribe}
              onClick={() => handleSubmit()}
              style={{ width: "100%" }}
            >
              {formSubscribe}
            </S.Button>
          </S.ButtonWrapper>
        </S.NewsletterWrapper>
      )}
    </>
  )
}