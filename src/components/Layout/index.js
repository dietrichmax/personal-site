import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import GlobalStyles from '../../styles/global';
//import CookieBanner from '../CookieBanner/cookieBanner.js';
// import { Link } from 'gatsby';
import '../../styles/style.scss'
import * as S from './styled';
import { MDXProvider } from "@mdx-js/react"
import MdxLink from "../LocalizedLink/mdxLink"
import CookieBanner from "../CookieBanner/CookieBanner.js"
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

const LocaleContext = React.createContext();
// Use the built-in Context API to make the "locale" available to every component in the tree
// This e.g. enables the LocalizedLink to function correctly
// As this component wraps every page (due to the wrapPageElement API) we can be sure to have
// the locale available everywhere!

const Layout = ({ children, pageContext: { locale } }) => (
  <LocaleContext.Provider value={{ locale }}>
    <GlobalStyles />
    <S.Wrapper>
      <Header />
      <S.SiteContent role="main" >
        <MDXProvider components={{ a: MdxLink }}>
          <S.Container>{children}</S.Container>
        </MDXProvider>
      </S.SiteContent>
          <CookieBanner locale={locale}/>
      <Footer />
    </S.Wrapper>
  </LocaleContext.Provider>
);

export { Layout, LocaleContext }