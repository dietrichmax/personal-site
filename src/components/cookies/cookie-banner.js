import React, { Component, useEffect } from "react"
import Cookie from "js-cookie"
import styled from "styled-components"
import Link from "next/link"
import media from "styled-media-query"
import Image from "next/image"
//import Script from 'next/script'
import Logo from "@/components/logo/logo"
import { Button }  from "@/styles/templates/button"
//import Head from "next/head"
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin , FaXing} from "react-icons/fa"
import { enableGoogleAnalytics } from '@/components/google-analytics/google-analytics';
import { enableGoogleAdsense } from "@/components/google-adsense/google-adsense"
import { SiStrava } from "react-icons/si"
import config from "src/data/internal/SiteConfig"
import { push } from "@socialgouv/matomo-next";

const Background = styled.div`    
  position: fixed;
  z-index: 9997;
  right: 0;
  bottom: -200px;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
`

const CookieContainer = styled.div`    
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  z-index: 9998;
  vertical-align: middle;
  white-space: nowrap;
  max-height: 100%;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  font-size: 14px;
  overflow-y: scroll;
  :after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`

const CookieInnerContainer = styled.div`    
  width: var(--content-width);
  height: auto;
  max-width: none;   
  border-radius: var(--border-radius);
  display: inline-block;
  z-index: 9999;
  background-color: var(--content-bg);
  text-align: left;
  white-space: normal;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
  position: relative;
  border: 1px solid var(--body-bg);
  vertical-align: middle;
  ${media.lessThan('medium')`
    width: 90%;
  `}
`

const Wrapper = styled.div`  
  max-height: 100%;
  height: auto;
  max-width: none;
  text-align: center;
  border-radius: 16px;
  display: inline-block;
  text-align: left;
  white-space: normal;
`

const CookieHeader = styled.div`
  padding: var(--space);
  display: flex;
  justify-content: space-between;
`


const CookieBody = styled.div`
`

const CookieContentContainer = styled.div`

`

const CookieContentBlock = styled.div`
  margin-bottom: var(--space-sm);
  margin-top: var(--space);
`

const CookieTextList = styled.ul`
  margin: 0;
  padding: 0;
  padding-inline-start: 1rem;
`

const CookieTextItem = styled.li`
  margin: var(--space-sm) 0;
`

const CookieBannerText = styled.div`
  padding: 0 var(--space);
`

const CookieHeadline = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: var(--space);
`

const Text = styled.div`
  margin-bottom: var(--space-sm);
  margin-top: var(--space);
`

const CookieLink = styled.a`
  border-bottom: 1px solid var(--text-color);
  :hover {
    border-bottom: none;
  }
  cursor: pointer;
  margin-right: var(--space-sm);
`

const TextLink = styled.a`
  border-bottom: 1px solid var(--text-color);
  :hover {
    border-bottom: none;
  }
`

const List = styled.ol`
  list-style: none;
  padding-inline-start: 0;
  display: flex;
`

const Socialtem = styled.li`
  margin: var(--space-sm) var(--space-sm) var(--space-sm) 0;
  transition: 0.2s;
  :hover {
    color: var(--secondary-color);
    cursor: pointer;
  }
`

const ButtonContainer = styled.div`
  margin: var(--space);
  display: flex;
  justify-content: space-between;
  ${media.lessThan('medium')`
    flex-direction: column;
    gap: var(--space-sm);
  `}
`

class CookieBanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      GAInitialized: false,
      GAAdded: false,
    }
  }

  componentDidMount() {
    const { debug } = this.props
    // if cookie undefined or debug
    if (Cookie.get("consent") === undefined || debug) {
      document.body.style.overflow = 'hidden';
      this.setState({ visible: true })
    }
  }

  componentDidUpdate() {
    const { debug } = this.props
    if (window.location.href.includes("privacy-policy") || window.location.href.includes("site-notice")) {
      document.body.style.overflow = 'scroll'
    } else if (Cookie.get("consent") === undefined || debug) {
      document.body.style.overflow = 'hidden';
    }
  }


  accept = () => {
    Cookie.set("consent", true, { sameSite: "strict", expires: 365 })
    enableGoogleAnalytics();
    /*enableGoogleAdsense();*/
    push(["trackEvent", "consent", "true"])
    this.setState({ visible: false })
    document.body.style.overflow = 'scroll'
  }

  decline = () => {
    Cookie.set("consent", false, { sameSite: "strict", expires: 365 })
    window['ga-disable-GA_MEASUREMENT_ID'] = true;
    push(["trackEvent", "consent", "false"]);
    this.setState({ visible: false })
    document.body.style.overflow = 'scroll'
  }

  render() {
    if (!this.state.visible || window.location.href.includes("privacy-policy") || window.location.href.includes("site-notice")) {
      return null
    }

    return (
      <>
        <Background />
        <CookieContainer>
          <CookieInnerContainer>
            <Wrapper>
              <CookieHeader>
                <Logo/>
                <Image
                  src="/logos/android/android-launchericon-48-48.png"
                  width="40"
                  height="40"
                  title="Max Dietrich"
                  alt="Photo of Max Dietrich"
                  className="profile u-photo"
                />
              </CookieHeader>
              <CookieBody>

              <CookieBannerText>
                <CookieHeadline>Hi, welcome on mxd.codes 👋</CookieHeadline>
                <CookieContentContainer>
                  <CookieContentBlock>
                    You can easily support me by accepting cookies. These cookies will help with the following:
                    <CookieTextList>
                      <CookieTextItem>
                        Collect audience interaction data and site statistics
                      </CookieTextItem>
                      <CookieTextItem>
                        Deliver advertisements and measure the effectiveness of advertisements
                      </CookieTextItem>
                      <CookieTextItem>
                        Show personalized content (depending on your settings)
                      </CookieTextItem>
                    </CookieTextList>
                  </CookieContentBlock>
                  <Text>
                    <p>
                      If you do not want to share your data with third parties but still want to support me you can do it via Paypal {' '}
                      <TextLink href="/pay">mxd.codes/pay</TextLink> or follow me on my socials:
                      <List>
                        <Socialtem>
                          <a href={config.socials.twitter} title="@mxdietrich on Twitter">
                            <FaTwitter />
                          </a>
                        </Socialtem>
                        <Socialtem>
                          <a
                            href={config.socials.instagram}
                            title="_maxdietrich on Instagram"
                          >
                            <FaInstagram />
                          </a>
                        </Socialtem>
                        <Socialtem>
                          <a href={config.socials.github} title="DaTurboD on GitHub">
                            <FaGithub />
                          </a>
                        </Socialtem>
                        <Socialtem>
                          <a href={config.socials.strava} title="Max Dietrich on Strava">
                            <SiStrava />
                          </a>
                        </Socialtem>
                        <Socialtem>
                          <a
                            href={config.socials.xing}
                            title="Max Dietrich on Xing"
                          >
                            <FaXing />
                          </a>
                        </Socialtem>
                        <Socialtem>
                          <a
                            href={config.socials.linkedin}
                            title="Max Dietrich on Linkedin"
                          >
                            <FaLinkedin />
                          </a>
                        </Socialtem>
                      </List>
                    </p>
                    <p>
                      For more information about cookies and how they are used please have a look at the Privacy Policy.
                    </p>
                  </Text>

                </CookieContentContainer>

                <Link href="/privacy-policy">
                  <CookieLink>Privacy Policy</CookieLink>
                </Link>
                <Link href="/site-notice">
                  <CookieLink>Site Notice</CookieLink>
                </Link>

              </CookieBannerText>

              <ButtonContainer>
                <Button onClick={() => { this.accept() }}>Accept required and optional cookies</Button>
                <Button onClick={() => { this.decline() }} backgroundColor="var(--content-bg)" color="#70757a" >Accept required cookies</Button>
              </ButtonContainer>

              </CookieBody>
            </Wrapper>
          </CookieInnerContainer>
        </CookieContainer>
      </>
    )
  }
}

export default CookieBanner
