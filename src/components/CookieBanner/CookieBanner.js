import React from 'react';
import CookieConsent from 'react-cookie-consent';
import * as S from './styled';
import { Link } from 'gatsby';
import useTranslations from '../useTranslations';
import { trackCustomEvent } from "gatsby-plugin-google-analytics"


const  CookieBanner = ({
    
    locale,
}) => {
    let localeslug;

    locale != "en" ? localeslug = "/datenschutz" : localeslug = "/en/privacy-policy";


    function cookiesSet() {
        trackCustomEvent({
            category: "Cookies",
            action: "Click",
            label: `Accept`,
        })
        //window.location.reload()
    }
    const { privacypolicy, cookiedescription, accept } = useTranslations();

    return (
            <CookieConsent
            style={{
                backgroundColor: 'hsla(0,0%,90.2%,.95)',
                color: '#29293a'
            }}
            buttonStyle={{
                fontSize: '16px',
                width: '187px',
                height: '37px',
                margin: '10px 20px',
                color: '#fff',
                fontWeight: '700',
                backgroundColor: 'var(--text-dark)',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'center',
                textDecoration: 'none'
            }}
            location="bottom"
            buttonText={accept}
            cookieName="consent"
            //overlay
            onAccept={() =>
                cookiesSet()
            }
            >
            <S.CookieDescription>{cookiedescription} <Link to={localeslug} title={privacypolicy} alt={privacypolicy} style={{textDecoration:'underline'}}>{privacypolicy}</Link>.</S.CookieDescription>
            </CookieConsent>
    );
}
export default CookieBanner
