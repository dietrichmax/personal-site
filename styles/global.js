import { createGlobalStyle } from 'styled-components';
import media from 'styled-media-query';

const GlobalStyles = createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    text-decoration: none;
    color: var(--text-dark)
  }
  a {
  }
  ::selection {
    background: rgba(0, 0, 0, 0.82);
    color: rgba(255,255,255,0.7);
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html {
    font-size: 62.5%;
  }
  body {
    line-height: 1.6;
    color: var(--text-dark)
  }
  strong {
    font-weight: bold;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background: var(--body-bg);
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 1.5rem;
    ${media.greaterThan('large')`
      font-size: 1.7rem;
    `}
  }
  img {
    display: block;
  	max-width: 100%;
  	height: auto;
  }
  :root { 
    --gray-extra-light: #eaeaea; 
    --gray-light: #747d8d;  
    --gray: #475060;
    --gray-dark: #29293a;
    --primary-color: var(---gray-dark);
    --secondary-color: #3f51b5;
    --thirdy-color: #001ff9;
    --body-bg: #FFFFFF; 
    --bg-light: var(--gray-extra-light);
    --bg-dark: var(--gray-dark);
    --border-light: var(--gray-light);
    --border-dark: var(--gray-dark);
    
    --link-color: var(--text-dark);
    --link-color-hover: var(--text-light);
    --text-color: var(--gray);
    --text-light:var(--gray-light);
    --text-dark: var(--gray-dark);
    --width-container: 1040px;
    --space: 2rem;
    --space-sm: 1rem;
    --space-lg: 3rem;
  }
`;
export default GlobalStyles;
