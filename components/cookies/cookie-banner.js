import React, { Component, useState, useEffect } from "react"
import Cookie from 'js-cookie'
import styled from 'styled-components';
import Link from 'next/link'
import media from 'styled-media-query';

import { useAnalytics } from "../../lib/useGA";
import Router from "next/router";

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.7;
    z-index: 1000;
    background-color: #00000054;
`


const Wrapper = styled.div`    
    position: sticky;
    display: flex;
    justify-content: space-between;
    left: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #fff;;
    padding: calc(var(--space-lg)*1.5);
    border-top: 3px solid var(--primary-color);
    ${media.lessThan('large')`
        display: block;
        text-align: center;
    `}
`

const CookieBannerText = styled.p`
    margin-top: calc(var(--space-sm)*0.5);
    font-size: 1.5rem;
`

const PrivacyPolicyLink = styled.a`
    cursor: pointer;
    color: var(--gray-dark);
    border-bottom: 1px solid var(--primary-color);
    :hover {
        border-bottom: 1px solid var(--border-light);
    }

`

const AcceptButton = styled.button`
    background-color: var(--primary-color);
    padding: var(--space-sm) calc(var(--space-lg)*3);
    margin-left: var(--space-lg);
    border: medium none;
    color: ##fff;
    cursor: pointer;
    font-weight: 700;
    text-align: center;
    color: #fff;
    font-size: 1.7rem;
    transition: 0.3s;
    :hover {
        color: var(--primary-color);
        background-color: #fff;
    }
    
    ${media.lessThan('large')`
        margin: calc(var(--space-lg)*1.5) auto var(--space) auto;
    `}
`


class CookieBanner extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        visible: false,
      }
    }


    componentDidMount() {
        const { debug } = this.props;
    
        // if cookie undefined or debug
        if (Cookie.get('consentGiven')  === undefined || debug) {
          this.setState({ visible: true });
        }
    }


    accept = () => {
        Cookie.set('consentGiven', true, { sameSite: 'strict', expires: 365 })
        this.setState({ visible: false });
    }


    render() {

        if (!this.state.visible) {
            return null;
          }          

        return (
            <>
            <Background />
                <Wrapper>
                    <CookieBannerText>Diese Webseite verwendet Cookies zur Analyse und Verbesserung der Webseite. Weitere Informationen zum Einsatz von Cookies findest du in der der {``}
                        <Link href="/datenschutz">
                            <PrivacyPolicyLink>Datenschutzerklärung</PrivacyPolicyLink>
                        </Link>   
                    . 🚀
                    </CookieBannerText>
                    <AcceptButton 
                        onClick={() => {
                            this.accept();
                        }} 
                    >
                        OK
                    </AcceptButton>
                </Wrapper>
                </>
        );
    }
}

export default CookieBanner
