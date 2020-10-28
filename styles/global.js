import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
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
    color: inherit;
    margin: 0;
    font-size: 100%;
    vertical-align: baseline;
    text-decoration: none;
    overflow-wrap: break-word;
  }
  a {
    transition: 0.2s;
  }
  ::selection {
    background: var(--primary-color);
    color: var(--gray-extra-light);
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
    color: var(--text-color)
  }
  strong {
    font-weight: bold;
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
    font-family: -apple-system, BlinkMacSystemFont,"Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    font-size: 1.5rem;
    font-display: block !important;
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  :root { 
    --gray-extra-light: #fafafa; 
    --gray-light: #eaeaea;  
    --gray: #475060;
    --gray-dark: #3f3f40;
    --primary-color: #0a1924;
    --secondary-color: #c85517;
    --thirdy-color: #618cac;
    --body-bg: var(--gray-extra-light); 
    --bg-light: var(--gray-extra-light);
    --bg-dark: var(--gray-dark);
    --border-light: var(--gray-light);
    --border-dark: var(--gray-dark);
    --secondary-font: open sans,sans-serif;
    --link-color: var(--text-dark);
    --link-color-hover: var(--secondary-color);
    --text-color: var(--primary-color);
    --text-light: var(--gray-light);
    --text-dark: var(--gray-dark);
    --width-container: 1040px;
    --space: 2rem;
    --space-sm: 1rem;
    --space-lg: 3rem;
  }
`

export default GlobalStyle
  
